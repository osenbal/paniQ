import { useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/Domain/Store/hooks";
import { RefHandlerModalProfile } from "@/Presentation/Components/Modal/ModalProfile";
import { RefHandlerModalConfirmation } from "@/Presentation/Components/Modal/ModalConfirmation";
import { RefHandlerDrawerQrScanner } from "@/Presentation/Components/ScanQR/ScanQR";
import { RefHandlerModalSearch } from "../Components/Modal/ModalSearch";
import { RefHandlerPostDetail } from "../Components/Modal/ModalPostDetail";
import {
  deleteAccessToken,
  deleteIsAuth,
  deleteRefreshToken,
} from "@/Data/DataSource/Cookie/JWT.cookie";
import PostUseCaseImpl from "@/Domain/UseCase/Posts/PostUseCaseImpl";
import { IValidatePostRequest } from "@/Contracts/Requests/IPostRequest";
import { toast } from "react-toastify";
import {
  asyncSearchPost,
  setSearchResult,
  getDetailPost,
} from "@/Domain/Reducer/postSlice";
import { IPost } from "@/Contracts/Response/IPostsResponse";

export default function DashboardLayoutViewModel() {
  const postUseCase = PostUseCaseImpl.getInstance();

  // ref for modal
  const modalProfileRef =
    useRef() as React.MutableRefObject<RefHandlerModalProfile>;
  const modalLogOutConfirmationRef =
    useRef() as React.MutableRefObject<RefHandlerModalConfirmation>;
  const drawerQrScannerRef =
    useRef() as React.MutableRefObject<RefHandlerDrawerQrScanner>;
  const modalSearchRef =
    useRef() as React.MutableRefObject<RefHandlerModalSearch>;
  const modalPostDetailRef =
    useRef() as React.MutableRefObject<RefHandlerPostDetail>;

  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.auth.user);
  const { searchText } = useAppSelector((state) => state.post);

  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if (searchText === "" || searchText.length === 0)
      return dispatch(setSearchResult([]));
    dispatch(asyncSearchPost({ searchText, limit: 5 }));
  };

  const handleOpenModalSearch = () => {
    modalSearchRef.current.openDrawerSearch();
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
    await postUseCase
      .validatePost(data)
      .then((response) => {
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

  const handleOpenModalPostDetail = (id: number | string) => {
    dispatch(getDetailPost(id)).then((response) => {
      if (response.payload === null) {
        toast.error("Something went wrong");
      } else {
        modalPostDetailRef.current.openDrawerPostDetail(
          response.payload as IPost
        );
      }
    });
  };

  return {
    modalProfileRef,
    handleSearch,
    searchLoading,
    setSearchLoading,
    modalLogOutConfirmationRef,
    modalSearchRef,
    modalPostDetailRef,
    drawerQrScannerRef,
    onLogOut,
    userState,
    onValidatePost,
    handleOpenModalSearch,
    handleOpenModalPostDetail,
  };
}
