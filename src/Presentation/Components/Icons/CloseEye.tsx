import React from "react";
import IconCloseEye from "@/Assets/Icons/icon_closeEye.svg";

type Props = {
  alt: string;
  onClick?: () => void;
};

const CloseEye: React.FC<Props> = ({ alt, onClick }) => {
  return (
    <div onClick={onClick}>
      <img src={IconCloseEye} alt={alt} />
    </div>
  );
};

export default CloseEye;
