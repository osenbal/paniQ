import React from "react";
import IconHome from "@/Assets/Icons/icon_home.svg";
import IconCamera from "@/Assets/Icons/icon_camera.svg";
import IconProfile from "@/Assets/Icons/icon_profile.svg";

import "./Navigation.modules.css";

const Navigation: React.FC = () => {
  return (
    <>
      <nav style={{ position: "relative", width: "100%" }}>
        <ul
          className="flex flex-row justify-between items-center navigation_margin"
          style={{
            position: "fixed",
            width: "100%",
            height: "82px",
            bottom: 0,
            backgroundColor: "#ffffff",
            padding: "0 24px",
          }}
        >
          <li>
            <img style={{ cursor: "pointer" }} src={IconHome} alt="home" />
          </li>
          <li>
            <img style={{ cursor: "pointer" }} src={IconCamera} alt="camera" />
          </li>
          <li>
            <img
              style={{ cursor: "pointer" }}
              src={IconProfile}
              alt="profile"
            />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
