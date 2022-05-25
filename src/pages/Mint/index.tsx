import React from "react";
import {
  Box,
  Container,
  Flex,
  Image,
  Link,
  useMediaQuery,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import Header from "containers/Header";
import Minting from "containers/Minting";
import mintBrushImg from "assets/img/mint_brush_bg.png";
import loreBanneMist from "assets/img/lore_banner_mist.jpg";
import { useNetwork } from "wagmi";

const Mint = () => {
  const [isShowWarning, setIsShowWarning] = React.useState<boolean>(false);
  const { activeChain, switchNetwork } = useNetwork();
  const [isMobile] = useMediaQuery("(max-width: 767.98px)");

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
      <Box position="relative" height="100%">
        <Image
          position="absolute"
          src={loreBanneMist}
          height="100%"
          width="100%"
          objectFit="cover"
          bgPos="top"
          zIndex="-1"
        />
        <Container maxW={1600} py="5rem">
          <Flex
            flexWrap={isMobile ? "wrap-reverse" : "nowrap"}
            gap="5rem"
            alignItems="center"
            w="100%"
          >
            <Box flexBasis={isMobile ? "100%" : "50%"} w="100%">
              <Minting />
            </Box>
            <Box flexBasis={isMobile ? "100%" : "50%"} w="100%">
              <Image src={mintBrushImg} width="100%" height="100%" />
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Mint;
