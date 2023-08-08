import { useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/Domain/Store/hooks';
import { RefHandlerDrawerQrScanner } from '../Components/ScanQR/ScanQR';
import {
  RefHandlerModalSearch,
  RefHandlerModalConfirmation,
  RefHandlerModalProfile,
} from '../Components/Modal';
import {
  deleteAccessToken,
  deleteIsAuth,
  deleteRefreshToken,
} from '@/Data/DataSource/Cookie/JWT.cookie';
import PostUseCaseImpl from '@/Domain/UseCase/Posts/PostUseCaseImpl';
import { IValidatePostRequest } from '@/Contracts/Requests/IPostRequest';
import { toast } from 'react-toastify';
import { asyncSearchPost, setSearchResult } from '@/Domain/Reducer/postSlice';
import NotificationLocalStorage from '@/Data/DataSource/LocalStorage/NotificationLocalStorage';
import { asyncUnsubscribeFromTopic } from '@/Domain/Reducer/notificationSlice';

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

  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.auth.user);
  const { searchText } = useAppSelector((state) => state.post);

  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if (searchText === '' || searchText.length === 0)
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

    const fcmTokenClient = NotificationLocalStorage.getFcmClientToken();
    if (fcmTokenClient) {
      dispatch(asyncUnsubscribeFromTopic(fcmTokenClient));
    }

    NotificationLocalStorage.removeFcmClientToken();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const onValidatePost = async (data: IValidatePostRequest): Promise<void> => {
    await postUseCase
      .validatePost(data)
      .then((response) => {
        toast.success(response?.message || 'Success return data', {
          position: 'top-center',
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
    handleSearch,
    searchLoading,
    setSearchLoading,
    modalLogOutConfirmationRef,
    modalSearchRef,
    drawerQrScannerRef,
    onLogOut,
    userState,
    onValidatePost,
    handleOpenModalSearch,
  };
}
