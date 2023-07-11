// import config firebase
import firebaseConfig from "./config/firebase.config";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, isSupported } from "firebase/messaging";

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const messagingApp = async () =>
  (await isSupported()) && getMessaging(firebaseApp);

export default firebaseApp;
export { analytics, messagingApp };
