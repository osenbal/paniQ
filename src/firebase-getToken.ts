import { getToken, onMessage } from "firebase/messaging";
import { messagingApp } from "./Domain/ExternalService/FirebaseApp";

const requestPermissionNotification = async () => {
  // window.addEventListener("load", function () {
  Notification.requestPermission().then(async (permission) => {
    if (permission === "granted") {
      // const swPath = `${process.env.PUBLIC_URL}/firebase-messaging-sw.js`;
      // if ("serviceWorker" in navigator) {
      //   navigator.serviceWorker.register(swPath).then((registration) => {
      //     console.log("Service Worker firebase Registered Successfully");

      getToken(messagingApp, {
        vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log("currect token : ", currentToken);
          } else {
            console.log(
              "No registration token available. Request permission to generate one."
            );
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
        });

      onMessage(messagingApp, (payload) => {
        console.log("Message received. ", payload);
        // shoow notification
        const notificationTitle = "Background Message Title";
        const notificationOptions = {
          body: "Background Message body.",
          icon: "/logo192.png",
        };

        const notification = new Notification(
          notificationTitle,
          notificationOptions
        );
        console.log("notification : ", notification);
      });

      // });
    }
    // } else {
    //   console.log("Unable to get permission to notify.");
    // }
  });
  // });
};

export default requestPermissionNotification;
