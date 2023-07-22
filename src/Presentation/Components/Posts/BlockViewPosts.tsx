import React from "react";
import CardImage from "@/Presentation/Components/CardPost/CardImage";
import { IPost } from "@/Contracts/Response/IPostsResponse";

type Props = {
  posts: IPost[];
  onClickDetail: (id: string | number) => void;
};

const BlockViewPosts: React.FC<Props> = ({ posts, onClickDetail }) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-0.5 ">
        {posts.map((item, index) => {
          return (
            <CardImage
              key={index}
              data={item}
              onClick={() => onClickDetail(item.id)}
            />
          );
        })}
      </div>
    </>
  );
};

export default BlockViewPosts;
