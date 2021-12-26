import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import {
  Grid,
  IconButton,
  Typography,
  Box,
  Paper,
  Divider,
  Checkbox,
  FormControlLabel,
  TextField,
  InputAdornment,
  Collapse,
  Alert
} from '@mui/material';
import { observer } from 'mobx-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TransitionGroup } from 'react-transition-group';
import { yupResolver } from '@hookform/resolvers/yup';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import useTitle from '../../hooks/useTitle';
import useLocale from '../../hooks/useLocale';
import useStore from '../../hooks/useStore';
import MuiForm from '../../components/form-controls/MuiForm';
import yup from '../../core/yup-extended';
import MuiFormInput from '../../components/form-controls/MuiFormInput';
import MuiFormMaskedInput from '../../components/form-controls/MuiFormMaskedInput';
import MuiFormDateTimePicker from '../../components/form-controls/MuiFormDateTimePicker';
import { IMenuItem, ISaveBanquetBody } from '../../store/BanquetsStore';
import MuiSuggestSelector from '../../mui-components/MuiSuggestSelector';
import MuiFormButton from '../../components/form-controls/MuiFormButton';
import Locale from './locale';
import styles from './styles';

interface IForm {
  name: string;
  phone: string;
  personsCount: number;
  date: Date;
}

interface ISelectedItem {
  title: string;
  price: number;
  weight: number;
  count?: number;
}

type SelectedMenu = { [type: string]: Array<ISelectedItem> };

