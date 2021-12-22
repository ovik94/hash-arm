import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import {
  Grid,
  IconButton,
  Typography,
  SxProps,
  Box,
  Paper,
  Divider,
  Checkbox,
  FormControlLabel,
  TextField,
  InputAdornment, Collapse
} from '@mui/material';
import { observer } from 'mobx-react';
import { Theme } from '@mui/material/styles';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TransitionGroup } from 'react-transition-group';
import { yupResolver } from '@hookform/resolvers/yup';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import useTitle from '../hooks/useTitle';
import useLocale from '../hooks/useLocale';
import useStore from '../hooks/useStore';
import MuiForm from '../components/form-controls/MuiForm';
import yup from '../core/yup-extended';
import MuiFormInput from '../components/form-controls/MuiFormInput';
import MuiFormMaskedInput from '../components/form-controls/MuiFormMaskedInput';
import MuiFormDateTimePicker from '../components/form-controls/MuiFormDateTimePicker';
import { IMenuItem } from '../store/MenuStore';
import MuiSuggestSelector from '../mui-components/MuiSuggestSelector';
import { currencyFormatter } from '../core/locale/locale';
import MuiFormButton from '../components/form-controls/MuiFormButton';

const Locale = {
  title: 'Заказ банкетов',
  nameLabel: 'Имя',
  phoneLabel: 'Номер телефона',
  personsCount: 'Кол-во гостей',
  dateLabel: 'Дата и время банкета',
  potables: 'Напитки',
  salads: 'Салаты',
  snacks: 'Закуски',
  hotter: 'Горячее',
  sideDishes: 'Гарниры',
  banquetMenu: 'Банкетное меню',
  addPosition: 'Добавить',
  sumLabel: 'Сумма заказа',
  addSaleLabel: 'Добавить скидку',
  totalAmountLabel: 'Итого',
  serviceFeeLabel: 'Процент за обслуживание (12%)',
  sumCurrency: (sum: number) => `<b>${currencyFormatter(sum)}</b>`,
  PERSON_MIN: (min: number): string => `Допустимо минимум ${min} человек`,
  PERSON_MAX: (max: number): string => `Допустимо максимум ${max} человек`
};

