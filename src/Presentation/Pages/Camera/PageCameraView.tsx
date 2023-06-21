import React from "react";
import Camera from "@/Presentation/Components/Camera/Camera";
import ButtonCamera from "@/Presentation/Components/Button/ButtonCamera";
import { Button } from "antd";
import CropedImageDialog from "@/Presentation/Components/ImgDialog/CropedImageDialog";
import Cropper from "react-easy-crop";
import { Helmet } from "react-helmet-async";

import IconFlipCamera from "@/Assets/Icons/icon_flipCamera.svg";
import IconGallery from "@/Assets/Icons/icon_gallery.svg";
import IconCross from "@/Assets/Icons/icon_cross.svg";
import IconCheck from "@/Assets/Icons/icon_check.svg";
import IconFlashOn from "@/Assets/Icons/icon_flashOn.svg";
import IconFlashOff from "@/Assets/Icons/icon_flashOff.svg";

import useViewModelCamera from "./PageCameraViewModel";

import "./PageCamera.modules.css";

const PageCamera: React.FC = () => {
  const {
    webcamRef,
    capture,
    captureImage,
    setCaptureImage,
    activeDeviceId,
    facingMode,
    crop,
    setCrop,
    zoom,
    setZoom,
    croppedImage,
    setCroppedImage,
    onCropComplete,
    showCroppedImage,
    onCancleCapture,
    onFlipCamera,
    toggleFlashLight,
    flashLight,
  } = useViewModelCamera();

  return (
    <>
      <Helmet>
        <title>Camera | Paniq</title>
      </Helmet>
      <div className="container_camera_page">
        <div style={{ height: "20%", width: "100%" }}>
          {!captureImage ? (
            <div className="flex flex-row justify-center items-center h-full">
              <Button
                onClick={toggleFlashLight}
                type="primary"
                shape="circle"
                size="large"
                style={{
                  width: "32px",
                  backgroundColor: "#ffffff",
                  color: "#000000",
                }}
                className="flex flex-row justify-center align-center items-center"
                icon={
                  flashLight ? (
                    <img
                      src={IconFlashOn}
                      alt="flash on"
                      style={{ width: "20px" }}
                    />
                  ) : (
                    <img
                      src={IconFlashOff}
                      alt="flash off"
                      style={{ width: "20px" }}
                    />
                  )
                }
              ></Button>
            </div>
          ) : null}
        </div>
        {!captureImage ? (
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
                      setCaptureImage(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                  type="file"
                  style={{ display: "none" }}
                />
                <div className="flex flex-col justify-center align-center items-center">
                  <img
                    src={IconGallery}
                    alt="gallery"
                    style={{ width: "32px", height: "32px", cursor: "pointer" }}
                  />
                </div>
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
                  icon={
                    <img
                      src={IconFlipCamera}
                      alt="flip camera"
                      style={{ width: "32px" }}
                    />
                  }
                  onClick={onFlipCamera}
                ></Button>
              </div>
            </div>
          </>
        ) : null}

        {captureImage ? (
          <>
            <div className="container_camera">
              {captureImage ? (
                <Cropper
                  image={captureImage}
                  crop={crop}
                  zoom={zoom}
                  aspect={4 / 4}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  // rotation={rotation}
                  // onRotationChange={setRotation}
                />
              ) : null}
            </div>
            <div className="container_control_camera flex flex-row justify-around align-center items-center w-full">
              <Button
                className="btn_capture_image"
                type="primary"
                shape="circle"
                size="large"
                onClick={onCancleCapture}
                style={{ width: "64px", height: "64px", cursor: "pointer" }}
                icon={
                  <img
                    src={IconCross}
                    alt="cancel"
                    style={{ width: "32px", height: "32px", cursor: "pointer" }}
                  />
                }
              />

              <Button
                onClick={showCroppedImage}
                className="btn_capture_image"
                type="primary"
                shape="circle"
                size="large"
                style={{ width: "64px", height: "64px", cursor: "pointer" }}
                icon={
                  <img
                    src={IconCheck}
                    alt="check"
                    style={{ width: "32px", height: "32px", cursor: "pointer" }}
                  />
                }
              ></Button>
            </div>
          </>
        ) : null}

        <CropedImageDialog
          img={croppedImage}
          position="bottom"
          onClose={() => {
            setCroppedImage(null);
            setZoom(1);
            setCrop({ x: 0, y: 0 });
          }}
        />
      </div>
    </>
  );
};

export default PageCamera;
