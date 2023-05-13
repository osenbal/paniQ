import React from "react";
import IconNotification from "@/Assets/Icons/icon_notification.svg";
import IconChat from "@/Assets/Icons/icon_chat.svg";
import InputForm from "../Form/InputForm";
import IconSearch from "../Icons/Search";

import "./TopBar.modules.css";

type Props = {
  search: string;
  setSearch: (value: string) => void;
  onEnter?: () => void;
};

const TopBar: React.FC<Props> = ({ search, setSearch }) => {
  return (
    <header className="dashboard_header">
      <div className="flex flex-row justify-between items-center h-full">
        <img
          className="topBar_icon"
          style={{ cursor: "pointer" }}
          src={IconNotification}
          alt="notification"
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
        <img
          className="topBar_icon"
          style={{ cursor: "pointer" }}
          src={IconChat}
          alt="chat"
        />
      </div>
    </header>
  );
};

export default TopBar;
