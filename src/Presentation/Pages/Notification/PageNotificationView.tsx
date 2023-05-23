import React from "react";
import { useNavigate } from "react-router-dom";
import NotificationCollapse from "@/Presentation/Components/Collapse/NotificationCollapse";
import { Divider } from "antd";

import IconLeftArrow from "@/Assets/Icons/icon_leftArrow.svg";

const PageNotificationView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => navigate(-1)}
        style={{ height: "54px", cursor: "pointer" }}
        className="border-b-2 px-3.5 flex flex-row justify-start items-center"
      >
        <div
          style={{ width: "34p", height: "24p", borderRadius: "3px" }}
          className=" hover:bg-neutral-100 p-1"
        >
          <img src={IconLeftArrow} alt="back" />
        </div>
      </div>

      <div className="mt-6 px-3.5">
        <div>
          <Divider orientation="left">Hari Ini</Divider>
          <div className=" mt-3">
            <NotificationCollapse />
            <NotificationCollapse />
            <NotificationCollapse />
          </div>
        </div>
        <div>
          <Divider orientation="left">Kemarin</Divider>
          <div className=" mt-3">
            <NotificationCollapse />
            <NotificationCollapse />
            <NotificationCollapse />
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotificationView;
