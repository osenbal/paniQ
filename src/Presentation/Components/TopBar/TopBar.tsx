import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import IconChat from "@/Assets/Icons/icon_chat.svg";
import InputForm from "../Form/InputForm";
// import ModalSearch from "../Modal/ModalSearch";

import IconNotification from "@/Assets/Icons/icon_notification.svg";
import IconSearch from "../Icons/Search";

import "./TopBar.modules.css";

type Props = {
  openModalSearch: () => void;
};

const TopBar: React.FC<Props> = ({ openModalSearch }) => {
  const navigate = useNavigate();

  return (
    <>
      <header className="dashboard_header">
        <div className="flex flex-row justify-between items-center h-full">
          <Button
            id="my-forth-step"
            onClick={() => navigate("/notification")}
            block
            style={{ border: "none" }}
            shape="default"
            size="large"
            className="flex flex-row justify-center items-center"
            icon={
              <img
                className="topBar_icon"
                style={{ cursor: "pointer" }}
                src={IconNotification}
                alt="notification"
              />
            }
          />

          <div id="my-fifth-step">
            <InputForm
              className="topBar_search_input"
              style={{ marginTop: 0 }}
              label=""
              value={""}
              placeholder="search..."
              icon={<IconSearch alt="search" />}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              onChange={() => {}}
              onFocus={(e) => {
                openModalSearch();
                e.currentTarget.blur();
              }}
            />
          </div>

          <div id="my-sixth-step">
            <img
              className="topBar_icon"
              style={{ cursor: "pointer" }}
              src={IconChat}
              alt="chat"
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default TopBar;
