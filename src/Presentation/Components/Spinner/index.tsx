import React from "react";
import { Space, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

// type props
type Props = {
  size?: "small" | "default" | "large";
  height?: string;
  isOutlined?: boolean;
};

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Spinner: React.FC<Props> = ({
  size = "default",
  height = "100vh",
  isOutlined = false,
}: Props) => (
  <div
    className="w-full flex flex-col justify-center items-center"
    style={{ height: height }}
  >
    <Space size="middle" align="center" direction="vertical">
      <Spin size={size} indicator={isOutlined ? antIcon : undefined} />
    </Space>
  </div>
);

export default Spinner;
