import { getToken, onMessage } from "firebase/messaging";
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

  try {
    // register service worker
    await navigator.serviceWorker.register("/firebase-messaging-sw.js", {
      scope: "/",
    });
    await navigator.serviceWorker.ready;
    console.info("Service worker ready.");

    // get token from firebase
    const currentToken = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
    });

    if (currentToken) {
      try {
        // subscribe to topic newPost
        const subscribeUrl = `https://iid.googleapis.com/iid/v1/${currentToken}/rel/topics/newPost`;
        await fetch(subscribeUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_FIREBASE_SERVER_KEY}`,
          },
        });

        console.info("Success subscribed to topic.");

        // handle message when receive notification in foreground
        onMessage(messaging, (payload) => {
          // show notification here
          const notificationTitle = payload.notification?.title;
          const notificationOptions = {
            body: payload.notification?.body,
            icon: payload.notification?.icon,
          };

          new Notification(
            notificationTitle || "PaniQ Notification",
            notificationOptions
          );
        });
      } catch (error) {
        console.log("Cannot subscribe to topic.");
      }
    }
  } catch (error) {
    console.log("An error occurred while registering service worker. ", error);
  }
};

export default requestNotificationPermission;
