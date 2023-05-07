import React from "react";
import IconOpenEye from "@/Assets/Icons/icon_openEye.svg";

type Props = {
  alt: string;
  onClick?: () => void;
};

const OpenEye: React.FC<Props> = ({ alt, onClick }) => {
  return (
    <div onClick={onClick}>
      <img src={IconOpenEye} alt={alt} />
    </div>
  );
};

export default OpenEye;
