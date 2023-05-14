import React, { useState, useEffect } from "react";
import styles from "./Notification.module.css";

const NotificationRequest = () => {
  const [state, setState] = useState({ permission: "unknown" });
  useEffect(() => {
    if ("Notification" in window)
      setState((state) => ({ ...state, permission: Notification.permission }));
  }, [setState]);

  const requestNotificationPermission = () => {
    Notification.requestPermission().then((permission) => {
      setState((state) => ({ ...state, permission }));
    });
  };

  const sendNotif = () => {
    if (Notification.permission === "granted") {
      navigator.serviceWorker.getRegistration().then(function (reg: any) {
        var options = {
          body: "Here is a notification body!",
          icon: "images/example.png",
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
          },
          actions: [
            {
              action: "explore",
              title: "Explore this new world",
              icon: "images/checkmark.png",
            },
            {
              action: "close",
              title: "Close notification",
              icon: "images/xmark.png",
            },
          ],
        };
        reg.showNotification("Hello world!", options);
      });
    }
  };

  if (!("Notification" in window)) {
    return <div>No notification in this browser</div>;
  }

  return (
    <>
      <div className={styles.permissionRequestor}>
        <div>Notification permission: {state.permission}</div>
        <button
          className={styles.button}
          onClick={requestNotificationPermission}
        >
          Request notification permission
        </button>

        <button onClick={sendNotif}>Send notification</button>
      </div>
    </>
  );
};

export default NotificationRequest;
