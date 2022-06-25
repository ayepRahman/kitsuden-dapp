import React from "react";
import styled from "@emotion/styled";
import { ModalContent } from "@chakra-ui/react";
import modalBg from "public/img/modal_bg.svg";
import mobileModalBg from "public/img/mobile_modal_bg.svg";

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
  box-shadow: none;
  text-align: center;
  color: #200000;

  /* Small devices (landscape phones, less than 768px) */
  @media (max-width: 575.98px) {
    /* height: 600px;
    width: 600px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 1rem; */
    background-size: fill;
    background-image: url(${mobileModalBg});
  }
`;
