import { getToken } from "firebase/messaging";
import { messaging } from "./Domain/ExternalService/FirebaseApp";
import { getMessaging } from "firebase/messaging/sw";
import { onBackgroundMessage } from "firebase/messaging/sw";

const requestPermissionNotification = async () => {
  window.addEventListener("load", function () {
    Notification.requestPermission().then(async (permission) => {
      if (permission === "granted") {
        const swPath = `${process.env.PUBLIC_URL}/firebase-messaging-sw.js`;
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker.register(swPath).then((registration) => {
            console.log("Service Worker firebase Registered Successfully");

            getToken(messaging, {
              vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
              serviceWorkerRegistration: registration,
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
          });
        }
      } else {
        console.log("Unable to get permission to notify.");
      }
    });
  });
};

export default requestPermissionNotification;
