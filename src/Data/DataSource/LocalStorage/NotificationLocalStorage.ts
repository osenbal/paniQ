import LocalStorage from "./LocalStorage";

class NotificationLocalStorage {
  public static getNotifications(): boolean {
    console.log("getNotifications : ", LocalStorage.get("notifications"));
    return LocalStorage.get("notifications");
  }

  public static setNotifications(notifications: any) {
    LocalStorage.set("notifications", notifications);
  }

  public static removeNotifications() {
    LocalStorage.remove("notifications");
  }
}

export default NotificationLocalStorage;
