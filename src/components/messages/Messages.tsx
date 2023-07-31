import React, { FC, memo } from 'react';
import { Alert, AlertColor, Typography } from '@mui/material';
import styles from './styles';

export enum MessageStatuses {
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO',
  SUCCESS = 'SUCCESS'
}

export interface IMessage {
  type: MessageStatuses;
  value?: string;
}

interface IMessagesProps {
  messages?: Array<IMessage>;
  isText?: boolean;
}

const Messages: FC<IMessagesProps> = ({ messages, isText = false }) => (
  <>
    {messages && messages.length > 0 && messages.map((message) => {
      const typeColor = message.type.toLocaleLowerCase() as AlertColor;
      const styleWrapper = styles({ type: typeColor });

      if (isText) {
        return (
          <Typography
            key={message.value}
            color={`${message.type.toLocaleLowerCase()}.primary`}
          >
            {message.value}
          </Typography>
        );
      }

      return (
        <Alert
          key={message.value}
          sx={styleWrapper.alert}
          severity={typeColor}
        >
          {message.value}
        </Alert>
      );
    })}
  </>
);

export default memo<IMessagesProps>(Messages);
