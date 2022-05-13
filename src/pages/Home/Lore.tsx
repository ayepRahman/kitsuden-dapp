import React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import loreBg from "assets/img/bg_section_1.png";
import loreBrushBg from "assets/img/lore_brush_bg.png";
import Image from "components/Image";

const Lore = () => {
  const [isMobile] = useMediaQuery("(max-width: 767.98px)");

  return (
    <Box top="-4rem" width="full" position="relative">
      <Image
        position="absolute"
        width="full"
        height="100%"
        src={loreBg}
        objectFit={isMobile ? "cover" : "fill"}
      />
      <Container
        position="relative"
        zIndex={1}
        maxW="container.xl"
        background="Background.100"
        py={isMobile ? "8rem" : "5rem"}
      >
        <Flex gap="4rem" flexWrap={isMobile ? "wrap" : "nowrap"}>
          <Box
            width={isMobile ? "100%" : "50%"}
            height={isMobile ? "400px" : "700px"}
            position="relative"
          >
            <Image
              src={loreBrushBg}
              position="absolute"
              height={isMobile ? "400px" : "700px"}
              w="full"
              left={0}
              right={0}
            />
            <model-viewer
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "transparent",
              }}
              src="/astronaut.glb"
              ios-src=""
              poster="https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b%2Fposter-astronaut.png?v=1599079951717"
              alt="A 3D model of an astronaut"
              shadow-intensity="1"
              camera-controls
              auto-rotate
              ar
            ></model-viewer>
          </Box>
          <Box width={isMobile ? "100%" : "50%"}>
            <Heading
              color="black"
              fontWeight={400}
              fontSize={isMobile ? 46 : 84}
              lineHeight={isMobile ? "30px" : "76px"}
            >
              The mysterious
            </Heading>
            <Heading
              color="black"
              fontWeight={400}
              fontSize={isMobile ? 46 : 84}
              lineHeight={isMobile ? "30px" : "76px"}
              textAlign="right"
            >
              hidden village...
            </Heading>
            <Text
              color="black"
              lineHeight="160%"
              my="2rem"
              fontSize={isMobile ? 16 : 18}
              fontWeight="600"
            >
              It is said there lies a hidden village located at the eastern part
              of the world. Deep within the forest of spirits where no man dares
              to enter. Elusive beings are seen to inhabit the mysterious
              village. Living their daily lives unbeknownst to the world.
            </Text>
            <Text
              color="black"
              lineHeight="160%"
              my="2rem"
              fontSize={isMobile ? 16 : 18}
              fontWeight="600"
            >
              The only thing thats known about this village, is that locating it
              requires a very special device. This device is known to be called
              as a “FOXFONE” discovered by a group of explorers that once braved
              to venture to the most eastern part of the forest of spirits. It
              is a shame though, they never came back and the only thing the
              search rescue part found was this piece of ancient tech.
            </Text>
            <Text
              color="black"
              lineHeight="160%"
              my="2rem"
              fontSize={isMobile ? 16 : 18}
              fontWeight="600"
            >
              Little did we know that this piece of tech just let out a signal.
              It’s showing something of a map and the words “Loading, Finding
              shortest path...”
            </Text>
            <Text
              color="black"
              lineHeight="160%"
              my="2rem"
              fontSize={isMobile ? 16 : 18}
              fontWeight="600"
            >
              As it beckons to you..are you brave enough to follow it?
            </Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Lore;
