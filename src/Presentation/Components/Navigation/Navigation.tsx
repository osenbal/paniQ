import React from "react";
import { NavLink } from "react-router-dom";
import IconHome from "@/Assets/Icons/icon_home.svg";
import IconCamera from "@/Assets/Icons/icon_camera.svg";
import IconProfile from "@/Assets/Icons/icon_profile.svg";

import "./Navigation.modules.css";

type Props = {
  openModalProfile: () => void;
  ref?: React.LegacyRef<HTMLElement>;
};

const Navigation: React.FC<Props> = ({ openModalProfile, ref }) => {
  return (
    <>
      <nav ref={ref} style={{ position: "relative", width: "100%" }}>
        <ul
          className="flex flex-row justify-between items-center navigation_margin"
          style={{
            position: "fixed",
            width: "100%",
            height: "82px",
            bottom: 0,
            backgroundColor: "#ffffff",
            padding: "0 16px",
          }}
        >
          <li id="my-first-step">
            <NavLink to="/">
              <img style={{ cursor: "pointer" }} src={IconHome} alt="home" />
            </NavLink>
          </li>
          <li id="my-second-step">
            <NavLink to="/camera">
              <img
                style={{ cursor: "pointer" }}
                src={IconCamera}
                alt="camera"
              />
            </NavLink>
          </li>
          <li id="my-third-step">
            <div onClick={openModalProfile}>
              <img
                style={{ cursor: "pointer" }}
                src={IconProfile}
                alt="profile"
              />
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
