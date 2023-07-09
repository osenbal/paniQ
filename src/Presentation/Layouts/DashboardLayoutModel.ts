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
import PostUseCaseImpl from "@/Domain/UseCase/Posts/PostUseCaseImpl";
import { IValidatePostRequest } from "@/Contracts/Requests/IPostRequest";
import { toast } from "react-toastify";

export default function DashboardLayoutViewModel() {
  const postUseCase = PostUseCaseImpl.getInstance();

  const modalProfileRef =
    useRef() as React.MutableRefObject<RefHandlerModalProfile>;
  const modalLogOutConfirmationRef =
    useRef() as React.MutableRefObject<RefHandlerModalConfirmation>;

  const drawerQrScannerRef =
    useRef() as React.MutableRefObject<RefHandlerDrawerQrScanner>;

  const dispatch = useAppDispatch();

  const search = useAppSelector(selectSearch);
  const userState = useAppSelector((state) => state.auth.user);

  const onLogOut = (): void => {
    deleteAccessToken();
    deleteRefreshToken();
    deleteIsAuth();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const onValidatePost = async (data: IValidatePostRequest): Promise<void> => {
    // console.log("validate post");
    await postUseCase
      .validatePost(data)
      .then((response) => {
        console.log(response);
        toast.success(response?.message || "Success return data", {
          position: "top-center",
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        drawerQrScannerRef.current.closeDrawerQrScanner();
        drawerQrScannerRef.current.closeModalConfirmation();
      });
  };

  return {
    search,
    setSearch: (search: string) => dispatch(setSearch(search)),
    modalProfileRef,
    modalLogOutConfirmationRef,
    drawerQrScannerRef,
    onLogOut,
    userState,
    onValidatePost,
  };
}
