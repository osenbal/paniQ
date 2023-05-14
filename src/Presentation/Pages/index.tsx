import React from "react";
import NotificationRequest from "@/Presentation/Components/RequestPermissions/NotificationRequest";

const Index: React.FC = () => {
  const buttonClick = () => {
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

  return (
    <>
      <NotificationRequest />
      <div className="page">
        <button onClick={buttonClick} className="button">
          Hello world.
        </button>
      </div>
    </>
  );
};

export default Index;
