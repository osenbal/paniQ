import React from "react";
import { Button, ButtonProps } from "antd";
// import IconCaptureCamera from "@/Assets/Icons/icon_captureCamera.svg";

type Props = {
  onClick?: () => void;
  className?: string;
  shape?: ButtonProps["shape"];
  type?: ButtonProps["type"];
};

const ButtonCamera: React.FC<Props> = ({
  onClick,
  className,
  shape = "circle",
  type = "primary",
}) => {
  return (
    <>
      <Button
        onClick={onClick}
        className={className}
        type={type}
        style={{ width: "78px", height: "78px" }}
        shape={shape}
        // size="large"
        // icon={
        //   <img
        //     style={{ width: "32px" }}
        //     src={IconCaptureCamera}
        //     alt="capture camera"
        //   />
        // }
      />
    </>
  );
};

export default ButtonCamera;
