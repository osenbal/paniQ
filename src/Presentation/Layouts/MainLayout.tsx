import React, { useRef } from "react";
import { ToastContainer } from "react-toastify";
import ModalUnderMaintenance, {
  RefHandlerModalUnderMaintenance,
} from "@/Presentation/Components/Modal/ModalUnderMaintenance";

import "react-toastify/dist/ReactToastify.css";
import "./MainLayout.modules.css";

type Props = {
  children: React.ReactNode;
};

const MainLayout: React.FC<Props> = ({ children }) => {
  const refModalUnderMaintenance = useRef<RefHandlerModalUnderMaintenance>(
    {} as RefHandlerModalUnderMaintenance
  );

  return (
    <>
      {children}

      <ModalUnderMaintenance ref={refModalUnderMaintenance} />

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default MainLayout;
