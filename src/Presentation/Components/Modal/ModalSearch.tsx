import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Drawer } from "antd";
import type { DrawerProps } from "antd/es/drawer";
import InputForm from "../Form/InputForm";
import BlockViewPosts from "../Posts/BlockViewPosts";
import { useAppDispatch, useAppSelector } from "@/Domain/Store/hooks";
import { setSearchText, setSearchResult } from "@/Domain/Reducer/postSlice";
// import { myPosts } from "@/Data/DataSource/Dummy/Posts";
import "./ModalSearch.modules.css";

export type RefHandlerModalSearch = {
  openDrawerSearch: () => void;
  closeDrawerSearch: () => void;
};

type Props = {
  position: DrawerProps["placement"];
  handleSearch: () => void;
};

const ModalSearch = forwardRef<RefHandlerModalSearch, Props>(
  ({ position: placement, handleSearch }: Props, ref) => {
    const [modalSearchOpen, setModalSearchOpen] =
      React.useState<boolean>(false);

    // useImperativeHandle to expose a ref to parent component
    useImperativeHandle(ref, () => ({
      openDrawerSearch: (): void => {
        setModalSearchOpen(true);
      },
      closeDrawerSearch: (): void => {
        setModalSearchOpen(false);
      },
    }));

    const searchRef = useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch();
    const { searchText, searchResult, isLoadingSearch } = useAppSelector(
      (state) => state.post
    );

    const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearchText(e.target.value));
    };

    // search when press enter
    const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch();
      }
    };

    useEffect(() => {
      // focus input when modal open
      if (modalSearchOpen) {
        setTimeout(() => {
          searchRef.current?.focus();
        }, 100);
      }

      // clear search result when modal close
      if (!modalSearchOpen) {
        dispatch(setSearchResult([]));
        dispatch(setSearchText(""));
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalSearchOpen]);

    return (
      <>
        <Drawer
          className="modal-search"
          placement={placement}
          style={{ maxWidth: "768px", margin: "0 auto" }}
          height={window.innerHeight}
          onClose={() => setModalSearchOpen(false)}
          open={modalSearchOpen}
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
            <BlockViewPosts posts={searchResult} />
          ) : null}
        </Drawer>
      </>
    );
  }
);

export default ModalSearch;
