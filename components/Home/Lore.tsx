import React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  useMediaQuery,
  useMergeRefs,
} from "@chakra-ui/react";
import loreBg from "public/img/bg_section_1.png";
import loreBrushBg from "public/img/lore_brush_bg.png";
import Image from "components/Image";
import ChakraText from "components/ChakraText";
import ChakraBox from "components/ChakraBox";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useIsMounted from "hooks/useIsMounted";

const lines = {
  one: "It is said there lies a hidden village located at the eastern par of the world. Deep within the forest of spirits where no man dares to enter. Elusive beings are seen to inhabit the mysterious village. Living their daily lives unbeknownst to the world.",
  two: "The only thing thats known about this village, is that locating it requires a very special device. This device is known to be called as a “FOXFONE” discovered by a group of explorers that once braved to venture to the most eastern part of the forest of spirits. It is a shame though, they never came back and the only thing the search rescue part found was this piece of ancient tech.",
  three:
    "Little did we know that this piece of tech just let out a signal.It’s showing something of a map and the words “Loading, Finding shortest path...”",
  four: "As it beckons to you..are you brave enough to follow it?",
};

const Lore = React.forwardRef((_, ref) => {
  const isMounted = useIsMounted();
  const [isMobile] = useMediaQuery("(max-width: 767.98px)");
  const [boxRef, inView] = useInView();
  const refs = useMergeRefs(ref, boxRef);
  const controlsHeader = useAnimation();
  const controlsImg = useAnimation();
  const controlsLineOne = useAnimation();
  const controlsLineTwo = useAnimation();
  const controlsLineThree = useAnimation();
  const controlsLineFour = useAnimation();

  const headerVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };

  const loreBrushBgVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  const sentenceVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.02,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  React.useEffect(() => {
    if (inView) {
      controlsHeader.start("visible");
      controlsImg.start("visible");
      controlsLineOne.start("visible");
    }
  }, [inView]);

  if (!isMounted) return null;

  return (
    <Box
      top="-4rem"
      h="calc(100% + 4rem)"
      width="full"
      position="relative"
      zIndex={3}
      p={isMobile ? "8rem 0" : "8rem 0"}
      overflow="hidden"
    >
      <Image
        position="absolute"
        layout="fill"
        placeholder="empty"
        src={loreBg}
        objectFit={isMobile ? "cover" : "fill"}
      />
      <Container
        ref={refs}
        position="relative"
        zIndex={1}
        maxW="1440px"
        background="Background.100"
      >
        <Flex
          gap="2rem"
          alignItems="center"
          flexWrap={isMobile ? "wrap" : "nowrap"}
        >
          <ChakraBox
            flex={`0 0 ${isMobile ? "100%" : "780px"} `}
            width={isMobile ? "100%" : "748px"}
            height={isMobile ? "400px" : "748px"}
            position="relative"
            initial="hidden"
            animate={controlsImg}
            variants={loreBrushBgVariants}
            // @ts-ignore
            transition={{
              duration: 1.5,
            }}
          >
            <Image src={loreBrushBg} layout="fill" placeholder="empty" />
          </ChakraBox>

          <Box width={isMobile ? "100%" : "50%"}>
            <ChakraBox
              initial="hidden"
              animate={controlsHeader}
              // @ts-ignore
              transition={{
                duration: 1.5,
              }}
              variants={headerVariants}
            >
              <Heading
                color="black"
                fontWeight={400}
                fontSize={isMobile ? 46 : 84}
                lineHeight={isMobile ? "30px" : "76px"}
              >
                The mysterious
              </Heading>
            </ChakraBox>
            <ChakraBox
              initial="hidden"
              animate={controlsHeader}
              // @ts-ignore
              transition={{
                duration: 1.5,
                delay: 0.3,
              }}
              variants={headerVariants}
            >
              <Heading
                color="black"
                fontWeight={400}
                fontSize={isMobile ? 46 : 84}
                lineHeight={isMobile ? "30px" : "76px"}
                textAlign="right"
              >
                hidden village...
              </Heading>
            </ChakraBox>
            <ChakraText
              color="black"
              lineHeight="160%"
              my="2rem"
              fontSize={isMobile ? 16 : 18}
              fontWeight="600"
              variants={sentenceVariants}
              initial="hidden"
              animate={controlsLineOne}
              onAnimationComplete={() => controlsLineTwo.start("visible")}
              // @ts-ignore
              transition={{
                duration: 0.1,
              }}
            >
              {lines.one.split("").map((char, i) => {
                return (
                  <motion.span variants={letterVariants} key={`${char}-${i}`}>
                    {char}
                  </motion.span>
                );
              })}
            </ChakraText>
            <ChakraText
              color="black"
              lineHeight="160%"
              my="2rem"
              fontSize={isMobile ? 16 : 18}
              fontWeight="600"
              variants={sentenceVariants}
              initial="hidden"
              animate={controlsLineTwo}
              onAnimationComplete={() => controlsLineThree.start("visible")}
            >
              {lines.two.split("").map((char, i) => {
                return (
                  <motion.span variants={letterVariants} key={`${char}-${i}`}>
                    {char}
                  </motion.span>
                );
              })}
            </ChakraText>
            <ChakraText
              color="black"
              lineHeight="160%"
              my="2rem"
              fontSize={isMobile ? 16 : 18}
              fontWeight="600"
              variants={sentenceVariants}
              initial="hidden"
              animate={controlsLineThree}
              onAnimationComplete={() => controlsLineFour.start("visible")}
            >
              {lines.three.split("").map((char, i) => {
                return (
                  <motion.span variants={letterVariants} key={`${char}-${i}`}>
                    {char}
                  </motion.span>
                );
              })}
            </ChakraText>
            <ChakraText
              color="black"
              lineHeight="160%"
              my="2rem"
              fontSize={isMobile ? 16 : 18}
              fontWeight="600"
              variants={sentenceVariants}
              initial="hidden"
              animate={controlsLineFour}
            >
              {lines.four.split("").map((char, i) => {
                return (
                  <motion.span variants={letterVariants} key={`${char}-${i}`}>
                    {char}
                  </motion.span>
                );
              })}{" "}
            </ChakraText>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
});

export default Lore;
