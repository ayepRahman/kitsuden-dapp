import styled from "@emotion/styled";
import { Box } from "@chakra-ui/react";

export const ScrollLink = styled(Box)`
  font-size: 1.25rem;
  font-weight: 700;
  font-style: normal;
  white-space: nowrap;

  cursor: pointer;

  :hover {
    color: ${(p) => p.theme.colors.brand[200]};
  }
`;

export default ScrollLink;
