import React from "react";
import { IPost } from "@/Contracts/Response/IPostsResponse";

type Props = {
  // props here
  posts: IPost[];
  onClickDetail: (id: string | number) => void;
};

const BlockViewPosts: React.FC<Props> = ({ posts, onClickDetail }) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-0.5 ">
        {posts.map((item: IPost, index: number) => {
          return (
            <div
              key={item.id}
              className="relative basis-1/3 cursor-pointer "
              onClick={() => onClickDetail(item.id)}
            >
              <div className="ease-in-out duration-300 absolute overlay opacity-0 hover:opacity-40 bg-black w-full h-full"></div>
              <img
                style={{ width: "100%", height: "100%" }}
                src={item.image_url || "https://picsum.photos/400"}
                alt={`Post ${index}`}
                className="object-cover"
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BlockViewPosts;
