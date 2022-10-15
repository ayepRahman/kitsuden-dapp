import { Box, Link } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Clip from "public/svg/header_clip.svg";

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

export const HeaderClip = styled(Clip)`
  position: absolute;
  width: 100%;
  z-index: 3;
  bottom: -1rem;

  /* Small devices (landscape phones, 576px and up) */
  @media (min-width: 576px) {
    bottom: -1rem;
  }

  /* Medium devices (tablets, 768px and up) */
  @media (min-width: 768px) {
    bottom: -2rem;
  }

  /* Large devices (desktops, 992px and up) */
  @media (min-width: 992px) {
    bottom: -3rem;
  }

  /* X-Large devices (large desktops, 1200px and up) */
  @media (min-width: 1200px) {
    bottom: -3.5rem;
  }

  /* XX-Large devices (larger desktops, 1400px and up) */
  @media (min-width: 1400px) {
    bottom: -4rem;
  }
`;

export const HeadLinkIcon = styled(Link)`
  :hover {
    svg > path {
      fill: ${(p) => p.theme.colors.brand[200]};
    }
  }
`;
