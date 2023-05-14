import React, { useState, useEffect } from "react";
import styles from "./Notification.module.css";

const NotificationRequest = () => {
  const [state, setState] = useState({ permission: "unknown" });

  useEffect(() => {
    if (state.permission === "default" || state.permission === "unknown") {
      requestNotificationPermission();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestNotificationPermission = () => {
    Notification.requestPermission().then((permission) => {
      setState((state) => ({ ...state, permission }));
    });
  };

  return (
    <>
      <div className={styles.permissionRequestor}>
        <div>Notification permission: {state.permission}</div>
      </div>
    </>
  );
};

export default NotificationRequest;
