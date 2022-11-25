import { Link } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const SocialLink = styled(Link)<{ size?: string; fill?: string }>`
  height: ${(p) => p.size || "20px"};
  width: ${(p) => p.size || "20px"};

  svg > path {
    fill: ${(p) => p.fill || "black"};
  }

  :hover {
    svg > path {
      fill: ${(p) => p.theme.colors.brand[200]};
    }
  }
`;

export default SocialLink;
