import React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import pathBg from "assets/img/bg_section_2.png";
import pathBrushBg from "assets/img/path_bg.png";

// timeline example

// https://www.w3schools.com/howto/howto_css_timeline.asp

const Path = () => {
  const [isMobile] = useMediaQuery("(max-width: 767.98px)");

  return (
    <Box top="-8rem" width="full" position="relative">
      <Image
        position="absolute"
        width="full"
        height="100%"
        src={pathBg}
        objectFit={isMobile ? "cover" : "fill"}
      />
      <Container
        position="relative"
        zIndex={1}
        maxW="container.xl"
        background="Background.100"
        py={isMobile ? "10rem" : "8rem"}
      >
        <Flex gap="4rem" flexWrap={isMobile ? "wrap" : "nowrap"}>
          <Box
            width={isMobile ? "100%" : "50%"}
            height={isMobile ? "400px" : "700px"}
            position="relative"
          >
            <Heading
              fontWeight={400}
              fontSize={84}
              lineHeight="76px"
              color="white"
            >
              The Path
            </Heading>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
              illo animi veniam ad iste itaque repellendus error eaque, ab quasi
              adipisci quia earum rerum consectetur voluptate quisquam quod modi
              ipsa, aut velit repudiandae voluptates? Suscipit aut, non, earum a
              voluptas eaque odio dolore modi illo quod voluptatum voluptatibus,
              libero iure tempora consequatur omnis. Consequatur officiis harum
              quisquam? Earum, ea cum at impedit assumenda ipsa nihil, soluta ad
              non, possimus vitae eum accusamus in libero nesciunt aliquam
              blanditiis quam quisquam sit dolore quaerat voluptatum tenetur
              placeat quas! Incidunt reprehenderit animi quod id doloribus error
              numquam adipisci temporibus, cumque corporis nihil expedita.
            </Text>
          </Box>
          <Box
            width={isMobile ? "100%" : "50%"}
            height={isMobile ? "400px" : "700px"}
            position="relative"
          >
            <Image
              src={pathBrushBg}
              position="absolute"
              height={isMobile ? "400px" : "700px"}
              w="full"
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
        </Flex>
      </Container>
    </Box>
  );
};

export default Path;
