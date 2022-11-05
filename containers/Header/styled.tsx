import { Box, Link } from "@chakra-ui/react";
import styled from "@emotion/styled";
import headerBg from "public/img/header_bg.png";

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

export const HeaderClip = styled.div`
  background: url(${headerBg.src});
  background-repeat: repeat-x;
  top: 2rem;
  right: 0;
  bottom: 0;
  left: 0;

  position: absolute;
  width: 100%;
  height: 200%;
  z-index: 3;
`;

export const HeadLinkIcon = styled(Link)`
  :hover {
    svg > path {
      fill: ${(p) => p.theme.colors.brand[200]};
    }
  }
`;
