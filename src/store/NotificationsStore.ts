import { makeAutoObservable } from 'mobx';
// eslint-disable-next-line import/no-cycle
import { RootStore } from './RootStore';

export interface NotificationButton {
  action?: () => void;
  label: string;
}

export interface INotification {
  id: string;
  code: string;
  text?: string;
  type?: 'error' | 'info' | 'success';
  primaryButton?: NotificationButton;
  secondaryButton?: NotificationButton;
  options?: { [key: string]: any }
  params?: { [key: string]: any }
}

export default class NotificationsStore {
  public notifications: Array<INotification> = [];

  protected rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  public addNotification(notification: Omit<INotification, 'id'>): void {
    const id: string = String(Math.random()).slice(2);
    const notificationWithId = { ...notification, id };

    if (!notification.type) {
      notificationWithId.type = 'info';
    }

    this.notifications.push(notificationWithId);
  }
}
