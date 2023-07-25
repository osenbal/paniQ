import { getToken } from "firebase/messaging";
import { messagingApp } from "@/Domain/ExternalService/FirebaseApp";

const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    console.log("Notification permission granted.");
    firebaseGetToken();
  } else {
    console.log("Unable to get permission to notify.");
  }
};

export const firebaseGetToken = async () => {
  const messaging = await messagingApp();
  if (!messaging) {
    return;
  }

  getToken(messaging, {
    vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
  })
    .then(async (currentToken) => {
      if (currentToken) {
        try {
          const subscribeUrl = `https://iid.googleapis.com/iid/v1/${currentToken}/rel/topics/newPost`;
          await fetch(subscribeUrl, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_FIREBASE_SERVER_KEY}`,
            },
          });
          console.log("Subscribed to topic.");
        } catch (error) {
          console.log("Cannot subscribe to topic.");
        }
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
