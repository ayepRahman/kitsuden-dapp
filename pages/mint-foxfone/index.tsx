import { AspectRatio, Box, Container, Flex } from "@chakra-ui/react";
import NetworkDetectorBanner from "@components/NetworkDetectorBanner";
import { Meta } from "components/Meta";
import Header from "containers/Header";
import dynamic from "next/dynamic";

const MINTING_VIDEO =
  "https://kitsuden.s3.amazonaws.com/images/kitsuden-foxfone-mint.mp4";

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
        <Box position="relative" h={["100%", "100vh"]}>
          <AspectRatio
            ratio={[9 / 16, 16 / 9]}
            zIndex="-1"
            position="absolute"
            top="0"
            right="0"
            bottom="0"
            left="0"
          >
            <video muted autoPlay loop src={MINTING_VIDEO} />
          </AspectRatio>

          <Container h="full" maxW={1600} py="5rem" zIndex={2}>
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
