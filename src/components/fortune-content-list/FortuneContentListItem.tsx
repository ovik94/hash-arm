import React, { FC, useState } from 'react';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { IconButton, Stack, Typography, Box, TextField } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { Color, ColorPicker } from 'material-ui-color';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { Theme } from '@mui/material/styles';
import { IDragProps } from '../draggable-list/DraggableList';
import { IWheelOfFortuneContent } from '../../store/FortuneStore';
import useLocale from '../../hooks/useLocale';
import styles from './styles';
import Locale from './locale';

interface IFortuneContentListItemProps {
  item?: IWheelOfFortuneContent;
  onDeleteValue?: (value: IWheelOfFortuneContent) => void;
  onAddValue?: (value: IWheelOfFortuneContent) => void;
  dragProps?: IDragProps;
}

const transformColorToHslForm = (color: Array<number>): string => `hsl(${color[0]} ${color[1]}% ${color[2]}%)`;

const FortuneContentListItem: FC<IFortuneContentListItemProps> = ({
  onDeleteValue,
  onAddValue,
  item,
  dragProps
}) => {
  const [editableValue, setEditableValue] = useState('');
  const [color, setColor] = useState<any>();
  const locale = useLocale(Locale);

  const isNewItem = !item;

  const onDelete = () => {
    if (onDeleteValue && item) {
      onDeleteValue(item);
    }
  };

  const onAdd = () => {
    if (onAddValue && color) {
      onAddValue({ title: editableValue, color: transformColorToHslForm(color?.hsl) });
    }
  };

  const onChangeColor = (newColor: Color) => {
    setColor(newColor);
  };

  return (
    <Stack
      sx={styles.value}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      ref={dragProps?.ref}
      {...dragProps?.draggableProps}
    >
      <Box sx={styles.dragIconBox} {...dragProps?.dragHandleProps}>
        <DragIndicatorIcon sx={styles.dragIcon} />
      </Box>

      {isNewItem && (
        <>
          <TextField
            sx={styles.editableTextField}
            value={editableValue}
            InputLabelProps={{ shrink: true }}
            placeholder={locale.titlePlaceholder}
            autoFocus
            onChange={e => setEditableValue(e.target.value)}
          />
          <ColorPicker
            hideTextfield
            value={color}
            onChange={onChangeColor}
          />
        </>
      )}
      {!isNewItem && <Typography sx={styles.title}>{item?.title}</Typography>}
      {item?.color && <Box sx={[styles.colorBox, { backgroundColor: item?.color }] as SystemStyleObject<Theme>} />}
      {isNewItem ? (
        <IconButton
          onClick={onAdd}
          disabled={!editableValue}
          disableFocusRipple
          disableRipple
          sx={{ ml: 0.5 }}
          color="success"
          size="small"
        >
          <DoneIcon />
        </IconButton>
      ) : (
        <IconButton
          onClick={onDelete}
          disableFocusRipple
          disableRipple
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      )}
    </Stack>
  );
};

export default FortuneContentListItem;
