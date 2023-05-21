import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../Components/TopBar/TopBar";
import Navigation from "../Components/Navigation/Navigation";
import Floating from "../Components/Floating/Floating";
import DashboardLayoutViewModel from "./DashboardLayoutModel";

const DashboardLayout: React.FC = () => {
  const { search, setSearch } = DashboardLayoutViewModel();

  return (
    <>
      <TopBar search={search} setSearch={setSearch} />
      <main className="flex-1 overflow-auto" style={{ height: "100vh" }}>
        <Outlet />
      </main>
      <Floating />
      <Navigation />
    </>
  );
};

export default DashboardLayout;
