import React, { useRef, useEffect } from "react";
import { Drawer } from "antd";
import type { DrawerProps } from "antd/es/drawer";
import InputForm from "../Form/InputForm";
import BlockViewPosts from "../Posts/BlockViewPosts";
// import { myPosts } from "@/Data/DataSource/Dummy/Posts";

import "./ModalSearch.modules.css";

type Props = {
  onClose: () => void;
  open: boolean;
  position: DrawerProps["placement"];
  search: string;
  setSearch: (value: string) => void;
  setSearchResult: (value: any[]) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchResult: any[];
};

const ModalSearch: React.FC<Props> = ({
  onClose,
  open,
  position: placement,
  search,
  setSearch,
  handleSearch,
  setSearchResult,
  searchResult,
}) => {
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        searchRef.current?.focus();
      }, 100);
    }

    if (open === false) {
      setSearchResult([]);
      setSearch("");
    }

    return () => {
      setSearchResult([]);
      setSearch("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            value={search}
            placeholder="search..."
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearch(e);
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
