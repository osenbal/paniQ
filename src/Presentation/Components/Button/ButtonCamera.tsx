import React from "react";
import IconCaptureCamera from "@/Assets/Icons/icon_captureCamera.svg";
import { Button } from "antd";

type Props = {
  onClick?: () => void;
  className?: string;
  rest?: any;
};

const ButtonCamera: React.FC<Props> = ({ onClick, className, rest }) => {
  return (
    <>
      <Button
        onClick={onClick}
        className={className}
        type="primary"
        // size="large"
        style={{ width: "64px", height: "64px" }}
        icon={
          <img
            style={{ width: "32px" }}
            src={IconCaptureCamera}
            alt="capture camera"
          />
        }
        {...rest}
      />
    </>
  );
};

export default ButtonCamera;
