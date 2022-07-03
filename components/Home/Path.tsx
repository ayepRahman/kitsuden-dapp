import "@google/model-viewer";
import React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  useMediaQuery,
  Text,
} from "@chakra-ui/react";
import { TimeLine, TimeLineItem } from "./path.styled";
import pathBg from "public/img/path_bg.png";
import Image from "components/Image";
import Icon from "components/Icon";
import useIsMounted from "hooks/useIsMounted";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ChakraBox from "components/ChakraBox";

const timelineItems = [
  {
    title: "Chapter 1",
    prefixUrl: "/svg/fire_1.svg",
    descOne:
      "The ancient tech known as the FOXFONE are available to be activated. who knows what it will uncover, Will the path to the hidden village finally be discovered?",
    descTwo:
      " 5,555 FOXFONE NFTs will be available to mint. There will be 3 tiers of rarity (Common, Uncommon and Rare) that can be randomly minted.",
    isLock: false,
    size: 44,
    headerMargin: "0 0 1rem",
  },
  {
    title: "Chapter 2",
    prefixUrl: "/svg/fire_2.svg",
    descOne: "",
    descTwo: "",
    isLock: true,
    size: 44,
    headerMargin: "0 0 3rem",
  },
  {
    title: "Chapter 3",
    prefixUrl: "/svg/fire_3.svg",
    descOne: "",
    descTwo: "",
    isLock: true,
    size: 46,
    headerMargin: "0 0 3rem",
  },
  {
    title: "Chapter 4",
    prefixUrl: "/svg/fire_4.svg",
    descOne: "",
    descTwo: "",
    isLock: true,
    size: 48,
    headerMargin: "0 0 -1rem",
  },
];

const Path = React.forwardRef((_, ref: any) => {
  const isMounted = useIsMounted();
  const controlsTimelines = useAnimation();
  const controlsHeading = useAnimation();
  const controlsImg = useAnimation();
  const [imgRef, imgRefInView] = useInView();
  const [timelinesREf, timelinesRfInView] = useInView();
  const [isMobile] = useMediaQuery("(max-width: 767.98px)");
  // const refs = useMergeRefs(ref, inViewRef);

  const headingVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 1,
      },
    },
  };

  const timelinesVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.5,
      },
    },
  };

  const timelinesItemsVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
  };

  const imgVariants = {
    hidden: { opacity: 0, x: isMobile ? 0 : 100, y: isMobile ? 100 : 0 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 1,
      },
    },
  };

  React.useEffect(() => {
    if (imgRefInView) {
      controlsImg.start("visible");
    }

    if (timelinesRfInView) {
      controlsTimelines.start("visible");
      controlsHeading.start("visible");
    }
  }, [imgRefInView, timelinesRfInView]);

  if (!isMounted) return null;

  return (
    <Box ref={ref} top="-8rem" width="full" position="relative" zIndex={4}>
      {/* bg img */}
      <Image
        position="absolute"
        layout="fill"
        src={pathBg.src}
        objectFit={isMobile ? "cover" : "fill"}
        objectPosition={isMobile ? "35% 50%" : "center"}
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
          alignItems="center"
          flexWrap={isMobile ? "wrap" : "nowrap"}
          flexDirection={isMobile ? "column-reverse" : "row"}
        >
          <Box position="relative">
            <ChakraBox
              initial="hidden"
              animate={controlsHeading}
              variants={headingVariants}
            >
              <Heading
                fontWeight={400}
                fontSize={84}
                lineHeight="76px"
                color="white"
                textAlign={isMobile ? "center" : "left"}
              >
                The Path
              </Heading>
            </ChakraBox>
            <TimeLine
              ref={timelinesREf}
              initial="hidden"
              animate={controlsTimelines}
              variants={timelinesVariants}
            >
              {timelineItems.map((item, i) => {
                return (
                  <TimeLineItem
                    key={`${item?.title}-${i}`}
                    variants={timelinesItemsVariants}
                    size={item.size}
                    url={item?.prefixUrl}
                  >
                    <Heading
                      m={item?.headerMargin}
                      fontWeight={400}
                      fontSize="54px"
                      lineHeight="54px"
                      color="brand.200"
                      display="flex"
                      alignItems="center"
                    >
                      {item.title}
                      {item?.isLock && (
                        <Icon w="24px" height="35px" name="lock" ml="1rem" />
                      )}
                    </Heading>
                    {item?.descOne && (
                      <>
                        <Text fontSize={18} fontWeight={600} lineHeight="160%">
                          {item?.descOne}
                        </Text>
                        <Box
                          width="full"
                          height="1px"
                          bgColor="#e3e3e3"
                          my="1.5rem"
                        />
                      </>
                    )}
                    {item?.descTwo && (
                      <Text
                        fontSize={18}
                        fontWeight={400}
                        lineHeight="160%"
                        mb="1rem"
                      >
                        {item?.descTwo}
                      </Text>
                    )}
                  </TimeLineItem>
                );
              })}
            </TimeLine>
          </Box>

          <ChakraBox
            ref={imgRef}
            display="flex"
            flex="0 0 50%"
            position="relative"
            flexDir="column"
            initial="hidden"
            animate={controlsImg}
            variants={imgVariants}
          >
            <Image
              src="/img/path_device.png"
              position="absolute"
              top="0"
              right="0"
              bottom="0"
              left="0"
              height="700px"
              width="700px"
            />

            <model-viewer
              style={{
                width: "60%",
                height: "60%",
                backgroundColor: "transparent",
                position: "absolute",
                top: "60%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              src="/glb/device_1.gltf"
              ios-src=""
              alt="foxfone-device"
              shadow-intensity="1"
              camera-controls
              auto-rotate
              ar
            ></model-viewer>
          </ChakraBox>
        </Flex>
      </Container>
    </Box>
  );
});

export default Path;
