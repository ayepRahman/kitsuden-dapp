import React from "react";
import {
  Box,
  Container,
  Flex,
  Image,
  Link,
  useMediaQuery,
} from "@chakra-ui/react";
import Header from "containers/Header";
import mintFoxfoneBg from "public/img/mint_foxfone_bg.png";
import { useNetwork } from "wagmi";
import useIsMounted from "hooks/useIsMounted";
import dynamic from "next/dynamic";

const Minting = dynamic(() => import("containers/Minting"), { ssr: false });
const MintModelViewer = dynamic(() => import("components/MintModelViewer"), {
  ssr: false,
});

const Mint = () => {
  const isMounted = useIsMounted();
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

  if (!isMounted) return null;

  return (
    <Box h="full">
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
        </Box>
      )}
      <Header />
      <Box position="relative" h="full">
        <Image
          position="absolute"
          src={mintFoxfoneBg.src}
          height={isMobile ? "100%" : "100vh"}
          width="100%"
          objectFit={"cover"}
          bgPos="top"
          zIndex="-1"
          placeholder="empty"
        />
        <Container h="full" maxW={1600} py="5rem">
          <Flex
            flexWrap={isMobile ? "wrap-reverse" : "nowrap"}
            gap="5rem"
            alignItems="center"
            w="100%"
          >
            <Box flexBasis={isMobile ? "100%" : "50%"} w="100%">
              <Minting />
            </Box>

            <MintModelViewer />
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Mint;
