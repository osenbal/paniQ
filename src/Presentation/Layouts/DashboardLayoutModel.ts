import { useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/Domain/Store/hooks";
import { selectSearch } from "@/Domain/Reducer/globalSlice";
import { setSearch } from "@/Domain/Reducer/globalSlice";
import { RefHandlerModalProfile } from "@/Presentation/Components/Modal/ModalProfile";
import { RefHandlerModalConfirmation } from "@/Presentation/Components/Modal/ModalConfirmation";
import { RefHandlerDrawerQrScanner } from "@/Presentation/Components/ScanQR/ScanQR";
import {
  deleteAccessToken,
  deleteIsAuth,
  deleteRefreshToken,
} from "@/Data/DataSource/Cookie/JWT.cookie";

export default function DashboardLayoutViewModel() {
  const modalProfileRef =
    useRef() as React.MutableRefObject<RefHandlerModalProfile>;
  const modalLogOutConfirmationRef =
    useRef() as React.MutableRefObject<RefHandlerModalConfirmation>;
  const drawerQrScannerRef =
    useRef() as React.MutableRefObject<RefHandlerDrawerQrScanner>;

  const search = useAppSelector(selectSearch);
  const userState = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();

  const onLogOut = (): void => {
    deleteAccessToken();
    deleteRefreshToken();
    deleteIsAuth();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return {
    search,
    setSearch: (search: string) => dispatch(setSearch(search)),
    modalProfileRef,
    modalLogOutConfirmationRef,
    drawerQrScannerRef,
    onLogOut,
    userState,
  };
}
