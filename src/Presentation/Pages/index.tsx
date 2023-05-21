import React from "react";
import NotificationRequest from "@/Presentation/Components/RequestPermissions/NotificationRequest";
import CardPost from "@/Presentation/Components/CardPost/CardPost";

import post from "@/Data/DataSource/Dummy/Posts";

const Index: React.FC = () => {
  return (
    <>
      <NotificationRequest />
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
    </>
  );
};

export default Index;
