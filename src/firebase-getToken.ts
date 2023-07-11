import { onMessage, getToken } from "firebase/messaging";
import { messagingApp } from "./Domain/ExternalService/FirebaseApp";

const firebaseGetToken = async () => {
  Notification.requestPermission().then(async (permission) => {
    if (permission === "granted") {
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
    } else {
      console.log("Unable to get permission to notify.");
    }
  });
};

export default firebaseGetToken;
