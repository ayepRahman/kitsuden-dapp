import React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  useMediaQuery,
  Text,
  useMergeRefs,
} from "@chakra-ui/react";
import { TimeLine, TimeLineItem } from "./path.styled";
import pathBg from "public/img/path_bg.png";
import pathBrushBg from "public/img/path_bg.png";
import chapterIcon1 from "public/svg/fire_1.svg";
import chapterIcon2 from "public/svg/fire_2.svg";
import chapterIcon3 from "public/svg/fire_3.svg";
import chapterIcon4 from "public/svg/fire_4.svg";
import lockIcon from "public/svg/lock.svg";
import Image from "components/Image";
import Icon from "components/Icon";

// https://www.w3schools.com/howto/howto_css_timeline.asp

const Path = React.forwardRef((_, ref) => {
  const [isMobile] = useMediaQuery("(max-width: 767.98px)");
  const refs = useMergeRefs(ref);

  return (
    <Box ref={refs} top="-8rem" width="full" position="relative" zIndex={4}>
      <Image
        position="absolute"
        layout="fill"
        src={pathBg.src}
        objectFit={isMobile ? "cover" : "fill"}
      />
      <Container
        position="relative"
        zIndex={1}
        maxW="container.xl"
        background="Background.100"
        py={isMobile ? "10rem" : "8rem"}
      >
        <Flex
          gap="4rem"
          flexWrap={isMobile ? "wrap" : "nowrap"}
          flexDirection={isMobile ? "column-reverse" : "row"}
        >
          <Box position="relative">
            <Heading
              fontWeight={400}
              fontSize={84}
              lineHeight="76px"
              color="white"
              textAlign={isMobile ? "center" : "left"}
            >
              The Path
            </Heading>
            <TimeLine>
              <TimeLineItem size={44} url="/svg/fire_1.svg">
                <Heading
                  mb="1rem"
                  fontWeight={400}
                  fontSize="54px"
                  lineHeight="54px"
                  color="brand.200"
                >
                  Chapter 1
                </Heading>
                <Text fontSize={18} fontWeight={600} lineHeight="160%">
                  The ancient tech known as the FOXFONE are available to be
                  activated. who knows what it will uncover, Will the path to
                  the hidden village finally be discovered?
                </Text>
                <Box width="full" height="1px" bgColor="#e3e3e3" my="1.5rem" />
                <Text
                  fontSize={18}
                  fontWeight={400}
                  lineHeight="160%"
                  mb="1rem"
                >
                  5,555 FOXFONE NFTs will be available to mint. There will be 3
                  tiers of rarity (Common, Uncommon and Rare) that can be
                  randomly minted.
                </Text>
              </TimeLineItem>
              <TimeLineItem size={44} url="/svg/fire_2.svg">
                <Heading
                  mb="3rem"
                  fontWeight={400}
                  fontSize="54px"
                  lineHeight="54px"
                  display="flex"
                  alignItems="center"
                >
                  Chapter 2
                  <Icon name="lock" ml="1rem" />
                </Heading>
              </TimeLineItem>
              <TimeLineItem size={46} url="/svg/fire_3.svg">
                <Heading
                  mb="3rem"
                  fontWeight={400}
                  fontSize="54px"
                  lineHeight="54px"
                  display="flex"
                  alignItems="center"
                >
                  Chapter 3
                  <Icon name="lock" ml="1rem" />
                </Heading>
              </TimeLineItem>
              <TimeLineItem size={48} url="/svg/fire_4.svg">
                <Heading
                  fontWeight={400}
                  fontSize="54px"
                  lineHeight="54px"
                  display="flex"
                  alignItems="center"
                >
                  Chapter 4
                  <Icon name="lock" ml="1rem" />
                </Heading>
              </TimeLineItem>
            </TimeLine>
          </Box>
          <Box
            width="full"
            height={isMobile ? "400px" : "700px"}
            position="relative"
          >
            {/* <Image
              src={pathBrushBg.src}
              position="absolute"
              layout="responsive"
              // height={isMobile ? "400px" : "700px"}
              // width="100%"
            /> */}

            {/* <model-viewer
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
            ></model-viewer> */}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
});

export default Path;
