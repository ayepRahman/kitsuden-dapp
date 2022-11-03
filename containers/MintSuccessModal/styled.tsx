import { Box, ModalContent } from "@chakra-ui/react";
import styled from "@emotion/styled";
// import mobileModalBg from "public/svg/mobile_modal_bg.svg";
// import modalBg from "public/svg/modal_bg.svg";
import mobileModalBg from "public/img/mobile_modal_bg.png";
import modalBg from "public/img/modal_bg.png";

export const ModalImageWrapper = styled(Box)`
  box-shadow: 0 0 0 4px #8f2d14, 0 0 0 6px #b33f1c, 0 0 0 8px black;
  background: #cc8e3a;
  border-radius: 2px;
  height: 190px;
  width: 190px;
  margin: 1.5rem auto;
`;

export const KitsudenModalContent = styled(ModalContent)`
  position: relative;
  min-height: 600px;
  width: 600px;
  max-width: 600px;
  padding: 5rem 4rem 5.25rem;
  background-color: transparent;
  background-image: url(${modalBg.src});
  background-size: 100% 100%;
  -o-background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  box-shadow: none;
  text-align: center;
  color: #200000;
  /* background-size: fill; */

  /* Small devices (landscape phones, less than 768px) */
  @media (max-width: 768px) {
    padding: 4rem 1.5rem 4.5rem;

    /* height: 100%; */
    width: 351px;
    background-image: url(${mobileModalBg.src}) !important;
  }
`;
