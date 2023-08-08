import LocalStorage from './LocalStorage';

class NotificationLocalStorage {
  public static getNotifications(): NotificationPermission {
    const notifications = LocalStorage.get('notifications');
    if (notifications) {
      return notifications;
    }
    return 'default';
  }

  public static setNotifications(notifications: NotificationPermission): void {
    LocalStorage.set('notifications', notifications);
  }

  public static removeNotifications(): void {
    LocalStorage.remove('notifications');
  }
  public static getFcmClientToken(): string | null {
    const fcmClientToken = LocalStorage.get('fcmClientToken');
    if (fcmClientToken) {
      return fcmClientToken;
    }
    return null;
  }

  public static setFcmClientToken(fcmClientToken: string): void {
    LocalStorage.set('fcmClientToken', fcmClientToken);
  }

  public static removeFcmClientToken(): void {
    LocalStorage.remove('fcmClientToken');
  }
}

export default NotificationLocalStorage;
