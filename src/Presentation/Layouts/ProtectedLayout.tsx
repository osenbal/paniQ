import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedLayoutViewModel from "./ProtectedLayoutModel";
import ModalDisqus from "../Components/Modal/ModalDisqus";
import ModalPostDetail from "../Components/Modal/ModalPostDetail";
import ModalQrcode from "../Components/Modal/ModalQrcode";

const ProtectedLayout: React.FC = () => {
  const { modalDisqusRef, modalPostDetailRef, modalQrcodeRef } =
    ProtectedLayoutViewModel();

  return (
    <>
      <Outlet />

      <div>
        <ModalDisqus position="bottom" ref={modalDisqusRef} />
        <ModalQrcode ref={modalQrcodeRef} />
        <ModalPostDetail ref={modalPostDetailRef} />
      </div>
    </>
  );
};

export default ProtectedLayout;
