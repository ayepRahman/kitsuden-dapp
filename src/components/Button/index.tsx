import React from "react";
import styled from "@emotion/styled";
import { Button as CKButton, ButtonProps } from "@chakra-ui/react";
import test from "assets/img/button_bg.png";

const CustomButton = styled(CKButton)`
  position: relative;
  color: #200000;
  background: #cc8e3a;
  box-shadow: 0 0 0 4px #8f2d14, 0 0 0 6px #b33f1c, 0 0 0 8px black;
  border-radius: 2px;
  background: url(${test});
  background: linear-gradient(
      360deg,
      #cc8e3a 0%,
      rgba(250, 227, 105, 0.69) 101.25%
    ),
    url(${test});
  transition: none;

  :hover {
    background: #fcb046;
    box-shadow: 0 0 0 4px #8f2d14, 0 0 0 6px #b33f1c, 0 0 0 8px black;
  }

  :focus {
    background: #fcb046;
    box-shadow: 0 0 0 4px #8f2d14, 0 0 0 6px #b33f1c, 0 0 0 8px black;
  }

  :active {
    background: #cc8e3a;
    box-shadow: 0 0 0 4px #8f2d14, 0 0 0 6px #b33f1c, 0 0 0 8px black;
  }

  :visited {
    background: #fcb046;
    box-shadow: 0 0 0 4px #8f2d14, 0 0 0 6px #b33f1c, 0 0 0 8px black;
  }

  :target {
    background: #fcb046;
    box-shadow: 0 0 0 4px #8f2d14, 0 0 0 6px #b33f1c, 0 0 0 8px black;
  }

  :disabled {
    opacity: 0.8;
    background: #fcb046;
    box-shadow: 0 0 0 4px #8f2d14, 0 0 0 6px #b33f1c, 0 0 0 8px black;

    :hover {
      background: #fcb046;
      box-shadow: 0 0 0 4px #8f2d14, 0 0 0 6px #b33f1c, 0 0 0 8px black;
    }
  }
`;

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <CustomButton {...props}>{children}</CustomButton>;
};

export default Button;
