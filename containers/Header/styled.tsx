import { Box, Link } from "@chakra-ui/react";
import styled from "@emotion/styled";

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

export const HeadLinkIcon = styled(Link)`
  :hover {
    svg > path {
      fill: ${(p) => p.theme.colors.brand[200]};
    }
  }
`;
