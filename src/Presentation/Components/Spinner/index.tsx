import React from "react";
import { Space, Spin } from "antd";

// type props
type Props = {
  size?: "small" | "default" | "large";
};

const Spinner: React.FC<Props> = ({ size = "default" }: Props) => (
  <Space size="middle">
    <Spin size={size} />
  </Space>
);

export default Spinner;
