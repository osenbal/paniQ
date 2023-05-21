import React from "react";
import Camera from "@/Presentation/Components/Camera/Camera";
import ButtonCamera from "@/Presentation/Components/Button/ButtonCamera";
import { Button } from "antd";
import CropedImageDialog from "@/Presentation/Components/ImgDialog/CropedImageDialog";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/utils/cropImage";

import IconFlipCamera from "@/Assets/Icons/icon_flipCamera.svg";
import IconGallery from "@/Assets/Icons/icon_gallery.svg";
import IconCross from "@/Assets/Icons/icon_cross.svg";
import IconCheck from "@/Assets/Icons/icon_check.svg";

import useViewModelCamera from "./PageCameraViewModel";

import "./PageCamera.modules.css";

const PageCamera: React.FC = () => {
  const {
    captureImage,
    webcamRef,
    capture,
    setCaptureImage,
    activeDeviceId,
    facingMode,
    setFacingMode,
  } = useViewModelCamera();

  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);
  const [croppedImage, setCroppedImage] = React.useState(null);
  // const [flashLight, setFlashLight] = React.useState(false);

  const onCropComplete = React.useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const showCroppedImage = React.useCallback(async () => {
    try {
      const croppedImage: any = await getCroppedImg(
        captureImage,
        croppedAreaPixels,
        0
      );
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [croppedAreaPixels]);

  const onCancleCapture = (): void => {
    setCaptureImage("");
    setCroppedImage(null);
    setCroppedAreaPixels(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
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

  const toggleFlashLight = (): void => {
    const SUPPORTS_MEDIA_DEVICES = "mediaDevices" in navigator;
    if (SUPPORTS_MEDIA_DEVICES) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        const track = stream.getVideoTracks()[0];
        // check if camera has torch support
        track.applyConstraints({
          advanced: [{ torch: true }],
        });
      });
    }
  };

  return (
    <div className="container_camera_page">
      <div style={{ height: "20%", width: "100%" }}>
        <Button
          onClick={toggleFlashLight}
          type="primary"
          shape="circle"
          size="large"
          style={{ width: "58px", height: "58px" }}
        >
          Flash
        </Button>
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
          setCroppedAreaPixels(null);
        }}
      />
    </div>
  );
};

export default PageCamera;
