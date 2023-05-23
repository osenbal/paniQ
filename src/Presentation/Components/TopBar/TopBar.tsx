import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import IconChat from "@/Assets/Icons/icon_chat.svg";
import InputForm from "../Form/InputForm";

import IconNotification from "@/Assets/Icons/icon_notification.svg";
import IconSearch from "../Icons/Search";

import "./TopBar.modules.css";

type Props = {
  search: string;
  setSearch: (value: string) => void;
  onEnter?: () => void;
};

const TopBar: React.FC<Props> = ({ search, setSearch }) => {
  const navigate = useNavigate();

  return (
    <header className="dashboard_header">
      <div className="flex flex-row justify-between items-center h-full">
        <Button
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

        <InputForm
          className="topBar_search_input"
          style={{ marginTop: 0 }}
          label=""
          value={search}
          placeholder="search..."
          icon={<IconSearch alt="search" />}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div>
          <img
            className="topBar_icon"
            style={{ cursor: "pointer" }}
            src={IconChat}
            alt="chat"
          />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
