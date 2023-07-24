import LocalStorage from "./LocalStorage";

class NotificationLocalStorage {
  public static getNotifications(): boolean {
    return LocalStorage.get("notifications");
  }

  public static setNotifications(notifications: string | boolean): void {
    LocalStorage.set("notifications", notifications);
  }

  public static removeNotifications(): void {
    LocalStorage.remove("notifications");
  }
}

export default NotificationLocalStorage;
