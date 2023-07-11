import { getToken } from "firebase/messaging";
import { messagingApp } from "./Domain/ExternalService/FirebaseApp";

const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    console.log("Notification permission granted.");
    firebaseGetToken();
  } else {
    console.log("Unable to get permission to notify.");
  }
};

const firebaseGetToken = async () => {
  const messaging = await messagingApp();
  if (!messaging) {
    return;
  }

  getToken(messaging, {
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
};

export default requestNotificationPermission;
