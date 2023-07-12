import React, { useRef, useEffect } from "react";
import { Drawer } from "antd";
import type { DrawerProps } from "antd/es/drawer";
import InputForm from "../Form/InputForm";
import BlockViewPosts from "../Posts/BlockViewPosts";
import { useAppDispatch, useAppSelector } from "@/Domain/Store/hooks";
import { setSearchText, setSearchResult } from "@/Domain/Reducer/postSlice";

// import { myPosts } from "@/Data/DataSource/Dummy/Posts";

import "./ModalSearch.modules.css";

type Props = {
  onClose: () => void;
  open: boolean;
  position: DrawerProps["placement"];
  handleSearch: () => void;
};

const ModalSearch: React.FC<Props> = ({
  onClose,
  open,
  position: placement,
  handleSearch,
}) => {
  const searchRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const { searchText, searchResult, isLoadingSearch } = useAppSelector(
    (state) => state.post
  );

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchText(e.target.value));
  };

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        searchRef.current?.focus();
      }, 100);
    }

    if (open === false) {
      dispatch(setSearchResult([]));
      dispatch(setSearchText(""));
    }

    return () => {
      dispatch(setSearchResult([]));
      dispatch(setSearchText(""));
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
            value={searchText}
            placeholder="search..."
            onChange={handleSearchTextChange}
            onKeyDown={onEnter}
          />
        }
      >
        {isLoadingSearch ? (
          <>
            <p>Loading...</p>
          </>
        ) : searchResult.length > 0 ? (
          <BlockViewPosts posts={searchResult} onClickDetail={() => null} />
        ) : null}
      </Drawer>
    </>
  );
};

export default ModalSearch;
