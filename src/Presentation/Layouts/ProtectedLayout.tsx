import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedLayoutViewModel from "./ProtectedLayoutModel";
import { RefModalProvider } from "@/Domain/Context/RefModal.context";
import ModalDisqus from "../Components/Modal/ModalDisqus";
import ModalPostDetail from "../Components/Modal/ModalPostDetail";
import ModalQrcode from "../Components/Modal/ModalQrcode";

const ProtectedLayout: React.FC = () => {
  const { modalDisqusRef, modalPostDetailRef, modalQrcodeRef } =
    ProtectedLayoutViewModel();

  return (
    <RefModalProvider>
      <>
        <Outlet />

        <div>
          <ModalDisqus position="bottom" ref={modalDisqusRef} />
          <ModalQrcode ref={modalQrcodeRef} />
          <ModalPostDetail ref={modalPostDetailRef} />
        </div>
      </>
    </RefModalProvider>
  );
};

export default ProtectedLayout;
