import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { myPosts } from "@/Data/DataSource/Dummy/Posts";

const Slug = () => {
  const [searchParams] = useSearchParams();
  const [views, setViews] = useState<"blocks" | "carousel">("blocks");
  const tab = searchParams.get("tab");
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(
    tab === "bookmark"
      ? "bookmark"
      : tab === "my-post"
      ? "my-post"
      : tab === "staff-return"
      ? "staff-return"
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

  const getPosts = () => {
    console.log("activeTab", activeTab);
    console.log("myPosts", myPosts);
    return myPosts;
  };

  return {
    tab,
    activeTab,
    views,
    setActiveTab,
    onChange,
    onBack,
    setViews,
    onClickDetail,
    getPosts,
  };
};

export default Slug;
