import React from "react";
import { Box, Container, Flex, Image, Link } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import Header from "containers/Header";
import Minting from "containers/Minting";
import mintBrushImg from "assets/img/mint_brush_bg.png";
import { useNetwork } from "wagmi";

const Mint = () => {
  const [isShowWarning, setIsShowWarning] = React.useState<boolean>(false);
  const { activeChain, switchNetwork } = useNetwork();

  React.useEffect(() => {
    if (activeChain?.id !== 1) {
      setIsShowWarning(true);
    } else {
      setIsShowWarning(false);
    }
  }, [activeChain]);

  return (
    <Box>
      {isShowWarning && (
        <Box
          position="relative"
          textAlign="center"
          color="white"
          p={3}
          bg="brand.200"
        >
          Please switch to{" "}
          <Link textDecor="underline" onClick={() => switchNetwork?.(1)}>
            mainnet
          </Link>{" "}
          , currently connected to {activeChain?.name}
          <CloseIcon
            cursor="pointer"
            fontSize={16}
            position="absolute"
            top="1rem"
            right="1rem"
            onClick={() => setIsShowWarning(false)}
          />
        </Box>
      )}
      <Header />
      <Box bgColor="gray" height="100%">
        <Container maxW={1600} py="5rem">
          <Flex gap="5rem" alignItems="center">
            <Box flexBasis="50%">
              <Minting />
            </Box>
            <Box flexBasis="50%">
              <Image src={mintBrushImg} width="100%" height="100%" />
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Mint;
