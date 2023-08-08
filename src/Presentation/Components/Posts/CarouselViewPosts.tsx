import React from "react";
import { IPost } from "@/Contracts/Response/IPostsResponse";
import { useRefModalContext } from "@/Domain/Context/RefModal.context";

import { basicColors } from "@/Core/config/colors/colors";
import { paragraph_medium } from "@/Core/config/fonts/fonts";

import "./CarouselViewPosts.modules.css";

type PropsItem = {
  post: IPost;
  onClick?: () => void;
};

type Props = {
  posts: IPost[];
};

const CarouselItem: React.FC<PropsItem> = ({ post, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="item_carousel flex flex-col justify-center items-center px-11 pt-9"
      style={{
        width: "235px",
        backgroundColor: basicColors.gray,
        borderRadius: "10px",
      }}
    >
      <div className="mb-3">
        <img
          style={{
            maxWidth: "150px",
            height: "150px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
          src={post?.image_url || "https://picsum.photos/400"}
          alt="post"
        />
      </div>

      <p style={{ ...paragraph_medium }}>
        <span className="font-bold">{post.user?.username}</span> telah menemukan{" "}
        <span>{post.title}</span>, ditemukan di{" "}
        <span className="font-bold">{post.place}</span>
      </p>

      <br />
      <p style={{ ...paragraph_medium }}>
        Bagi yang kehilangan silahkan berkomentar pada menu diskusi.
      </p>
    </div>
  );
};

const CarouselViewPosts: React.FC<Props> = ({ posts }) => {
  const { state: modalContextState } = useRefModalContext();

  const handleOpenDetailPost = (post_id: number | string) => {
    modalContextState.modalPostDetailRef?.current?.openDrawerPostDetail(
      post_id
    );
  };
  return (
    <div className="container_carousel cursor-pointer">
      {posts.map((post, index) => (
        <CarouselItem
          key={index}
          post={post}
          onClick={() => handleOpenDetailPost(post.id)}
        />
      ))}
    </div>
  );
};

export default CarouselViewPosts;
