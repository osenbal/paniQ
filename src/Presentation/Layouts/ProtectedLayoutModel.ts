import { useEffect, useRef } from "react";
import { asyncMe } from "@/Domain/Reducer/authSlice";
import { useAppDispatch } from "@/Domain/Store/hooks";
import {
  RefHandlerModalDisqus,
  RefHandlerPostDetail,
  RefHandlerModalQrcode,
} from "../Components/Modal";

export default function ProtectedLayoutViewModel() {
  const dispatch = useAppDispatch();

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
