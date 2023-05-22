import { useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/Domain/Store/hooks";
import { selectSearch } from "@/Domain/Reducer/globalSlice";
import { setSearch } from "@/Domain/Reducer/globalSlice";
import { RefHandlerModalProfile } from "../Components/Modal/ModalProfile";
import { RefHandlerModalConfirmation } from "../Components/Modal/ModalConfirmation";

export default function DashboardLayoutViewModel() {
  const modalProfileRef =
    useRef() as React.MutableRefObject<RefHandlerModalProfile>;
  const modalLogOutConfirmationRef =
    useRef() as React.MutableRefObject<RefHandlerModalConfirmation>;

  const search = useAppSelector(selectSearch);
  const dispatch = useAppDispatch();

  const onLogOut = (): void => {
    console.log("Log out");
  };

  return {
    search,
    setSearch: (search: string) => dispatch(setSearch(search)),
    modalProfileRef,
    modalLogOutConfirmationRef,
    onLogOut,
  };
}
