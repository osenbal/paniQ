// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.

importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyAQPwceB64KyyxzZnVY41Sat05OjLaEelo",
  authDomain: "golek-notification.firebaseapp.com",
  projectId: "golek-notification",
  storageBucket: "golek-notification.appspot.com",
  messagingSenderId: "930965411985",
  appId: "1:930965411985:web:701e4e885cf12bf6d0c730",
  measurementId: "G-Y5HLKLBG2T",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
