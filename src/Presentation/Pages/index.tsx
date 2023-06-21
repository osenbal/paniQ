import React from "react";
import NotificationRequest from "@/Presentation/Components/RequestPermissions/NotificationRequest";
import CardPost from "@/Presentation/Components/CardPost/CardPost";
import post from "@/Data/DataSource/Dummy/Posts";
import SkeletonCardPost from "../Components/CardPost/SkeletonCardPost";
import useViewModel from "./indexViewModel";
import ModalQrcode from "../Components/Modal/ModalQrcode";
import { Helmet } from "react-helmet-async";

const Index: React.FC = () => {
  const { isLoading, modalQrcode } = useViewModel();

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
            {post.map((item, index) => (
              <CardPost
                indexZero={index === 0}
                key={index}
                userName={item.userName}
                userMajor={item.userMajor}
                userImage={item.userProfilePicture}
                postImage={item.post.image}
                postTitle={item.post.title}
                postDescription={item.post.description}
                postDate={item.post.createdAt}
                characteristics={item.post.characteristics}
                openQrCode={() =>
                  modalQrcode.current.openModalQrcode(item.id, item.post.qrCode)
                }
              />
            ))}
          </div>
        </div>
      )}

      <ModalQrcode ref={modalQrcode} />
    </>
  );
};

export default Index;
