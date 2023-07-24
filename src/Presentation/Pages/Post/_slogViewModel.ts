import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
// import { myPosts } from "@/Data/DataSource/Dummy/Posts";
import { useAppDispatch, useAppSelector } from "@/Domain/Store/hooks";

// get my post belum tau endpointnya jadi pake get all dulu
import { asyncGetAllPost } from "@/Domain/Reducer/postSlice";

const Slug = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.post);

  const [views, setViews] = useState<"blocks" | "carousel">("blocks");
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

  const onClickDetail = (id: string | number) => {
    console.log("id", id);
    // navigate(`/post/${id}`);
  };

  const getMyPost = () => {
    dispatch(asyncGetAllPost(1));
  };

  const getMyBookmark = () => {};

  const getMyStuffReturn = () => {};

  useEffect(() => {
    if (activeTab === "my-post") {
      getMyPost();
    } else if (activeTab === "bookmark") {
      getMyBookmark();
    } else if (activeTab === "stuff-return") {
      getMyStuffReturn();
    }
  }, [activeTab]);

  return {
    tab,
    activeTab,
    views,
    setActiveTab,
    onChange,
    onBack,
    setViews,
    onClickDetail,
    getMyPost,
    posts,
  };
};

export default Slug;
