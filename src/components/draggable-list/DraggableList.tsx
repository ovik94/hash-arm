import React, { FC, memo } from 'react';
import { DragDropContext,
  Droppable,
  DropResult,
  ResponderProvided,
  Draggable,
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
  DraggableStateSnapshot } from 'react-beautiful-dnd';

export interface IDragProps {
  ref: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

export interface IDraggableListItemProps {
  dragProps?: IDragProps;
  snapshot?: DraggableStateSnapshot;
  item: any;

  [otherProps: string]: any
}

interface IDraggableList {
  onDragEnd: (result: DropResult, provided: ResponderProvided) => void;
  DraggableListItem: FC<IDraggableListItemProps>;
  listItemProps: any;
  list: Array<any>;
}

export function reorder<T>(
  list: Array<T>,
  startIndex: number,
  endIndex: number
): Array<T> {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

const DraggableList: FC<IDraggableList> = ({
  onDragEnd,
  DraggableListItem,
  list,
  listItemProps
}) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="droppable-list">
      {provided => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {list.map((item, index) => (
            <Draggable
              disableInteractiveElementBlocking={false}
              draggableId={item.title}
              index={index}
              key={item.title}
            >
              {(dragProvided, snapshot) => (
                <DraggableListItem
                  dragProps={{
                    ref: dragProvided.innerRef,
                    draggableProps: { ...dragProvided.draggableProps },
                    dragHandleProps: { ...dragProvided.dragHandleProps }
                  }}
                  snapshot={snapshot}
                  item={item}
                  {...listItemProps}
                />
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
);

export default memo(DraggableList);
