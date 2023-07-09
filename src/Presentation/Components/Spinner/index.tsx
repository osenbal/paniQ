import React from "react";
import { Space, Spin } from "antd";

// type props
type Props = {
  size?: "small" | "default" | "large";
  height?: string;
};

const Spinner: React.FC<Props> = ({
  size = "default",
  height = "100vh",
}: Props) => (
  <div
    className="w-full flex flex-col justify-center items-center"
    style={{ height: height }}
  >
    <Space size="middle" align="center" direction="vertical">
      <Spin size={size} />
    </Space>
  </div>
);

export default Spinner;
