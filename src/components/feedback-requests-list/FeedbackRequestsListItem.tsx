import React, { FC } from 'react';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Stack, Typography, Box } from '@mui/material';
import Locale from './locale';
import styles from './styles';
import { IFeedbackItem } from '../../store/FeedbackStore';
import { IDragProps } from '../draggable-list/DraggableList';
import Confirm from '../confirm/Confirm';
import useStore from '../../hooks/useStore';
import useLocale from '../../hooks/useLocale';
import FeedbackRequestDetails, {
  IFeedbackRequestDetailsForm
} from '../feedback-request-details/FeedbackRequestDetails';

interface IDictionaryValuesListProps {
  item?: IFeedbackItem;
  onDeleteValue?: (value: IFeedbackItem) => void;
  onEditValue?: (data: IFeedbackRequestDetailsForm & { options: Array<string> }) => void;
  dragProps?: IDragProps;
}

const FeedbackRequestsListItem: FC<IDictionaryValuesListProps> = ({
  onDeleteValue,
  item,
  onEditValue,
  dragProps
}) => {
  const locale = useLocale(Locale);
  const { popupStore } = useStore();

  const onCancelConfirm = () => {
    popupStore.closePopup();
  };

  const onAcceptDelete = () => {
    if (onDeleteValue && item) {
      onDeleteValue(item);
    }
  };

  const onDelete = () => {
    popupStore.openPopup({
      content: Confirm,
      contentProps: {
        locale: locale.confirmDeleteLocale(item?.title),
        onAccept: onAcceptDelete,
        onCancel: onCancelConfirm
      }
    });
  };

  const onEdit = () => {
    popupStore.openPopup({
      props: { size: 'md' },
      content: FeedbackRequestDetails,
      contentProps: {
        feedbackData: item,
        onChange: onEditValue
      }
    });
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
      <Box {...dragProps?.dragHandleProps}>
        <DragIndicatorIcon sx={styles.dragIcon} />
      </Box>

      <Typography variant="subtitle2" sx={styles.name}>{item?.title}</Typography>
      <>
        <IconButton
          onClick={onEdit}
          size="small"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={onDelete}
          sx={{ mx: { xs: 1, sm: 2 } }}
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      </>
    </Stack>
  );
};

export default FeedbackRequestsListItem;
