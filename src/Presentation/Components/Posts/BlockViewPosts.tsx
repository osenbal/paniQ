import React from "react";
import CardImage from "@/Presentation/Components/CardPost/CardImage";
import { IPost } from "@/Contracts/Response/IPostsResponse";
import { useRefModalContext } from "@/Domain/Context/RefModal.context";

type Props = {
  posts: IPost[];
};

const BlockViewPosts: React.FC<Props> = ({ posts }) => {
  const { state: modalContextState } = useRefModalContext();

  const handleOpenDetailPost = (post_id: number | string) => {
    modalContextState.modalPostDetailRef?.current?.openDrawerPostDetail(
      post_id
    );
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-0.5 ">
        {posts.map((item, index) => {
          return (
            <CardImage
              key={index}
              data={item}
              onClick={() => handleOpenDetailPost(item.id)}
            />
          );
        })}
      </div>
    </>
  );
};

export default BlockViewPosts;
