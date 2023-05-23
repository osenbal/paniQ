import React from "react";

import { basicColors } from "@/Core/config/colors/colors";
import { paragraph_medium } from "@/Core/config/fonts/fonts";

import "./CarouselViewPosts.modules.css";

type PropsItem = {
  post: any;
};

type Props = {
  posts: any[];
};

const CarouselItem: React.FC<PropsItem> = ({ post }) => {
  return (
    <div
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
          src={post?.post?.image}
          alt="dummy"
        />
      </div>

      <p style={{ ...paragraph_medium }}>
        <span className="font-bold">{post.userName}</span> telah menemukan{" "}
        <span>{post.post.title}</span>, ditemukan{" "}
        <span className="font-bold">{post.post.description}</span>
      </p>

      <br />
      <p style={{ ...paragraph_medium }}>
        Bagi yang kehilangan silahkan berkomentar pada menu diskusi.
      </p>
    </div>
  );
};

const CarouselViewPosts: React.FC<Props> = ({ posts }) => {
  return (
    <div className="container_carousel">
      {posts.map((post, index) => (
        <CarouselItem key={index} post={post} />
      ))}
    </div>
  );
};

export default CarouselViewPosts;
