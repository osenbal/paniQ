import { useRef, useState } from "react";
import { useAppSelector } from "@/Domain/Store/hooks";
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

  // const dispatch = useAppDispatch();

  const userState = useAppSelector((state) => state.auth.user);

  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    if (value === "") return setSearchResult([]);
    console.log("seacrh val : ", value);
  };

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
        // console.log(response);
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
    modalProfileRef,
    search,
    setSearch,
    searchResult,
    setSearchResult,
    handleSearch,
    searchLoading,
    setSearchLoading,
    modalLogOutConfirmationRef,
    drawerQrScannerRef,
    onLogOut,
    userState,
    onValidatePost,
  };
}
