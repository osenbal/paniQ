import React from "react";
import Camera from "@/Presentation/Components/Camera/Camera";
import ButtonCamera from "@/Presentation/Components/Button/ButtonCamera";
import useViewModelCamera from "./PageCameraViewModel";

import "./PageCamera.modules.css";

const PageCamera: React.FC = () => {
  const { captureImage, setCaptureImage, webcamRef, capture } =
    useViewModelCamera();

  return (
    <div className="container_camera_page">
      {!captureImage ? (
        <Camera className="camera" webcamRef={webcamRef} />
      ) : null}
      {captureImage ? (
        <img
          className="captured_image"
          src={captureImage}
          alt="captured image"
        />
      ) : null}
      <ButtonCamera
        className="btn_capture_image"
        rest={{ shape: "circle", type: "primary" }}
        onClick={capture}
      />
    </div>
  );
};

export default PageCamera;
