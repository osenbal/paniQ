import React from "react";
import { elementColor } from "../../../Core/config/colors/colors";
import { title14 } from "../../../Core/config/fonts/fonts";
import "./InputForm.modules.css";

type Props = {
  placeholder: string;
  value: string;
  type?: string;
  error?: string;
  border?: boolean;
  style?: React.CSSProperties;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  rest?: any;
};

const InputForm: React.FC<Props> = ({
  placeholder = "Placeholder",
  value,
  type = "text",
  border = false,
  style = {},
  error = "",
  label = "label",
  onChange,
  icon,
  iconPosition = "left",
  ...rest
}: Props) => {
  return (
    <div className="container_input_form">
      <label htmlFor={label}>
        <span>{label}</span>
      </label>
      <div
        className={`input_container ${border ? null : "input_borderless"} ${
          error !== "" ? "input_error" : null
        }`}
        style={{
          marginTop: "8px",
          backgroundColor: elementColor.formBackground_gray,
          ...style,
        }}
      >
        {iconPosition === "left" ? (
          <span className="container_input_icon">{icon}</span>
        ) : null}
        <input
          id={label}
          style={{
            color: elementColor.buttonText_navBlue,
            backgroundColor: elementColor.formBackground_gray,
            ...title14,
          }}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...rest}
        />
        {iconPosition === "right" ? (
          <span className="container_input_icon">{icon}</span>
        ) : null}
      </div>
      {error !== "" ? (
        <span
          style={{ color: elementColor.error_red }}
          className="span_form_error"
        >
          * {error}
        </span>
      ) : null}
    </div>
  );
};

export default InputForm;
