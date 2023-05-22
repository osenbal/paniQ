import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../Components/TopBar/TopBar";
import Navigation from "../Components/Navigation/Navigation";
import Floating from "../Components/Floating/Floating";
import DashboardLayoutViewModel from "./DashboardLayoutModel";
import ModalProfile from "../Components/Modal/ModalProfile";
import ModalConfirmation from "../Components/Modal/ModalConfirmation";

const DashboardLayout: React.FC = () => {
  const {
    search,
    setSearch,
    modalProfileRef,
    modalLogOutConfirmationRef,
    onLogOut,
  } = DashboardLayoutViewModel();

  return (
    <>
      <TopBar search={search} setSearch={setSearch} />
      <main className="flex-1 overflow-auto" style={{ height: "100vh" }}>
        <Outlet />
      </main>
      <Floating />
      <Navigation
        openModalProfile={() => modalProfileRef.current.openModalProfile()}
      />

      <div>
        <ModalProfile
          ref={modalProfileRef}
          onLogout={() =>
            modalLogOutConfirmationRef.current.openModalConfirmation()
          }
        />

        <ModalConfirmation
          ref={modalLogOutConfirmationRef}
          message="Are you sure logout from this account ?"
          onYes={onLogOut}
        />
      </div>
    </>
  );
};

export default DashboardLayout;
