import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import ProtectedLayoutViewModel from "./ProtectedLayoutModel";

const ProtectedLayout: React.FC = () => {
  const { getCurrentUser } = ProtectedLayoutViewModel();

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="protectedLayout_container">
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
