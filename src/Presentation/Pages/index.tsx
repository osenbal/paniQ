import React from "react";
import NotificationRequest from "@/Presentation/Components/RequestPermissions/NotificationRequest";
import CardPost from "@/Presentation/Components/CardPost/CardPost";
import post from "@/Data/DataSource/Dummy/Posts";
import SkeletonCardPost from "../Components/CardPost/SkeletonCardPost";
import useViewModel from "./indexViewModel";

const Index: React.FC = () => {
  const { isLoading } = useViewModel();

  return (
    <>
      <NotificationRequest />

      {isLoading ? (
        <div style={{ paddingBottom: "100px" }}>
          <SkeletonCardPost />
          <SkeletonCardPost />
        </div>
      ) : (
        <div className="page">
          <div style={{ marginTop: "8px", paddingBottom: "100px" }}>
            {post.map((item, index) => (
              <CardPost
                key={index}
                userName={item.userName}
                userMajor={item.userMajor}
                userImage={item.userProfilePicture}
                postImage={item.post.image}
                postTitle={item.post.title}
                postDescription={item.post.description}
                postDate={item.post.createdAt}
                characteristics={item.post.characteristics}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
