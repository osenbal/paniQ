import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/Domain/Store/hooks';
import { asyncGetAllPost } from '@/Domain/Reducer/postSlice';
// import posts from "@/Data/DataSource/Dummy/Posts";

const IndexViewModel = () => {
  //  redux
  const { user } = useAppSelector((state) => state.auth);
  const { posts } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  // local state
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pagePost, setPagePost] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  // dummy data post
  // const postDummy: IGETListPostResponse = posts;

  useEffect(() => {
    if (hasNextPage) {
      getAllPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagePost]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //  methods
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPagePost((prev) => prev + 1);
    }
  };

  const getAllPosts = () => {
    if (pagePost > 1) {
      setIsLoadingMore(true);
    }

    dispatch(asyncGetAllPost(pagePost))
      .unwrap()
      .then((res) => {
        if (res.length === 0) {
          setHasNextPage(false);
        }
      })
      .finally(() => {
        setIsLoading(false);
        setTimeout(() => {
          setIsLoadingMore(false);
        }, 1000);
      });
  };

  return {
    isLoading,
    setIsLoading,
    posts,
    isLoadingMore,
    user,
  };
};

export default IndexViewModel;
