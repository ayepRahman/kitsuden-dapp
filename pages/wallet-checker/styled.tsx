import ChakraBox from "@components/ChakraBox";
import styled from "@emotion/styled";
import wcImg from "public/img/wallet_checker_bg.png";

export const WalletCheckerBox = styled(ChakraBox)`
  height: 100%;
  width: 100%;
  background: url(${wcImg.src});
  background-repeat: no-repeat;
  object-fit: fill;
`;