const styles: Record<string, SxProps<Theme>> = {
  title: theme => ({
    mb: theme.spacing(4)
  }),
  item: theme => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    mb: theme.spacing(1)
  }),
  counter: theme => ({
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(0, 1)
  }),
  positionItem: theme => ({
    margin: theme.spacing(2, 0)
  }),
  itemTitle: {
    flexGrow: 4
  },
  itemPrice: theme => ({
    mr: theme.spacing(3)
  }),
  itemCount: theme => ({
    m: theme.spacing(0, 2)
  }),
  menuType: theme => ({
    mb: theme.spacing(2)
  }),
  order: theme => ({
    display: 'flex',
    justifyContent: 'space-between',
    mt: theme.spacing(3)
  }),
  orderList: theme => ({
    width: '60%',
    ml: theme.spacing(4),
    p: theme.spacing(2)
  }),
  menuCategory: {
    width: '40%',
    maxHeight: '520px'
  },
  sum: theme => ({
    display: 'flex',
    justifyContent: 'space-between',
    m: theme.spacing(2, 0)
  }),
  sale: theme => ({
    display: 'flex',
    justifyContent: 'space-between',
    m: theme.spacing(1, 0)
  }),
  saleInput: {
    width: '100px'
  }
};

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
  const { menuStore } = useStore();
  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu>({});
  const [sum, setSum] = useState<number>(0);
  const containerRef = useRef(null);
  const [saleChecked, setSaleChecked] = useState<boolean>(false);
  const [serviceFeeChecked, setServiceFeeChecked] = useState<boolean>(false);
  const [sale, setSale] = useState<string>('');
  const [totalAmount, setTotalAmount] = useState<number>(sum);
  useTitle(locale.title);

  useEffect(() => {
    if (!Object.keys(menuStore.menu).length) {
      menuStore.fetchMenu();
    }
  }, [menuStore.menu]);

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

  const methods = useForm<IForm>(
    {
      resolver: yupResolver(schema),
      mode: 'onTouched'
    }
  );

  const { watch } = methods;
  const onSubmit: SubmitHandler<IForm> = (data) => {
    const result = { ...data, menu: { ...selectedMenu } };

    console.log(result, 'resultData');
  };

  const addItem = (type: string, data: ISelectedItem) => {
    if (selectedMenu[type]) {
      setSelectedMenu({ ...selectedMenu, [type]: [...selectedMenu[type], { ...data }] });
    } else {
      setSelectedMenu({ ...selectedMenu, [type]: [{ ...data }] });
    }

    setSum(sum + data.price);
  };

  const deleteItem = (type: string, title: string) => {
    setSelectedMenu({
      ...selectedMenu,
      [type]: selectedMenu[type].filter(item => item.title !== title)
    });

    const deletedItem = selectedMenu[type].find(item => item.title === title);

    if (deletedItem) {
      setSum(sum - (deletedItem.price * (deletedItem.count || 1)));
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
            } else if (type === 'remove' && item.count && item.count > 1) {
              resultItem.count = (item?.count || 0) - 1;
              setSum(sum - item.price);
            }

            return resultItem;
          }

          return item;
        })
    });
  };

  const renderItem = (type: string, itemData: ISelectedItem) => (
    <Box sx={styles.item} key={itemData.title}>
      <Typography variant="body2" sx={styles.itemTitle}>{itemData.title}</Typography>
      <Typography variant="subtitle1" sx={styles.itemPrice}>{`${itemData.price} руб.`}</Typography>
      <Typography variant="subtitle1">{`${itemData.weight} гр.`}</Typography>
      <Box sx={styles.counter}>
        <IconButton size="small" onClick={() => onEditCount(type, itemData.title, 'remove')}>
          <RemoveIcon color="primary" />
        </IconButton>
        <Typography variant="body2" sx={styles.itemCount}>{`${itemData.count} шт`}</Typography>
        <IconButton size="small" onClick={() => onEditCount(type, itemData.title, 'add')}>
          <AddIcon color="primary" />
        </IconButton>
      </Box>
      <IconButton size="small" onClick={() => deleteItem(type, itemData.title)}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );

  const onChangeSnacks = (option: IMenuItem, type: string) => {
    if (option) {
      addItem(type, { ...option, count: 1 });
    }
  };

  const getSuggestOptions = (type: string) => {
    // @ts-ignore
    if (menuStore.menu[type]) {
      // @ts-ignore
      return menuStore.menu[type].filter((option: ISelectedItem) => {
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

  const onSale = (event: ChangeEvent<HTMLInputElement>) => {
    setSale(event.target.value);
  };

  const renderFooter = (): JSX.Element => (
    <>
      {sum > 0 && <Divider />}
      {sum > 0 && (
        <Box sx={styles.footer} mt={2}>
          <Box sx={styles.sum}>
            <Typography variant="body1" mb={1}>{locale.sumLabel}</Typography>
            <Box dangerouslySetInnerHTML={{ __html: locale.sumCurrency(sum) }} />
          </Box>
          <FormControlLabel
            label={locale.serviceFeeLabel}
            control={<Checkbox checked={serviceFeeChecked} onChange={onCheckedServiceFee} size="small" />}
          />
          <Box sx={styles.sale}>
            <FormControlLabel
              label={locale.addSaleLabel}
              control={<Checkbox checked={saleChecked} onChange={onCheckedSale} size="small" />}
            />

            <TextField
              label={locale.saleLabel}
              value={sale}
              onChange={onSale}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>
              }}
              disabled={!saleChecked}
              type="number"
              sx={styles.saleInput}
            />
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

        <Box sx={styles.order}>
          <Grid container spacing={4} sx={styles.menuCategory}>
            {Object.keys(menuStore.menu).map(menuType => (
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
      </MuiForm>
    </div>
  );
};

export default observer(Banquets);
