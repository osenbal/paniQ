import React from "react";
import NotificationRequest from "@/Presentation/Components/RequestPermissions/NotificationRequest";
import CardPost from "@/Presentation/Components/CardPost/CardPost";
import SkeletonCardPost from "../Components/CardPost/SkeletonCardPost";
import useViewModel from "./indexViewModel";
import ModalQrcode from "../Components/Modal/ModalQrcode";
import { Helmet } from "react-helmet-async";

const Index: React.FC = () => {
  const {
    isLoading,
    modalQrcode,
    posts,
    isLoadingMore,
    user,
    handleOpenModalQrcode,
  } = useViewModel();
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
                    user_id={item.user_id}
                    indexZero={index === 0}
                    userName={item.user.username}
                    userMajor={item.user.usermajor}
                    userImage={"https://picsum.photos/200"}
                    postImage={item.image_url || "https://picsum.photos/200"}
                    postTitle={item.title}
                    postDescription={item.place}
                    postDate={item.created_at}
                    characteristics={item.characteristics}
                    openQrCode={() => handleOpenModalQrcode(item.id)}
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

      <ModalQrcode ref={modalQrcode} />
    </>
  );
};

export default Index;
