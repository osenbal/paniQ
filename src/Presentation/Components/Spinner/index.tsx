import React from "react";
import { Space, Spin } from "antd";

// type props
type Props = {
  size?: "small" | "default" | "large";
};

const Spinner: React.FC<Props> = ({ size = "default" }: Props) => (
  <div
    className="w-full flex flex-col justify-center items-center"
    style={{ height: "100vh" }}
  >
    <Space size="middle" align="center" direction="vertical">
      <Spin size={size} />
    </Space>
  </div>
);

export default Spinner;
