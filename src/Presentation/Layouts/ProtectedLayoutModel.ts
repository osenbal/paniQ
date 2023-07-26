import { useEffect, useRef } from "react";
import { asyncMe } from "@/Domain/Reducer/authSlice";
import { useAppDispatch, useAppSelector } from "@/Domain/Store/hooks";
import {
  RefHandlerModalDisqus,
  RefHandlerPostDetail,
  RefHandlerModalQrcode,
} from "../Components/Modal";
import { firebaseGetToken } from "@/Domain/ExternalService/FCM_getToken";

export default function ProtectedLayoutViewModel() {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);

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

  useEffect(() => {
    if (Notification.permission === "granted") {
      console.log("Notification permission granted.");
      if (isAuth) {
        firebaseGetToken();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
