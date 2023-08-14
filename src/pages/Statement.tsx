import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Box, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, SxProps, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { useForm, useWatch } from 'react-hook-form';
import { Done, ErrorOutline } from '@mui/icons-material';
import useTitle from '../hooks/useTitle';
import FileUploader from '../components/file-uploader/FileUploader';
import MuiForm from '../components/form-controls/MuiForm';
import MuiFormButton from '../components/form-controls/MuiFormButton';
import useLocale from '../hooks/useLocale';
import useStore from '../hooks/useStore';
import { IProcessedOperation, OperationStatus } from '../store/StatementStore';
import MuiFormSelect from '../components/form-controls/MuiFormSelect';

const Locale = {
  title: 'Загрузка выписки из банка',
  buttonLabel: 'Записать операции',
  companyTypesLabel: 'Компания',
  companyTypes: [
    { value: 'ip', label: 'ИП Багдасарян' },
    { value: 'ooo', label: 'ООО ХашЛаваш' }
  ],
  statuses: {
    SUCCESS: 'Успешно',
    OPERATION_FAIL: 'Не найдена статья ДДС',
    COUNTERPARTY_FAIL: 'Не найден контрагент'
  }
};

const styles: Record<string, SxProps<Theme>> = {
  container: {
    width: '100%',
    py: 4,
    px: 3
  },
  operationText: {
    display: 'flex',
    alignItems: 'center'
  },
  errorTextColor: {
    color: theme => theme.palette.error.main
  },
  successTextColor: {
    color: theme => theme.palette.success.main
  }
};

export interface IForm {
  type?: string;
  file?: File;
}

const Statement = () => {
  useTitle();
  const locale = useLocale(Locale);
  const [fileProcessed, setFileProcessed] = useState(false);
  const [fileProcessedError, setFileProcessedError] = useState(false);
  const [processedList, setProcessedList] = useState<Array<IProcessedOperation>>();

  const { statementStore } = useStore();

  const methods = useForm<IForm>({
    mode: 'onBlur'
  });

  const { setValue, control } = methods;
  const file = useWatch({ control, name: 'file' });
  const companyType = useWatch({ control, name: 'type' });

  const onClearFile = () => {
    setFileProcessed(false);
  };

  const onSubmit = (data: IForm) => {
    const formData = new FormData();

    if (data.type) {
      formData.append('type', data.type);
    }

    if (data.file) {
      formData.append('file', data.file, data.file.name);
    }

    statementStore.processStatement(formData).then((result) => {
      setProcessedList(result);
      setFileProcessed(true);
    }).catch(() => {
      setFileProcessedError(true);
    });
  };

  return (
    <Paper sx={styles.container}>
      <Typography mb={2}>{locale.title}</Typography>
      <MuiForm methods={methods} onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <MuiFormSelect
              name="type"
              options={locale.companyTypes}
              label={locale.companyTypesLabel}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FileUploader
              setValue={setValue}
              onClear={onClearFile}
              fileProcessed={fileProcessed}
              hasError={fileProcessedError}
              accept=".xls, .xlsx"
            />
          </Grid>
        </Grid>

        {file && companyType && !fileProcessed && (
          <MuiFormButton variant="contained" color="primary" label={locale.buttonLabel} />
        )}

        {processedList && (
          <List>
            {processedList.map((operation, index) => {
              const hasError = operation.status !== OperationStatus.SUCCESS;

              return (
                // eslint-disable-next-line react/no-array-index-key
                <ListItem key={index}>
                  <ListItemIcon>
                    {hasError ? <ErrorOutline color="error" /> : <Done color="success" />}
                  </ListItemIcon>
                  <ListItemText
                    primary={(
                      <Box sx={styles.operationText}>
                        <Typography variant="body2" mr={2}>{operation.operation.name}</Typography>
                        {operation.operation.expense && (
                          <Typography sx={styles.errorTextColor} variant="subtitle2">
                            {`- ${operation.operation.expense} ₽`}
                          </Typography>
                        )}
                        {operation.operation.incoming && (
                          <Typography sx={styles.successTextColor} variant="subtitle2">
                            {`+ ${operation.operation.incoming} ₽`}
                          </Typography>
                        )}
                      </Box>
                    )}
                    secondary={(
                      <Box sx={styles.operationText}>
                        <Typography variant="caption">{operation.operation.date}</Typography>
                        <Typography
                          variant="caption"
                          sx={hasError ? styles.errorTextColor : styles.successTextColor}
                          ml={2}
                        >
                          {locale.statuses[operation.status]}
                        </Typography>
                      </Box>
                    )}
                  />
                </ListItem>
              );
            })}
          </List>
        )}
      </MuiForm>
    </Paper>
  );
};

export default observer(Statement);
