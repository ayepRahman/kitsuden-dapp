import { ModalContent } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const KitsudenModalContent = styled(ModalContent)`
  position: relative;
  width: 100%;
  max-width: 500px;
  padding: 3rem 4rem 4rem;
  background: #cc8e3a;
  box-shadow: 0 0 0 8px #8f2d14, 0 0 0 12px #b33f1c, 0 0 0 16px black;
  border-radius: 10px/100px

  text-align: center;
  color: #200000;

  /* Small devices (landscape phones, less than 768px) */
  @media (max-width: 575.98px) {
    margin: 0 1rem;
    padding: 3rem 1rem 4rem;
  }
`;
