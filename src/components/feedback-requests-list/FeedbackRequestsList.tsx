import React, { FC, useCallback, useMemo } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { Box, Typography } from '@mui/material';
import DictionaryValuesListItem from './FeedbackRequestsListItem';
import DraggableList, { reorder } from '../draggable-list/DraggableList';
import useLocale from '../../hooks/useLocale';
import useStores from '../../hooks/useStore';
import Locale from './locale';
import styles from './styles';
import { IFeedbackItem } from '../../store/FeedbackStore';
import { IFeedbackRequestDetailsForm } from '../feedback-request-details/FeedbackRequestDetails';

interface IFeedbackRequestsListProps {
  onChange: (values: Array<IFeedbackItem>) => void;
  values: Array<IFeedbackItem>;
}

const FeedbackRequestsList: FC<IFeedbackRequestsListProps> = ({ onChange, values }) => {
  const locale = useLocale(Locale);
  const { popupStore } = useStores();

  const onDeleteValue = (value: Partial<IFeedbackItem>): void => {
    popupStore.closeAllPopup();

    const newValues = values.filter(valueItem => (value.id ? valueItem.id !== value.id : valueItem.id !== value.id));
    onChange(newValues);
  };

  const onEditValue = (data: IFeedbackRequestDetailsForm & { options: Array<string> }) => {
    popupStore.closeAllPopup();

    const newValues = values.map(value => (value.title === data.title ? ({ ...value, ...data }) : value));
    onChange(newValues);
  };

  const onDragEnd = useCallback(({ destination, source }: DropResult) => {
    if (!destination) {
      return;
    }

    const newItems = reorder<IFeedbackItem>(values, source.index, destination.index);

    onChange(newItems);
  }, [values]);

  const draggableListItemProps = useMemo(() => ({
    onDeleteValue,
    onEditValue
  }), [values]);

  return (
    <Box mt={2}>
      <Box sx={styles.header}>
        <Typography variant="caption">{locale.nameLabel}</Typography>
      </Box>
      <DraggableList
        onDragEnd={onDragEnd}
        DraggableListItem={DictionaryValuesListItem}
        listItemProps={draggableListItemProps}
        list={values}
      />
    </Box>
  );
};

export default FeedbackRequestsList;
