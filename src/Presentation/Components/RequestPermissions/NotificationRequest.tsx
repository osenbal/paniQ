import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import CheckSupportedBrowser from "@/utils/CheckSupportedBrowser";
import NotificationLocalStorage from "@/Data/DataSource/LocalStorage/NotificationLocalStorage";
import { firebaseGetToken } from "@/Domain/ExternalService/FCM_getToken";

const NotificationRequest = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (
      CheckSupportedBrowser.serviceWorker() &&
      CheckSupportedBrowser.pushManager()
    ) {
      if (
        Notification.permission === "default" &&
        NotificationLocalStorage.getNotifications() === null
      ) {
        showModal();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestNotificationPermission = async () => {
    await Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
        hideModal();
        firebaseGetToken();
      }
    });
  };

  const rejectNotificationPermission = () => {
    NotificationLocalStorage.setNotifications(false);
    hideModal();
  };

  return (
    <>
      <Modal
        title="Allow Notifications ?"
        open={open}
        onOk={requestNotificationPermission}
        onCancel={rejectNotificationPermission}
        okText="Allow"
        cancelText="Don't Allow"
        closable={false}
        maskClosable={false}
        okButtonProps={{
          style: { backgroundColor: "#00EBC7", color: "#00214D" },
        }}
      ></Modal>
    </>
  );
};

export default NotificationRequest;
