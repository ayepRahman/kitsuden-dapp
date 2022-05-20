import styled from "@emotion/styled";
import { Button } from "@chakra-ui/react";

const ButtonCount = styled(Button)<{ active?: boolean }>`
  height: 70px;
  width: 70px;
  background-color: ${(p) =>
    p.active ? p.theme.colors.brand[200] : "rgba(0, 0, 0, 0.7)"};
  font-size: 40px;
  font-weight: 700;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
`;

export default ButtonCount;
