import React, { useState, useRef, useEffect } from "react";
import { Drawer } from "antd";
import type { DrawerProps } from "antd/es/drawer";
import InputForm from "../Form/InputForm";
import BlockViewPosts from "../Posts/BlockViewPosts";
import { myPosts } from "@/Data/DataSource/Dummy/Posts";

import "./ModalSearch.modules.css";

type Props = {
  onClose: () => void;
  open: boolean;
  position: DrawerProps["placement"];
};

const ModalSearch: React.FC<Props> = ({
  onClose,
  open,
  position: placement,
}) => {
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    const result = myPosts;
    setSearchResult(result);
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        searchRef.current?.focus();
      }, 100);
    }

    if (open === false) {
      setSearchResult([]);
      setSearchText("");
    }
  }, [open]);

  return (
    <>
      <Drawer
        className="modal-search"
        placement={placement}
        style={{ maxWidth: "768px", margin: "0 auto" }}
        height={window.innerHeight}
        onClose={onClose}
        open={open}
        extra={
          <InputForm
            autoFocus={true}
            refInput={searchRef}
            style={{ marginTop: 0, width: "100%" }}
            label=""
            value={searchText}
            placeholder="search..."
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearch();
              }
            }}
          />
        }
      >
        {searchResult.length > 0 ? (
          <BlockViewPosts posts={searchResult} onClickDetail={() => null} />
        ) : null}
      </Drawer>
    </>
  );
};

export default ModalSearch;
