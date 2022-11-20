import { Box, Container, Flex, Heading, useMergeRefs } from "@chakra-ui/react";
import ChakraBox from "components/ChakraBox";
import ChakraText from "components/ChakraText";
import Image from "components/Image";
import { motion, useAnimation } from "framer-motion";
import loreBg from "public/img/bg_section_1.png";
import loreBrushBg2 from "public/img/lore_bg-2.png";
import loreBrushBg from "public/img/lore_brush_bg.png";
import React from "react";
import { useInView } from "react-intersection-observer";

const lines = {
  one: "It is said there lies a hidden village located in the eastern part of the world. Deep within the forest of spirits where no man dares to enter. Elusive beings are seen to inhabit the mysterious village. Living their daily lives unbeknownst to the world.",
  two: "The only thing that's known about this village, is that locating it requires a very special device. This device is known to be called a “FOXFONE” discovered by a group of explorers that once braved to venture to the most eastern part of the forest of spirits. It is a shame though, they never came back and the only thing the search rescue part found was this piece of ancient tech.",
  three:
    "Little did we know that this piece of tech just let out a signal. It’s showing something of a map and the words “Loading, Finding shortest path...”",
  four: "As it beckons to you..are you brave enough to follow it?",
};

const lines2 = {
  one: "The adventure picks up right when a group of adventurers decided to follow the signal coming from the broken Foxfone. Riches and greatness only await within the ever-mentioned hidden kitsune village.",
  two: "Along their adventures, they started finding ancient caches, and to their surprise inside are Foxfones! The quantity ranges from the cache to cache but there were always a few of them stored. Groups quickly discovered that there are different types of Foxfones, Each with different colors and shapes. And sure enough, the Foxfones are working with different programs running in them, But somehow most of them are locked. Only the radar and map are available.",
  three:
    "This is it, the way to find the hidden mist village, Kitsuden. What started as a spur-of-the-moment adventure ignited by the discovery of a broken ancient technology called Foxfones, Quickly became a hunt to gather ancient caches in hopes of getting working Foxfones to guide the adventurers on their journey.",
  four: "Will you find one of these caches spread throughout the journey and get yourself and your group Foxfones?",
};

