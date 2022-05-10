import React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  useMediaQuery,
  Text,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import pathBg from "assets/img/bg_section_2.png";
import pathBrushBg from "assets/img/path_bg.png";
import chapterIcon1 from "assets/img/chapter_1_icon.svg";
import chapterIcon2 from "assets/img/chapter_2_icon.svg";
import chapterIcon3 from "assets/img/chapter_3_icon.svg";
import chapterIcon4 from "assets/img/chapter_4_icon.svg";
import lockIcon from "assets/img/lock.svg";

const TimeLine = styled(Box)`
  position: relative;
  margin: 1rem;
  color: white;

  &:after {
    content: "";
    position: absolute;
    width: 1px;
    background-color: #e3e3e3;
    top: 26px;
    bottom: 26px;
    left: 0;
  }
`;

const TimeLineItem = styled(Box)<{ url: string; size: number }>`
  padding: 0 0 1rem 2rem;
  position: relative;

  &:after {
    content: "";
    background-image: url(${(p) => p.url});
    background-size: ${(p) => `${p.size}px ${p.size}px`};
    position: absolute;
    width: ${(p) => `${p.size}px`};
    height: ${(p) => `${p.size}px`};
    top: 0;
    left: ${(p) => `-${p.size / 2}px`};
    z-index: 1;
  }
`;

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
        <Flex
          gap="4rem"
          flexWrap={isMobile ? "wrap" : "nowrap"}
          flexDirection={isMobile ? "column-reverse" : "column"}
        >
          <Box
            width={isMobile ? "100%" : "50%"}
            // height={isMobile ? "400px" : "700px"}
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
            <TimeLine>
              <TimeLineItem size={44} url={chapterIcon1}>
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
                  5,5555 FOXFONE NFTs will be available to mint. There will be 3
                  tiers of rarity (Common, Uncommon and Rare) that can be
                  randomly minted.
                </Text>
              </TimeLineItem>
              <TimeLineItem size={44} url={chapterIcon2}>
                <Heading
                  mb="1rem"
                  fontWeight={400}
                  fontSize="54px"
                  lineHeight="54px"
                  display="flex"
                  alignItems="center"
                >
                  Chapter 2
                  <Image ml="1rem" src={lockIcon} />
                </Heading>
              </TimeLineItem>
              <TimeLineItem size={46} url={chapterIcon3}>
                <Heading
                  mb="1rem"
                  fontWeight={400}
                  fontSize="54px"
                  lineHeight="54px"
                  display="flex"
                  alignItems="center"
                >
                  Chapter 3
                  <Image ml="1rem" src={lockIcon} />
                </Heading>
              </TimeLineItem>
              <TimeLineItem size={48} url={chapterIcon4}>
                <Heading
                  fontWeight={400}
                  fontSize="54px"
                  lineHeight="54px"
                  display="flex"
                  alignItems="center"
                >
                  Chapter 4
                  <Image ml="1rem" src={lockIcon} />
                </Heading>
              </TimeLineItem>
            </TimeLine>
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