const Banquets: FC = (): JSX.Element => {
  const locale = useLocale(Locale);
  const { banquetsStore, userStore } = useStore();
  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu>({});
  const [sum, setSum] = useState<number>(0);
  const containerRef = useRef(null);
  const [saleChecked, setSaleChecked] = useState<boolean>(false);
  const [serviceFeeChecked, setServiceFeeChecked] = useState<boolean>(false);
  const [weightRecChecked, setWeightRecChecked] = useState<boolean>(false);
  const [sale, setSale] = useState<string>('');
  const [totalAmount, setTotalAmount] = useState<number>(sum);
  const [weight, setWeight] = useState<{ [type: string]: number }>({});
  useTitle(locale.title);

  useEffect(() => {
    if (!Object.keys(banquetsStore.menu).length) {
      banquetsStore.fetchMenu();
    }
  }, [banquetsStore.menu]);

  useEffect(() => {
    let newTotalAmount = sum;

    if (saleChecked) {
      newTotalAmount = sum - ((sum / 100) * Number(sale));
    }

    if (serviceFeeChecked) {
      newTotalAmount += ((newTotalAmount / 100) * 12);
    }

    setTotalAmount(newTotalAmount);
  }, [sum, saleChecked, serviceFeeChecked, sale]);

  const schema = yup.object({
    name: yup.string().required(),
    phone: yup.string().isPhone().required(),
    personsCount: yup.number().required().min(10, locale.PERSON_MIN(10)).max(40, locale.PERSON_MAX(40)),
    date: yup
      .date()
      .required()
      .typeError('Некорректное значение')
      .nullable()
  });

  const methods = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      phone: '',
      personsCount: 10,
      date: new Date()
    },
    mode: 'onTouched'
  });

  const { watch, reset } = methods;
  const watchName = watch('name');
  const watchDate = watch('date');
  const watchPhone = watch('phone');
  const watchPersonsCount = watch('personsCount');

  const onSubmit: SubmitHandler<IForm> = (data) => {
    const body: ISaveBanquetBody = {
      ...data,
      menu: { ...selectedMenu },
      sum,
      totalAmount,
      admin: userStore.user.name
    };

    if (saleChecked) {
      body.sale = sale;
    }

    if (serviceFeeChecked) {
      body.serviceFee = '12';
    }

    banquetsStore.save(body).then(() => {
      reset();
      setSelectedMenu({});
      setSum(0);
      setWeight({});
    });
  };

  const addItem = (type: string, data: ISelectedItem) => {
    if (selectedMenu[type]) {
      setSelectedMenu({ ...selectedMenu, [type]: [...selectedMenu[type], { ...data }] });
    } else {
      setSelectedMenu({ ...selectedMenu, [type]: [{ ...data }] });
    }

    setSum(sum + data.price);
    setWeight({ ...weight, [type]: (weight[type] || 0) + data.weight });
  };

  const deleteItem = (type: string, title: string) => {
    setSelectedMenu({
      ...selectedMenu,
      [type]: selectedMenu[type].filter(item => item.title !== title)
    });

    const deletedItem = selectedMenu[type].find(item => item.title === title);

    if (deletedItem) {
      setSum(sum - (deletedItem.price * (deletedItem.count || 1)));
      setWeight({ ...weight, [type]: (weight[type] || 0) - (deletedItem.weight * (deletedItem.count || 1)) });
    }
  };

  const onEditCount = (itemType: string, title: string, type: 'add' | 'remove') => {
    setSelectedMenu({
      ...selectedMenu,
      [itemType]: selectedMenu[itemType]
        .map((item: ISelectedItem) => {
          if (item.title === title) {
            const resultItem = { ...item };

            if (type === 'add') {
              resultItem.count = (item?.count || 0) + 1;
              setSum(sum + item.price);
              setWeight({ ...weight, [itemType]: (weight[itemType] || 0) + item.weight });
            } else if (type === 'remove' && item.count && item.count > 1) {
              resultItem.count = (item?.count || 0) - 1;
              setSum(sum - item.price);
              setWeight({ ...weight, [itemType]: (weight[itemType] || 0) - item.weight });
            }

            return resultItem;
          }

          return item;
        })
    });
  };

  const onChangeSnacks = (option: IMenuItem, type: string) => {
    if (option) {
      addItem(type, { ...option, count: 1 });
    }
  };

  const getSuggestOptions = (type: string) => {
    // @ts-ignore
    if (banquetsStore.menu[type]) {
      // @ts-ignore
      return banquetsStore.menu[type].filter((option: ISelectedItem) => {
        if (selectedMenu[type]) {
          return !selectedMenu[type].some(item => item.title === option.title);
        }
        return true;
      });
    }

    return [];
  };

  const onCheckedSale = (event: ChangeEvent<HTMLInputElement>) => {
    setSaleChecked(event.target.checked);
  };

  const onCheckedServiceFee = (event: ChangeEvent<HTMLInputElement>) => {
    setServiceFeeChecked(event.target.checked);
  };

  const onCheckedWeightRec = (event: ChangeEvent<HTMLInputElement>) => {
    setWeightRecChecked(event.target.checked);
  };

  const onSale = (event: ChangeEvent<HTMLInputElement>) => {
    setSale(event.target.value);
  };

  const renderWarningSum = (): JSX.Element | undefined => {
    const needSum = watchPersonsCount * banquetsStore.options.pricePerPerson;

    if (sum < needSum) {
      return <Alert severity="warning">{locale.warningSum(needSum)}</Alert>;
    }
  };

  const renderWarningWeight = (): Array<JSX.Element> => {
    const content: Array<JSX.Element> = [];
    const { weightPerPerson } = banquetsStore.options;
    Object.keys(weightPerPerson).forEach((type) => {
      if (weight[type] && (weightPerPerson[type] > (weight[type] / watchPersonsCount))) {
        content.push(<Alert severity="warning" key={type}>{locale.warningWeight(locale[type])}</Alert>);
      }
    });

    return content;
  };

  const renderItem = (type: string, itemData: ISelectedItem) => (
    <Grid container spacing={2} key={itemData.title} sx={styles.item}>
      <Grid item xs={6} md={5}>
        <Typography variant="body2" sx={styles.itemTitle}>{itemData.title}</Typography>
      </Grid>
      <Grid item xs={6} md={2}>
        <Typography variant="subtitle1" sx={styles.itemPrice}>
          <Box dangerouslySetInnerHTML={{ __html: locale.sumCurrency(itemData.price) }} />
        </Typography>
      </Grid>
      <Grid item xs={4} md={1.5}>
        <Typography variant="subtitle1">{`${itemData.weight} гр.`}</Typography>
      </Grid>
      <Grid item xs={6} md={2.5}>
        <Box sx={styles.counter}>
          <IconButton size="small" onClick={() => onEditCount(type, itemData.title, 'remove')}>
            <RemoveIcon color="secondary" />
          </IconButton>
          <Typography variant="subtitle1" sx={styles.itemCount}>{`${itemData.count} шт`}</Typography>
          <IconButton size="small" onClick={() => onEditCount(type, itemData.title, 'add')}>
            <AddIcon color="secondary" />
          </IconButton>
        </Box>
      </Grid>
      <Grid item xs={2} md={1}>
        <IconButton size="small" onClick={() => deleteItem(type, itemData.title)}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );

  const renderFooter = (): JSX.Element => (
    <>
      {sum > 0 && <Divider />}
      {sum > 0 && (
        <Box sx={styles.footer}>
          <Box sx={styles.sum}>
            <Typography variant="body1" mb={1}>{locale.sumLabel}</Typography>
            <Box dangerouslySetInnerHTML={{ __html: locale.sumCurrency(sum) }} />
          </Box>
          {watchPersonsCount && renderWarningSum()}
          <FormControlLabel
            label={locale.weightRecommendations}
            control={<Checkbox checked={weightRecChecked} onChange={onCheckedWeightRec} size="small" />}
          />
          {weightRecChecked && watchPersonsCount && renderWarningWeight()}
          <FormControlLabel
            label={locale.serviceFeeLabel}
            control={<Checkbox checked={serviceFeeChecked} onChange={onCheckedServiceFee} size="small" />}
          />
          <Box sx={styles.sale}>
            <FormControlLabel
              label={locale.addSaleLabel}
              control={<Checkbox checked={saleChecked} onChange={onCheckedSale} size="small" />}
            />

            {saleChecked && (
              <TextField
                label={locale.saleLabel}
                value={sale}
                variant="standard"
                onChange={onSale}
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  componentsProps: { input: { min: '0', max: '100' } }
                }}
                type="number"
                sx={styles.saleInput}
              />
            )}
          </Box>

          <Box sx={styles.sum}>
            <Typography variant="h2" mb={1}>{locale.totalAmountLabel}</Typography>
            <Typography variant="h3">
              <div dangerouslySetInnerHTML={{ __html: locale.sumCurrency(totalAmount) }} />
            </Typography>
          </Box>

          <MuiFormButton />
        </Box>
      )}
    </>
  );

  return (
    <div ref={containerRef}>
      <Typography variant="h2" sx={styles.title}>{locale.title}</Typography>
      <MuiForm methods={methods} onSubmit={onSubmit}>
        <div>
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <MuiFormInput name="name" label={locale.nameLabel} />
            </Grid>
            <Grid item xs={12} md={3}>
              <MuiFormInput name="personsCount" label={locale.personsCount} />
            </Grid>
            <Grid item xs={12} md={3}>
              <MuiFormMaskedInput
                mask="+7-###-###-##-##"
                name="phone"
                label={locale.phoneLabel}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <MuiFormDateTimePicker name="date" label={locale.dateLabel} />
            </Grid>
          </Grid>
        </div>

        {watchPersonsCount && watchName && watchDate && watchPhone && (
          <Box sx={styles.order}>
            <Grid container spacing={4} sx={styles.menuCategory}>
              {Object.keys(banquetsStore.menu).map(menuType => (
                <Grid item xs={12} key={menuType}>
                  <MuiSuggestSelector
                    label={locale[menuType]}
                    onChange={(option: IMenuItem) => onChangeSnacks(option, menuType)}
                    options={getSuggestOptions(menuType)}
                    getOptionLabel={(option: IMenuItem) => option?.title || ''}
                  />
                </Grid>
              ))}
            </Grid>
            <Paper sx={styles.orderList} elevation={3}>
              {Object.keys(selectedMenu).map(type => (
                <Box key={type}>
                  {selectedMenu[type].length > 0 && <Typography variant="h4" mb={1}>{locale[type]}</Typography>}
                  <TransitionGroup>
                    {selectedMenu[type].map(item => (
                      <Collapse key={item.title}>
                        {renderItem(type, item)}
                      </Collapse>
                    ))}
                  </TransitionGroup>
                </Box>
              ))}

              {renderFooter()}
            </Paper>
          </Box>
        )}
      </MuiForm>
    </div>
  );
};

export default observer(Banquets);
