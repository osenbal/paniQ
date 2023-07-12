import { useEffect, useState, useRef } from "react";
import { RefHandlerModalQrcode } from "@/Presentation/Components/Modal/ModalQrcode";
import { useAppSelector, useAppDispatch } from "@/Domain/Store/hooks";
import {
  asyncGetAllPost,
  requestValidatePost,
} from "@/Domain/Reducer/postSlice";
// import posts from "@/Data/DataSource/Dummy/Posts";

const IndexViewModel = () => {
  //  redux
  const { user } = useAppSelector((state) => state.auth);
  const { posts } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  //  ref
  const modalQrcode = useRef() as React.MutableRefObject<RefHandlerModalQrcode>;

  // local state
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pagePost, setPagePost] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  // dummy data post
  // const postDummy: IGETListPostResponse = posts;

  // lifecycle
  useEffect(() => {
    getAllPosts();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagePost]);

  //  methods
  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollBottom = documentHeight - (scrollTop + windowHeight);

    if (scrollBottom < 20 && isLoadingMore === false) {
      setPagePost((prev) => prev + 1);
    }
  };

  const getAllPosts = () => {
    if (pagePost > 1) {
      setIsLoadingMore(true);
    }

    dispatch(asyncGetAllPost(pagePost)).finally(() => {
      setIsLoading(false);

      setTimeout(() => {
        setIsLoadingMore(false);
      }, 1000);
    });
  };

  const handleOpenModalQrcode = async (post_id: string) => {
    try {
      // unwrap() is a utility function that extracts the value of a fulfilled promise.
      dispatch(requestValidatePost(post_id))
        .unwrap()
        .then((response) => {
          // show modal qrcode
          modalQrcode.current.openModalQrcode(response.qr_code_url);
        });
    } catch (error) {
      console.log("error : ", error);
    }
  };

  return {
    isLoading,
    setIsLoading,
    modalQrcode,
    posts,
    isLoadingMore,
    user,
    handleOpenModalQrcode,
  };
};

export default IndexViewModel;
