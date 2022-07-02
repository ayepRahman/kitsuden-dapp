import "@google/model-viewer";
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
import Image from "components/Image";
import Icon from "components/Icon";
import useIsMounted from "hooks/useIsMounted";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// https://www.w3schools.com/howto/howto_css_timeline.asp

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

const Path = React.forwardRef((_, ref) => {
  const isMounted = useIsMounted();
  const controlsTimelines = useAnimation();
  const [inViewRef, inView] = useInView();
  const [isMobile] = useMediaQuery("(max-width: 767.98px)");
  const refs = useMergeRefs(ref, inViewRef);

  React.useEffect(() => {
    if (inView) {
      console.log("INVIEW");
      controlsTimelines.start("visible");
    }
  }, [inView]);

  if (!isMounted) return null;

  return (
    <Box top="-8rem" width="full" position="relative" zIndex={4}>
      {/* bg img */}
      <Image
        position="absolute"
        layout="fill"
        src={pathBg.src}
        objectFit={isMobile ? "cover" : "fill"}
      />
      <Container
        // ref={refs}
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
            <Heading
              fontWeight={400}
              fontSize={84}
              lineHeight="76px"
              color="white"
              textAlign={isMobile ? "center" : "left"}
            >
              The Path
            </Heading>
            <TimeLine
              ref={refs}
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
          <Flex flex="0 0 50%" position="relative" flexDir="column">
            <Image
              src="/img/path_device.png"
              position="absolute"
              top="0"
              right="0"
              bottom="0"
              left="0"
              // layout="fill"
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
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
});

export default Path;
