import { useEffect, useRef } from "react";
import { asyncMe } from "@/Domain/Reducer/authSlice";
import { useAppDispatch, useAppSelector } from "@/Domain/Store/hooks";
import {
  RefHandlerModalDisqus,
  RefHandlerPostDetail,
  RefHandlerModalQrcode,
} from "../Components/Modal";
import { onMessage, getToken } from "firebase/messaging";
import { messagingApp } from "@/Domain/ExternalService/FirebaseApp";

export default function ProtectedLayoutViewModel() {
  const dispatch = useAppDispatch();
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const { notificationPermission } = useAppSelector((state) => state.global);

  // ref for modal
  const modalQrcodeRef =
    useRef() as React.MutableRefObject<RefHandlerModalQrcode>;
  const modalPostDetailRef =
    useRef() as React.MutableRefObject<RefHandlerPostDetail>;
  const modalDisqusRef =
    useRef() as React.MutableRefObject<RefHandlerModalDisqus>;

  const getCurrentUser = async (): Promise<void> => {
    try {
      await dispatch(asyncMe());
    } catch (error) {
      console.log(error);
    }
  };

  const firebaseGetToken = async () => {
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

          // handle message when receive notification in foreground
          onMessage(messaging, (payload) => {
            console.log("Message received onMessage : ", payload);
            // filter notification if user is the one who post
            if (user?.id === payload.data?.userId) {
              return;
            }

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

          console.info("Success subscribed to topic.");
        } catch (error) {
          console.log("Cannot subscribe to topic.");
        }
      }
    } catch (error) {
      console.log(
        "An error occurred while registering service worker. ",
        error
      );
    }
  };

  useEffect(() => {
    if (Notification.permission === "granted") {
      console.log("Notification permission granted.");
      if (isAuth) {
        firebaseGetToken();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationPermission]);

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    getCurrentUser,
    modalDisqusRef,
    modalPostDetailRef,
    modalQrcodeRef,
  };
}
