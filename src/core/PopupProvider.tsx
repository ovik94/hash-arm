import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import Popup from '../components/popup/Popup';
import useStore from '../hooks/useStore';

const PopupProvider: FC = () => {
  const { popupStore } = useStore();
  const Content = popupStore.popup[popupStore.popup.length - 1]?.content;
  const currentPopup = popupStore.popup[popupStore.popup.length - 1];
  const contentProps = currentPopup?.contentProps || {};
  const popupProps = currentPopup?.props || {};

  if (!Content) {
    return null;
  }

  return (
    <Popup open={!!popupStore.popup.length} onClose={popupStore.closePopup} {...popupProps}>
      {Content && <Content {...contentProps} />}
    </Popup>
  );
};

export default observer(PopupProvider);
