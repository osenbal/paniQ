import React from "react";
import WebCam from "react-webcam";

export default function PageCameraViewModel() {
  const [captureImage, setCaptureImage] = React.useState<string>("");
  const [devices, setDevices] = React.useState<MediaDeviceInfo[]>([]);
  const [activeDeviceId, setActiveDeviceId] = React.useState<
    string | undefined
  >(undefined);
  const [facingMode, setFacingMode] = React.useState<"user" | "environment">(
    "environment"
  );

  const webcamRef = React.useRef<WebCam>(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setCaptureImage(imageSrc || "");
  }, [webcamRef]);

  React.useEffect(() => {
    (async () => {
      try {
        const devices = await navigator?.mediaDevices?.enumerateDevices();
        const videoDevices = devices.filter((i) => i.kind === "videoinput");
        setDevices(videoDevices);
      } catch (error) {
        console.log(error);
      }
    })();
  });

  return {
    webcamRef,
    capture,
    captureImage,
    setCaptureImage,
    devices,
    setDevices,
    activeDeviceId,
    facingMode,
    setFacingMode,
    setActiveDeviceId,
  };
}
