import React from "react";
import NotificationRequest from "@/Presentation/Components/RequestPermissions/NotificationRequest";
import CardPost from "@/Presentation/Components/CardPost/CardPost";
import SkeletonCardPost from "../Components/CardPost/SkeletonCardPost";
import useViewModel from "./indexViewModel";
import { Helmet } from "react-helmet-async";
import { useRefModalContext } from "@/Domain/Context/RefModal.context";

const Index: React.FC = () => {
  const { isLoading, posts, isLoadingMore, user } = useViewModel();
  const { state } = useRefModalContext();

  const handleOpenComment = () => {
    state.modalDisqusRef?.current?.openDrawerDisqus();
  };

  return (
    <>
      <Helmet>
        <title>Home | Paniq</title>
      </Helmet>
      <NotificationRequest />

      {isLoading ? (
        <div style={{ paddingBottom: "100px" }}>
          <SkeletonCardPost />
          <SkeletonCardPost />
        </div>
      ) : (
        <div className="page">
          <div style={{ marginTop: "8px", paddingBottom: "100px" }}>
            {posts?.length !== 0
              ? posts.map((item, index) => (
                  <CardPost
                    key={index}
                    id={item.id}
                    isMyPost={user?.id === item.user_id}
                    indexZero={index === 0}
                    userName={item.user.username}
                    userMajor={item.user.usermajor}
                    userImage={"https://picsum.photos/200"}
                    postImage={item.image_url || "https://picsum.photos/200"}
                    postTitle={item.title}
                    postDescription={item.place}
                    postDate={item.created_at}
                    characteristics={item.characteristics}
                    openComent={() => handleOpenComment()}
                  />
                ))
              : null}

            {isLoadingMore ? (
              <div className="flex justify-center mt-5">
                <div className="lds-dual-ring">Loading...</div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
