import React, { FC, useCallback, useMemo, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { DropResult } from 'react-beautiful-dnd';
import AddIcon from '@mui/icons-material/Add';
import { IWheelOfFortuneContent } from '../../store/FortuneStore';
import DraggableList, { reorder } from '../draggable-list/DraggableList';
import FortuneContentListItem from './FortuneContentListItem';
import useLocale from '../../hooks/useLocale';
import Locale from './locale';

interface IFortuneContentListProps {
  content: Array<IWheelOfFortuneContent>;
  onChange: (content: Array<IWheelOfFortuneContent>) => void;
}

const FortuneContentList: FC<IFortuneContentListProps> = ({ content, onChange }) => {
  const locale = useLocale(Locale);
  const [showAddValueItem, setShowAddValueItem] = useState(false);

  const onAdd = (value: IWheelOfFortuneContent) => {
    const newContent = content.slice(0);
    newContent.push(value);
    onChange(newContent);
    setShowAddValueItem(false);
  };

  const onDeleteValue = (value: IWheelOfFortuneContent) => {
    const newContent = content.filter(contentItem => contentItem.title !== value.title);
    onChange(newContent);
  };

  const draggableListItemProps = useMemo(() => ({
    onDeleteValue
  }), [content]);

  const onDragEnd = useCallback(({ destination, source }: DropResult) => {
    if (!destination) {
      return;
    }

    const newContent = reorder<IWheelOfFortuneContent>(content, source.index, destination.index);

    onChange(newContent);
  }, [content]);

  return (
    <Box>
      <Stack direction="row" justifyContent="center" mb={1}>
        <Button
          onClick={() => setShowAddValueItem(true)}
          startIcon={<AddIcon />}
          size="small"
        >
          {locale.addButtonLabel}
        </Button>
      </Stack>

      <DraggableList
        onDragEnd={onDragEnd}
        DraggableListItem={FortuneContentListItem}
        listItemProps={draggableListItemProps}
        list={content}
      />
      {showAddValueItem && (
        <FortuneContentListItem onAddValue={onAdd} />
      )}
    </Box>
  );
};

export default FortuneContentList;
