import React from "react";
import LogoPaniq from "@/Assets/Logos/logo_paniq.svg";

type Props = {
  style?: React.CSSProperties;
  width?: string;
  height?: string;
};

const LogoApp: React.FC<Props> = ({
  style,
  width = "137px",
  height = "77px",
}) => {
  return (
    <div style={style}>
      <img src={LogoPaniq} alt="Logo" width={width} height={height} />
    </div>
  );
};

export default LogoApp;
