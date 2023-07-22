import React from "react";
import { IPost } from "@/Contracts/Response/IPostsResponse";

type Props = {
  data: IPost;
  onClick: () => void;
};

const CardImage: React.FC<Props> = ({ data, onClick }) => {
  return (
    <div className="relative basis-1/3 cursor-pointer " onClick={onClick}>
      <div className="ease-in-out duration-300 absolute overlay opacity-0 hover:opacity-40 bg-black w-full h-full"></div>
      <img
        style={{ width: "100%", height: "100%" }}
        src={data.image_url || "https://picsum.photos/400"}
        alt={`post-${data.id}`}
        className="object-cover"
      />
    </div>
  );
};

export default CardImage;
