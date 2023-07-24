import React from "react";
import { elementColor } from "../../../Core/config/colors/colors";
import { title14 } from "../../../Core/config/fonts/fonts";
import "./Button.modules.css";

type Props = {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
  iconPosition?: "left" | "right";
  color?: "primary" | "secondary";
};

const Button: React.FC<Props> = ({
  children,
  onClick,
  icon,
  style = {},
  className = "",
  disabled = false,
  iconPosition = "left",
  color = "primary",
}: Props) => {
  return (
    <>
      {disabled ? (
        <button
          className={`custom_button custom_button_disabled ${className}`}
          style={{ ...style, ...title14, ...DISABLED }}
          onClick={disabled ? () => {} : onClick}
          disabled={true}
        >
          {iconPosition === "left" ? icon : null}
          {children}
          {iconPosition === "right" ? icon : null}
        </button>
      ) : (
        <button
          className={`custom_button ${className} ${
            color === "primary"
              ? "custom_button_primary"
              : "custom_button_secondary"
          }`}
          style={{ ...style, ...title14, ...COLOR[color] }}
          onClick={onClick}
          disabled={false}
        >
          {iconPosition === "left" ? icon : null}
          {children}
          {iconPosition === "right" ? icon : null}
        </button>
      )}
    </>
  );
};

const COLOR = {
  primary: {
    background: elementColor.button_aqua,
    color: elementColor.buttonText_navBlue,
  },
  secondary: {
    background: elementColor.formBackground_gray,
    color: elementColor.buttonText_navBlue,
  },
};

const DISABLED = {
  cursor: "not-allowed",
  background: elementColor.background_white,
  color: elementColor.buttonText_navBlue,
  border: `1px solid ${elementColor.buttonText_navBlue}`,
};

export default Button;
