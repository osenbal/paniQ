import React from "react";
import WebCam from "react-webcam";

export default function PageCameraViewModel() {
  const [captureImage, setCaptureImage] = React.useState<string>("");
  const webcamRef = React.useRef<WebCam>(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setCaptureImage(imageSrc || "");
  }, [webcamRef]);

  return {
    webcamRef,
    capture,
    captureImage,
    setCaptureImage,
  };
}
