import React from "react";
import { Skeleton } from "antd";
import "./SkeletonCardPost.modules.css";
const SkeletonCardPost: React.FC = () => {
  return (
    <div className="skeleton_cardPost mb-5 pb-">
      <Skeleton className="px-4" avatar paragraph={{ rows: 1, width: 200 }} />
      <Skeleton.Image
        className="mt-2"
        active
        style={{ width: "100vw", height: "412px" }}
      />
      <Skeleton className="px-4 mt-2" paragraph={{ rows: 2 }} title={false} />
    </div>
  );
};

export default SkeletonCardPost;
