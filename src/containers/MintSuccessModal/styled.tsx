import React from "react";
import styled from "@emotion/styled";
import { ModalContent } from "@chakra-ui/react";
import modalBg from "assets/img/modal_bg.svg";

export const KitsudenModalContent = styled(ModalContent)`
  position: relative;
  height: 600px;
  width: 600px;
  max-width: 600px;
  padding: 3rem 4rem 4rem;
  background-color: transparent;
  background-image: url(${modalBg});
  background-size: 100% 100%;
  -o-background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  background-size: cover;
  box-shadow: none;
  text-align: center;
  color: #200000;
`;
