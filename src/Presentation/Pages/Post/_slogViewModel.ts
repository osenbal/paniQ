import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/Domain/Store/hooks";
import { asyncGetPostByUserId } from "@/Domain/Reducer/postSlice";
import { IPost } from "@/Contracts/Response/IPostsResponse";
// import { myPosts } from "@/Data/DataSource/Dummy/Posts";

const Slug = () => {
  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [views, setViews] = useState<"blocks" | "carousel">("blocks");
  const [pageMyPost, setPageMyPost] = useState<number>(1);
  const [pageMyBookmark, setPageMyBookmark] = useState<number>(1);
  const [pageMyStuffReturn, setPageMyStuffReturn] = useState<number>(1);

  const [myPosts, setMyPosts] = useState<IPost[]>([]);
  const [bookmarks, setBookmarks] = useState<IPost[]>([]);
  const [stuffReturns, setStuffReturns] = useState<IPost[]>([]);

  const [myPostLoading, setMyPostLoading] = useState<boolean>(true);
  const [myBookmarkLoading, setMyBookmarkLoading] = useState<boolean>(true);
  const [myStuffReturnLoading, setMyStuffReturnLoading] =
    useState<boolean>(true);

  const tab = searchParams.get("tab");
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(
    tab === "bookmark"
      ? "bookmark"
      : tab === "my-post"
      ? "my-post"
      : tab === "stuff-return"
      ? "stuff-return"
      : "bookmark"
  );

  const onChange = (key: string) => {
    setActiveTab(key);
  };

  const onBack = () => {
    navigate("/", { replace: true });
  };

  const handleScrollMyPost = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPageMyPost((prev) => prev + 1);
    }
  };

  const handleScrollBookmarks = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPageMyBookmark((prev) => prev + 1);
    }
  };

  const hanleScrollStuffReturn = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPageMyStuffReturn((prev) => prev + 1);
    }
  };

  const getMyPost = () => {
    if (user === null) return;
    setMyPostLoading(true);
    dispatch(
      asyncGetPostByUserId({
        page: pageMyPost,
        user_id: user.id,
      })
    )
      .unwrap()
      .then((res) => {
        if (pageMyPost > 1) {
          setMyPosts((prev) => [...prev, ...res]);
          return;
        } else if (pageMyPost === 1) {
          setMyPosts(res);
        }
      })
      .finally(() => {
        setMyPostLoading(false);
      });
  };

  const getMyBookmark = () => {
    setMyBookmarkLoading(true);
    setBookmarks([]);
    setMyBookmarkLoading(false);
  };

  const getMyStuffReturn = () => {
    setMyStuffReturnLoading(true);
    setStuffReturns([]);
    setMyStuffReturnLoading(false);
  };

  useEffect(() => {
    if (tab === "my-post") {
      getMyPost();
    } else if (tab === "bookmark") {
      getMyBookmark();
    } else if (tab === "stuff-return") {
      getMyStuffReturn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, pageMyBookmark, pageMyPost, pageMyStuffReturn]);

  useEffect(() => {
    if (activeTab === "my-post" && tab !== "my-post") {
      if (myPosts.length === 0) getMyPost();
    } else if (activeTab === "bookmark" && tab !== "bookmark") {
      if (bookmarks.length === 0) getMyBookmark();
    } else if (activeTab === "stuff-return" && tab !== "stuff-return") {
      if (stuffReturns.length === 0) getMyStuffReturn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "my-post") {
      window.addEventListener("scroll", handleScrollMyPost);
    } else if (activeTab === "bookmark") {
      window.addEventListener("scroll", handleScrollBookmarks);
    } else if (activeTab === "stuff-return") {
      window.addEventListener("scroll", hanleScrollStuffReturn);
    }

    return () => {
      window.removeEventListener("scroll", handleScrollMyPost);
      window.removeEventListener("scroll", handleScrollBookmarks);
      window.removeEventListener("scroll", hanleScrollStuffReturn);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    tab,
    activeTab,
    views,
    setActiveTab,
    onChange,
    onBack,
    setViews,
    getMyPost,
    myPosts,
    myPostLoading,
    myBookmarkLoading,
    myStuffReturnLoading,
  };
};

export default Slug;
