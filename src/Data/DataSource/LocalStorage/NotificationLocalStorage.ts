import LocalStorage from "./LocalStorage";

class NotificationLocalStorage {
  public static getNotifications(): NotificationPermission {
    const notifications = LocalStorage.get("notifications");
    if (notifications) {
      return notifications;
    }
    return "default";
  }

  public static setNotifications(notifications: NotificationPermission): void {
    LocalStorage.set("notifications", notifications);
  }

  public static removeNotifications(): void {
    LocalStorage.remove("notifications");
  }
}

export default NotificationLocalStorage;
