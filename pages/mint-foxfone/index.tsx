import {
  Box,
  Container,
  Flex,
  Image,
  Link,
  useMediaQuery,
} from "@chakra-ui/react";
import Header from "containers/Header";
import dynamic from "next/dynamic";
import mintFoxfoneBg from "public/img/mint_foxfone_bg.png";
import React from "react";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";

const Minting = dynamic(() => import("containers/Minting"), { ssr: false });
const MintModelViewer = dynamic(() => import("components/MintModelViewer"), {
  ssr: false,
});

const Mint = () => {
  // const isMounted = useIsMounted();
  const [isShowWarning, setIsShowWarning] = React.useState<boolean>(false);
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const [isMobile] = useMediaQuery("(max-width: 767.98px)");

  React.useEffect(() => {
    if (chain?.id !== 1 && isConnected) {
      setIsShowWarning(true);
    } else {
      setIsShowWarning(false);
    }
  }, [chain, chain?.id]);

  // if (!isMounted) return null;

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
          , currently connected to {chain?.name}
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
