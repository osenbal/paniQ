import React from "react";

type Props = {
  // props here
  posts: any;
  onClickDetail: (id: string | number) => void;
};

const BlockViewPosts: React.FC<Props> = ({ posts, onClickDetail }) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-0.5 ">
        {posts.map((item: any) => {
          return (
            <div
              key={item.id}
              className="relative basis-1/3 cursor-pointer"
              onClick={() => onClickDetail(item.id)}
            >
              <img
                style={{ width: "100%", height: "100%" }}
                src={item?.post?.image}
                alt="post item"
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
