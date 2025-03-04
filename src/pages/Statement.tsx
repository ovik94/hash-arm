import React, { useState } from 'react';
import { observer } from 'mobx-react';
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  SxProps,
  Typography
} from '@mui/material';
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
  statementTitle: 'Загрузка выписки из банка',
  loadButton: 'Загрузить',
  processButton: 'Записать операции',
  companyTypesLabel: 'Компания',
  companyTypes: [
    { value: 'ipHashLavash', label: 'ИП Багдасарян Альфа' },
    { value: 'oooHashLavash', label: 'ООО ХашЛаваш Альфа' },
    { value: 'ipFoodTrack', label: 'ИП Багдасарян Сбербанк' }
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
    py: { xs: 2, md: 3 },
    px: { xs: 2, md: 3 }
  },
  operationText: {
    display: { xs: 'unset', sm: 'flex' },
    justifyContent: { xs: 'unset', sm: 'space-between' },
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
  companyType?: string;
  file?: File;
}

const Statement = () => {
  useTitle();
  const locale = useLocale(Locale);
  const [fileProcessed, setFileProcessed] = useState(false);
  const [fileProcessedError, setFileProcessedError] = useState(false);
  const [operations, setOperations] = useState<Array<IProcessedOperation>>();

  const { statementStore } = useStore();

  const methods = useForm<IForm>({
    mode: 'onBlur',
    defaultValues: {
      companyType: undefined,
      file: undefined
    }
  });

  const { setValue, control, reset } = methods;
  const file = useWatch({ control, name: 'file' });
  const companyType = useWatch({ control, name: 'companyType' });

  const onClearFile = () => {
    setFileProcessed(false);
  };

  const onSubmit = (data: IForm) => {
    const formData = new FormData();

    if (!fileProcessed) {
      if (data.companyType) {
        formData.append('companyType', data.companyType);
      }

      if (data.file) {
        formData.append('file', data.file, data.file.name);
      }

      statementStore
        .loadStatement(formData)
        .then((result) => {
          setOperations(result);
          setFileProcessed(true);
        })
        .catch(() => {
          setFileProcessedError(true);
        });
    } else if (operations && companyType) {
      statementStore.processStatement(operations, companyType).then(() => {
        reset();
        onClearFile();
        setOperations([]);
      });
    }
  };

  return (
    <Paper sx={styles.container}>
      <Typography variant="h2" mb={2}>
        {locale.statementTitle}
      </Typography>
      <MuiForm methods={methods} onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <MuiFormSelect
              name="companyType"
              options={locale.companyTypes}
              label={locale.companyTypesLabel}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FileUploader
              setValue={setValue}
              file={file}
              onClear={onClearFile}
              fileProcessed={fileProcessed}
              hasError={fileProcessedError}
              accept=".xls, .xlsx"
            />
          </Grid>
        </Grid>

        {file && companyType && (
          <MuiFormButton
            variant="contained"
            color="primary"
            label={fileProcessed ? locale.processButton : locale.loadButton}
          />
        )}

        {operations && (
          <List>
            {operations.map((operation, index) => {
              const hasError = operation.status !== OperationStatus.SUCCESS;

              return (
                // eslint-disable-next-line react/no-array-index-key
                <ListItem key={index}>
                  <ListItemIcon>
                    {hasError ? (
                      <ErrorOutline color="error" />
                    ) : (
                      <Done color="success" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={(
                      <Box sx={styles.operationText}>
                        <Typography variant="body2" mr={2}>
                          {operation.operation.name}
                        </Typography>
                        {operation.operation.expense && (
                          <Typography
                            sx={styles.errorTextColor}
                            variant="subtitle2"
                          >
                            {`- ${operation.operation.expense} ₽`}
                          </Typography>
                        )}
                        {operation.operation.incoming && (
                          <Typography
                            sx={styles.successTextColor}
                            variant="subtitle2"
                          >
                            {`+ ${operation.operation.incoming} ₽`}
                          </Typography>
                        )}
                      </Box>
                    )}
                    secondary={(
                      <Box sx={styles.operationText}>
                        <Typography variant="caption">
                          {operation.operation.date}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={
                            hasError ?
                              styles.errorTextColor :
                              styles.successTextColor
                          }
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
