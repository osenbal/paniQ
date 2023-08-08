import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import CheckSupportedBrowser from '@/utils/CheckSupportedBrowser';
import NotificationLocalStorage from '@/Data/DataSource/LocalStorage/NotificationLocalStorage';
import { useAppDispatch } from '@/Domain/Store/hooks';
import { setNotificationPermission } from '@/Domain/Reducer/notificationSlice';

const NotificationRequest: React.FC = () => {
  const dispatch = useAppDispatch();
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
      if (Notification.permission === 'default') {
        showModal();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestNotificationPermission = async () => {
    await Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        NotificationLocalStorage.setNotifications('granted');
        dispatch(setNotificationPermission('granted'));
        hideModal();
      } else if (permission === 'denied') {
        NotificationLocalStorage.setNotifications('denied');
        dispatch(setNotificationPermission('denied'));
        hideModal();
      }
    });
  };

  const rejectNotificationPermission = () => {
    NotificationLocalStorage.setNotifications('denied');
    dispatch(setNotificationPermission('denied'));
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
          style: { backgroundColor: '#00EBC7', color: '#00214D' },
        }}
      ></Modal>
    </>
  );
};

export default NotificationRequest;
