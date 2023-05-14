import React from "react";
import NotificationRequest from "@/Presentation/Components/RequestPermissions/NotificationRequest";

const Index: React.FC = () => {
  const buttonClick = () => {
    // addNotification({
    //   title: "Warning",
    //   subtitle: "This is a subtitle",
    //   message: "This is a very long message",
    //   theme: "darkblue",
    //   native: false, // when using native, your OS will handle theming.
    // });
    if (Notification.permission == "granted") {
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
    <div>
      <NotificationRequest />
      <div className="page">
        <button onClick={buttonClick} className="button">
          Hello world.
        </button>
      </div>
    </div>
  );
};

export default Index;
