import { FC, ReactNode } from 'react';
import { makeAutoObservable } from 'mobx';
import { Theme, SxProps } from '@mui/material/styles';
// eslint-disable-next-line import/no-cycle
import { RootStore } from './RootStore';

export interface IPopupProps {
  open: boolean;
  children: ReactNode;
  onClose: () => void;
  sx?: Record<string, SxProps<Theme>>;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface IPopup<T = Record<string, any>> {
  content: FC<T> | null;
  contentProps?: T;
  props?: Partial<IPopupProps>;
}

export default class PopupStore {
  public popup: Array<IPopup<any>> = [];

  public isLoading = false;

  public closePopupHandler: () => void = () => this.popup.pop();

  protected rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  public closeAllPopup = (): void => {
    this.popup = [];
  };

  public setClosePopupHandler = (fn?: () => void) => {
    if (fn) {
      this.closePopupHandler = fn;
    } else {
      this.closePopupHandler = () => this.popup.pop();
    }
  };

  public closePopup = (): void => {
    this.closePopupHandler();
  };

  public setLoading = (value: boolean) => {
    this.isLoading = value;
  };

  public openPopup<T>(popup: IPopup<T>): void {
    this.popup.push(popup);
  }
}
