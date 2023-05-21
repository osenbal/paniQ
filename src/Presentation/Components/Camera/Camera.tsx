import React from "react";
import WebCam from "react-webcam";
// import ButtonCamera from "../Button/ButtonCamera";

type Props = {
  webcamRef: React.MutableRefObject<WebCam | null>;
  className?: string;
  devices?: MediaDeviceInfo[];
  setDevices?: React.Dispatch<React.SetStateAction<MediaDeviceInfo[]>>;
  activeDeviceId: string | undefined;
  setActiveDeviceId?: React.Dispatch<React.SetStateAction<string | undefined>>;
  facingMode: "user" | "environment";
  rest?: any;
};

const Camera: React.FC<Props> = ({
  webcamRef,
  className,
  activeDeviceId,
  facingMode,
  rest,
}) => {
  const desiredAspectRatio = 4 / 4;
  const maxHeight = 412; // Maximum height based on your requirements
  // Calculate the width based on the desired aspect ratio and maximum height
  const width = Math.floor(maxHeight * desiredAspectRatio);

  return (
    <>
      <WebCam
        className={className}
        audio={false}
        ref={webcamRef}
        scoped={true}
        // mirrored={true}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: facingMode,
          width: width,
          height: maxHeight,
          deviceId: activeDeviceId,
        }}
        {...rest}
      />
    </>
  );
};

export default Camera;
