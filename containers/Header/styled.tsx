import styled from "@emotion/styled";
import { Link, Box } from "@chakra-ui/react";
import clip from "public/img/headerClip.svg";

export const HeaderLink = styled(Box)`
  font-size: 1.25rem;
  font-weight: 700;
  font-style: normal;
  white-space: nowrap;

  cursor: pointer;

  :hover {
    color: ${(p) => p.theme.colors.brand[200]};
  }
`;

export const HeaderClip = styled(clip)`
  position: absolute;
  bottom: -4rem;
  left: 0;
  width: 100%;
  z-index: 1;

  /* X-Large devices (large desktops, less than 1400px) */
  @media (max-width: 1399.98px) {
    bottom: -2rem;
  }

  /* Large devices (desktops, less than 1200px) */
  @media (max-width: 1199.98px) {
    bottom: -2rem;
  }

  /* Medium devices (tablets, less than 992px) */
  @media (max-width: 991.98px) {
    bottom: -2rem;
  }

  /* Small devices (landscape phones, less than 768px) */
  @media (max-width: 767.98px) {
    bottom: -1rem;
  }

  /* X-Small devices (portrait phones, less than 576px) */
  @media (max-width: 575.98px) {
    bottom: -1rem;
  }

  /* Small devices (landscape phones, 576px and up) */
  @media (min-width: 576px) {
  }

  /* Medium devices (tablets, 768px and up) */
  @media (min-width: 768px) {
  }

  /* Large devices (desktops, 992px and up) */
  @media (min-width: 992px) {
  }

  /* X-Large devices (large desktops, 1200px and up) */
  @media (min-width: 1200px) {
  }

  /* XX-Large devices (larger desktops, 1400px and up) */
  @media (min-width: 1400px) {
  }
`;

export const HeadLinkIcon = styled(Link)`
  :hover {
    svg > path {
      fill: ${(p) => p.theme.colors.brand[200]};
    }
  }
`;
