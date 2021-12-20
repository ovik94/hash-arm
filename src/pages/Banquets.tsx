import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { Grid, IconButton, Typography, Paper } from '@mui/material';
import { observer } from 'mobx-react';
import { Theme } from '@mui/material/styles';
import { SubmitHandler, useForm } from 'react-hook-form';
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

const Locale = {
  title: 'Заказ банкетов',
  nameLabel: 'Имя',
  phoneLabel: 'Номер телефона',
  dateLabel: 'Дата и время банкета',
  potables: 'Напитки',
  salads: 'Салаты',
  snacks: 'Закуски',
  hotter: 'Горячее',
  sideDishes: 'Гарниры',
  banquetMenu: 'Банкетное меню',
  addPosition: 'Добавить'
};

const useStyles = makeStyles((theme: Theme) => createStyles({
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  counter: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(0, 1)
  },
  positionItem: {
    margin: theme.spacing(2, 0)
  }
}));

interface IForm {
  name: string;
  phone: string;
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
  const classes = useStyles();
  const locale = useLocale(Locale);
  const { menuStore } = useStore();
  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu>({});

  useTitle(locale.title);

  useEffect(() => {
    if (!Object.keys(menuStore.menu).length) {
      menuStore.fetchMenu();
    }
  }, [menuStore.menu]);

  const schema = yup.object({
    name: yup.string().required(),
    phone: yup.string().isPhone().required(),
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
    console.log(data, 'data');
  };

  console.log(watch(), 'data');
  console.log(menuStore.menu, 'menuStore.menu');

  const addItem = (type: string, data: ISelectedItem) => {
    if (selectedMenu[type]) {
      setSelectedMenu({ ...selectedMenu, [type]: [...selectedMenu[type], { ...data }] });
    } else {
      setSelectedMenu({ ...selectedMenu, [type]: [{ ...data }] });
    }
  };

  const deleteItem = (type: string, title: string) => {
    setSelectedMenu({
      ...selectedMenu,
      [type]: selectedMenu[type].filter(item => item.title !== title)
    });
  };

  const onEditCount = (itemType: string, title: string, type: 'add' | 'remove') => {
    console.log(itemType, title, type, 'itemType');
    setSelectedMenu({
      ...selectedMenu,
      [itemType]: selectedMenu[itemType]
        .map((item: ISelectedItem) => {
          if (item.title === title) {
            const resultItem = { ...item };

            if (type === 'add') {
              resultItem.count = (item?.count || 0) + 1;
            } else if (type === 'remove' && item.count && item.count > 1) {
              resultItem.count = (item?.count || 0) - 1;
            }

            console.log(resultItem, 'resultItem');
            return resultItem;
          }

          return item;
        })
    });
  };

  const renderItem = (type: string, itemData: ISelectedItem) => (
    <div className={classes.item} key={itemData.title}>
      <Typography variant="body2" style={{ flexGrow: 4 }}>{itemData.title}</Typography>
      <Typography variant="subtitle1" style={{ marginRight: '32px' }}>{`${itemData.price} руб.`}</Typography>
      <Typography variant="subtitle1">{`${itemData.weight} гр.`}</Typography>
      <div className={classes.counter}>
        <IconButton size="small" onClick={() => onEditCount(type, itemData.title, 'remove')}>
          <RemoveIcon color="primary" />
        </IconButton>
        <Typography variant="body2" style={{ margin: '0 16px' }}>{`${itemData.count} шт`}</Typography>
        <IconButton size="small" onClick={() => onEditCount(type, itemData.title, 'add')}>
          <AddIcon color="primary" />
        </IconButton>
      </div>
      <IconButton size="small" onClick={() => deleteItem(type, itemData.title)}>
        <DeleteIcon />
      </IconButton>
    </div>
  );

  const onChangeSnacks = (option: IMenuItem, type: string) => {
    if (option) {
      addItem(type, { ...option, count: 1 });
    }
    console.log(option, 'options');
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

  return (
    <div>
      <Typography variant="h2" style={{ marginBottom: '32px' }}>{locale.title}</Typography>
      <MuiForm methods={methods} onSubmit={onSubmit}>
        <div>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <MuiFormInput name="name" label={locale.nameLabel} />
            </Grid>
            <Grid item xs={12} md={4}>
              <MuiFormMaskedInput
                mask="+7-###-###-##-##"
                name="phone"
                label={locale.phoneLabel}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <MuiFormDateTimePicker name="date" label={locale.dateLabel} />
            </Grid>
          </Grid>
        </div>

        <Grid container rowSpacing={3} spacing={4}>
          {Object.keys(menuStore.menu).map(menuType => (
            <Grid item xs={6} key={menuType}>
              <Typography variant="h4" style={{ marginBottom: '16px' }}>{locale[menuType]}</Typography>
              {(selectedMenu[menuType] || []).map(item => renderItem(menuType, item))}
              <MuiSuggestSelector
                label={locale.addPosition}
                onChange={(option: IMenuItem) => onChangeSnacks(option, menuType)}
                options={getSuggestOptions(menuType)}
                getOptionLabel={(option: IMenuItem) => option?.title || ''}
              />
            </Grid>
          ))}
        </Grid>
      </MuiForm>
    </div>
  );
};

export default observer(Banquets);
