import React from "react";
import Camera from "@/Presentation/Components/Camera/Camera";
import ButtonCamera from "@/Presentation/Components/Button/ButtonCamera";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import useViewModelCamera from "./PageCameraViewModel";

import "./PageCamera.modules.css";

const PageCamera: React.FC = () => {
  const {
    captureImage,
    webcamRef,
    capture,
    setCaptureImage,
    activeDeviceId,
    // setActiveDeviceId,
    // devices,
    facingMode,
    setFacingMode,
  } = useViewModelCamera();

  const [uploadImage, setUploadImage] = React.useState<any>(null);
  // const [loading, setLoading] = React.useState(false);

  const onCancleCapture = (): void => {
    setCaptureImage("");
    setUploadImage(null);
  };

  const onCheckCapture = (): void => {
    // redirect to create post page
  };

  const onFlipCamera = (): void => {
    if (webcamRef.current) {
      if (facingMode === "user") {
        setFacingMode("environment");
      } else {
        setFacingMode("user");
      }
    }
  };

  const uploadButton = (
    <div className="flex flex-col justify-center align-center items-center">
      <PlusOutlined />
      <div>Upload</div>
    </div>
  );

  return (
    <div className="container_camera_page">
      <div style={{ height: "20%", width: "100%" }}></div>
      {!captureImage && !uploadImage ? (
        <>
          <div className="container_camera">
            <Camera
              facingMode={facingMode}
              activeDeviceId={activeDeviceId}
              className="camera"
              webcamRef={webcamRef}
            />
          </div>
          <div className="container_control_camera flex flex-row justify-around align-center items-center w-full">
            <label
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "50%",
                width: "58px",
                height: "58px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              htmlFor="uploadImage"
            >
              <input
                id="uploadImage"
                onChange={(e) => {
                  if (e.target.files) {
                    setUploadImage(e.target.files[0]);
                  }
                }}
                type="file"
                style={{ display: "none" }}
              />
              {uploadButton}
            </label>

            <ButtonCamera
              className="btn_capture_image"
              rest={{ shape: "circle", type: "primary" }}
              onClick={capture}
            />

            <div>
              <Button
                className="btn_capture_image"
                type="primary"
                shape="circle"
                size="large"
                style={{ width: "58px", height: "58px" }}
                onClick={onFlipCamera}
              >
                flip
              </Button>

              {/* <select
                onChange={(event) => {
                  setActiveDeviceId(event.target.value);
                }}
              >
                {devices.map((d) => (
                  <option key={d.deviceId} value={d.deviceId}>
                    {d.label}
                  </option>
                ))}
              </select> */}
            </div>
          </div>
        </>
      ) : null}

      {captureImage || uploadImage ? (
        <>
          <div className="container_camera">
            {captureImage ? (
              <img src={captureImage} alt="result captured" />
            ) : null}
            {uploadImage ? (
              <img src={URL.createObjectURL(uploadImage)} alt="uploaded" />
            ) : null}
          </div>
          <div className="container_control_camera flex flex-row justify-around align-center items-center w-full">
            <Button
              className="btn_capture_image"
              type="primary"
              shape="circle"
              size="large"
              onClick={onCancleCapture}
            >
              Button Cancel
            </Button>
            <Button
              className="btn_capture_image"
              type="primary"
              shape="circle"
              size="large"
              onClick={onCheckCapture}
            >
              Button Check
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default PageCamera;
