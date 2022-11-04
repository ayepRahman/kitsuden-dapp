import clsx from "clsx";
import React from "react";
import styles from "./index.module.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className={clsx({
        ...styles,
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
