import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../Components/TopBar/TopBar";
import Navigation from "../Components/Navigation/Navigation";
import Floating from "../Components/Floating/Floating";
import DashboardLayoutViewModel from "./DashboardLayoutModel";
import ModalProfile from "../Components/Modal/ModalProfile";
import ModalConfirmation from "../Components/Modal/ModalConfirmation";
import ScanQR from "../Components/ScanQR/ScanQR";
import ModalSearch from "../Components/Modal/ModalSearch";
import { TourProvider, useTourContext } from "@/Domain/Context/Tour.context";
import Joyride, { CallBackProps, STATUS } from "react-joyride";
import LocalStorage from "@/Data/DataSource/LocalStorage/LocalStorage";

const DashboardLayout: React.FC = () => {
  const {
    modalProfileRef,
    modalLogOutConfirmationRef,
    drawerQrScannerRef,
    onLogOut,
    userState,
    onValidatePost,
    handleSearch,
    modalSearchRef,
    handleOpenModalSearch,
  } = DashboardLayoutViewModel();

  const {
    state: { run, steps },
    setState,
  } = useTourContext();

  const closeTour = () => {
    setState({ run: false, tourActive: false });
    LocalStorage.set("@mainTour", "done");
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      closeTour();
    }
  };

  return (
    <>
      <TourProvider>
        <TopBar openModalSearch={handleOpenModalSearch} />
        <main className="flex-1 overflow-auto" style={{ height: "100%" }}>
          <Outlet />
        </main>
        <Floating
          showQrScanner={() => drawerQrScannerRef.current.openDrawerQrScanner()}
        />
        <Navigation
          openModalProfile={() => modalProfileRef.current.openModalProfile()}
        />
        <div>
          <ModalProfile
            ref={modalProfileRef}
            onLogout={() =>
              modalLogOutConfirmationRef.current.openModalConfirmation()
            }
            user={userState}
          />
          <ModalConfirmation
            ref={modalLogOutConfirmationRef}
            message="Are you sure logout from this account ?"
            onYes={onLogOut}
          />
          <ModalSearch
            ref={modalSearchRef}
            position="top"
            handleSearch={handleSearch}
          />
          <ScanQR ref={drawerQrScannerRef} onValidatePost={onValidatePost} />
        </div>

        <Joyride
          steps={steps}
          run={run}
          callback={handleJoyrideCallback}
          continuous
          hideCloseButton
          scrollToFirstStep
          disableScrolling
          showProgress
          showSkipButton
          styles={{
            options: {
              zIndex: 10000,
            },
          }}
        />
      </TourProvider>
    </>
  );
};

export default DashboardLayout;
