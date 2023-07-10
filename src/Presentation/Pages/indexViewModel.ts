import { useEffect, useState, useRef } from "react";
import { RefHandlerModalQrcode } from "@/Presentation/Components/Modal/ModalQrcode";
import PostUseCaseImpl from "@/Domain/UseCase/Posts/PostUseCaseImpl";
import { IPost } from "@/Contracts/Response/IPostsResponse";
import { useAppSelector } from "@/Domain/Store/hooks";
// import { IGETRequestValidatePostResponse } from "@/Contracts/Response/IPostsResponse";

// import posts from "@/Data/DataSource/Dummy/Posts";

const IndexViewModel = () => {
  const postUseCase = PostUseCaseImpl.getInstance();

  //  redux
  const { user } = useAppSelector((state) => state.auth);

  //  ref
  const modalQrcode = useRef() as React.MutableRefObject<RefHandlerModalQrcode>;

  // local state
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [listPost, setListPost] = useState<IPost[]>([]);
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

  const getAllPosts = async () => {
    if (pagePost > 1) {
      setIsLoadingMore(true);
    }
    await postUseCase
      .getPosts(pagePost)
      .then((response) => {
        if (response.data.length > 0) {
          setListPost((prev) => [...prev, ...response.data]);
        }
      })
      .catch((error) => {
        console.log("error : ", error);
      })
      .finally(() => {
        setIsLoading(false);
        setTimeout(() => {
          setIsLoadingMore(false);
        }, 1000);
      });
  };

  const handleOpenModalQrcode = async (post_id: string) => {
    try {
      await postUseCase.requestValidatePost(post_id).then((response) => {
        if (response.status_code === 200) {
          modalQrcode.current.openModalQrcode(response.data.qr_code_url);
        }
      });
    } catch (error) {
      console.log("error : ", error);
    }
  };

  return {
    isLoading,
    setIsLoading,
    modalQrcode,
    listPost,
    isLoadingMore,
    user,
    handleOpenModalQrcode,
  };
};

export default IndexViewModel;
