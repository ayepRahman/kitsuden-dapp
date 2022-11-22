import { Box, Container, Flex, Image } from "@chakra-ui/react";
import NetworkDetectorBanner from "@components/NetworkDetectorBanner";
import { Meta } from "components/Meta";
import Header from "containers/Header";
import dynamic from "next/dynamic";
import mintFoxfoneBg from "public/img/mint_foxfone_bg.png";

const Minting = dynamic(() => import("containers/Minting"), { ssr: false });
const MintModelViewer = dynamic(() => import("components/MintModelViewer"), {
  ssr: false,
});

const Mint = () => {
  return (
    <>
      <Meta title="Kitsuden | Mint Foxfone" />
      <Box h="full">
        <NetworkDetectorBanner />
        <Header />
        <Box position="relative" h="full">
          <Image
            alt="mintFoxfoneBg"
            position="absolute"
            src={mintFoxfoneBg.src}
            height={["100%", "100vh"]}
            width="100%"
            objectFit={"cover"}
            bgPos="top"
            zIndex="-1"
            placeholder="empty"
            opacity="70%"
          />
          <Container h="full" maxW={1600} py="5rem">
            <Flex
              flexWrap={["wrap-reverse", "nowrap"]}
              gap="5rem"
              alignItems="center"
              w="100%"
            >
              <Box flexBasis={["100%", "50%"]} w="100%">
                <Minting />
              </Box>

              <MintModelViewer />
            </Flex>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Mint;
