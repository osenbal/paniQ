import React from "react";
import "./MainLayout.modules.css";

type Props = {
  children: React.ReactNode;
};

const MainLayout: React.FC<Props> = ({ children }) => {
  return <div className="mainLayout_container">{children}</div>;
};

export default MainLayout;
