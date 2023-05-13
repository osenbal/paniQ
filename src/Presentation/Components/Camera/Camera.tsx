import React from "react";
import WebCam from "react-webcam";
// import ButtonCamera from "../Button/ButtonCamera";

type Props = {
  webcamRef: React.MutableRefObject<WebCam | null>;
  className?: string;
  rest?: any;
};

const Camera: React.FC<Props> = ({ webcamRef, className, rest }) => {
  return (
    <>
      <WebCam
        className={className}
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: "environment",
        }}
        {...rest}
      />
    </>
  );
};

export default Camera;