const Lore = React.forwardRef((_, ref) => {
  const { ref: boxRefOne, inView: inView, entry: E1 } = useInView();
  const {
    ref: boxRefTwo,
    inView: inViewTwo,
    entry: E2,
  } = useInView({
    rootMargin: "100px",
    // trackVisibility: true,
  });

  const refs = useMergeRefs(ref, boxRefOne);
  // 1
  const controlsHeader = useAnimation();
  const controlsImg = useAnimation();
  const controlsLineOne = useAnimation();
  const controlsLineTwo = useAnimation();
  const controlsLineThree = useAnimation();
  const controlsLineFour = useAnimation();
  // 2
  const controlsHeader2 = useAnimation();
  const controlsImg2 = useAnimation();
  const controlsLineOne2 = useAnimation();
  const controlsLineTwo2 = useAnimation();
  const controlsLineThree2 = useAnimation();
  const controlsLineFour2 = useAnimation();

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
        // delay: 0.3,
        staggerChildren: 0.01,
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

  React.useEffect(() => {
    if (inViewTwo) {
      controlsHeader2.start("visible");
      controlsImg2.start("visible");
      controlsLineOne2.start("visible");
    }
  }, [inView]);

  return (
    <Box
      top={["-6rem", "-4rem"]}
      h="calc(100% + 4rem)"
      width="full"
      position="relative"
      zIndex={3}
      p={["8rem 0", "8rem 0"]}
      overflow="hidden"
    >
      {/* desktop */}
      <Box h="inherit" w="inherit" display={["none", "none", "block"]}>
        <Image
          alt="loreBg"
          layout="fill"
          placeholder="empty"
          src={loreBg}
          objectFit="fill"
        />
      </Box>
      {/* mobile */}
      <Box h="inherit" w="inherit" display={["block", "block", "none"]}>
        <Image
          alt="loreBg"
          layout="fill"
          placeholder="empty"
          src={loreBg}
          objectFit="cover"
        />
      </Box>

      {/* top */}
      <Container
        ref={refs}
        position="relative"
        zIndex={1}
        maxW="1440px"
        background="Background.100"
        marginTop={["4rem", "7rem"]}
        marginBottom={["4rem", "4rem", "4rem", "14.5rem"]}
      >
        <Flex
          gap="70px"
          alignItems="center"
          flexWrap={["wrap", "wrap", "wrap", "nowrap"]}
        >
          <ChakraBox
            flex={[`0 0 100%`, `0 0 100%`, `0 0 100%`, `0 0 798px`]}
            width={["100%", "798px"]}
            height={["400px", "798px"]}
            position="relative"
            initial="hidden"
            animate={controlsImg}
            variants={loreBrushBgVariants}
            // @ts-ignore
            transition={{
              duration: 1.5,
            }}
          >
            <Image
              alt="loreBrushBg"
              priority
              src={loreBrushBg}
              layout="fill"
              placeholder="empty"
            />
          </ChakraBox>

          <Box width={["100%", "100%", "100%", "50%"]}>
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
                fontSize={[46, 84]}
                lineHeight={["30px", "76px"]}
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
                fontSize={[46, 84]}
                lineHeight={["30px", "76px"]}
                textAlign="right"
              >
                hidden village...
              </Heading>
            </ChakraBox>
            <ChakraText
              color="black"
              lineHeight="160%"
              my="2rem"
              fontSize={[16, 18]}
              fontWeight="600"
              variants={sentenceVariants}
              initial="hidden"
              animate={controlsLineOne}
              onAnimationComplete={() => controlsLineTwo.start("visible")}
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
              fontSize={[16, 18]}
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
              fontSize={[16, 18]}
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
              fontSize={[16, 18]}
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
        <div ref={boxRefTwo} />
      </Container>
      {/* bottom */}
      <Container
        position="relative"
        zIndex={1}
        maxW="1440px"
        background="Background.100"
        marginBottom={["4rem", "7rem"]}
      >
        <Flex
          gap="70px"
          alignItems="center"
          flexWrap={["wrap", "wrap", "wrap", "nowrap"]}
          // flexDir={["revert"]}
        >
          <Box width={["100%", "100%", "100%", "50%"]}>
            <ChakraBox
              initial="hidden"
              animate={controlsHeader2}
              // @ts-ignore
              transition={{
                duration: 1.5,
              }}
              variants={headerVariants}
            >
              <Heading
                color="black"
                fontWeight={400}
                fontSize={[46, 84]}
                lineHeight={["30px", "76px"]}
              >
                an Ever evolving
              </Heading>
            </ChakraBox>
            <ChakraBox
              initial="hidden"
              animate={controlsHeader2}
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
                fontSize={[46, 84]}
                lineHeight={["30px", "76px"]}
                textAlign="right"
              >
                adventure
              </Heading>
            </ChakraBox>
            <ChakraText
              color="black"
              lineHeight="160%"
              my="2rem"
              fontSize={[16, 18]}
              fontWeight="600"
              variants={sentenceVariants}
              initial="hidden"
              animate={controlsLineOne2}
              onAnimationComplete={() => controlsLineTwo2.start("visible")}
            >
              {lines2.one.split("").map((char, i) => {
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
              fontSize={[16, 18]}
              fontWeight="600"
              variants={sentenceVariants}
              initial="hidden"
              animate={controlsLineTwo2}
              onAnimationComplete={() => controlsLineThree2.start("visible")}
            >
              {lines2.two.split("").map((char, i) => {
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
              fontSize={[16, 18]}
              fontWeight="600"
              variants={sentenceVariants}
              initial="hidden"
              animate={controlsLineThree2}
              onAnimationComplete={() => controlsLineFour2.start("visible")}
            >
              {lines2.three.split("").map((char, i) => {
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
              fontSize={[16, 18]}
              fontWeight="600"
              variants={sentenceVariants}
              initial="hidden"
              animate={controlsLineFour2}
            >
              {lines2.four.split("").map((char, i) => {
                return (
                  <motion.span variants={letterVariants} key={`${char}-${i}`}>
                    {char}
                  </motion.span>
                );
              })}{" "}
            </ChakraText>
          </Box>

          <ChakraBox
            flex={[`0 0 100%`, `0 0 100%`, `0 0 100%`, `0 0 798px`]}
            width={["100%", "798px"]}
            height={["400px", "798px"]}
            position="relative"
            initial="hidden"
            animate={controlsImg2}
            variants={loreBrushBgVariants}
            // @ts-ignore
            transition={{
              duration: 1.5,
            }}
          >
            <Image
              alt="loreBrushBg"
              priority
              src={loreBrushBg2}
              layout="fill"
              placeholder="empty"
            />
          </ChakraBox>
        </Flex>
      </Container>
    </Box>
  );
});

export default Lore;
