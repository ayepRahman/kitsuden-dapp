import React from "react";
import { Box, useMediaQuery } from "@chakra-ui/react";
import heroBg from "public/img/hero_bg.png";
import kitsudenLog from "public/img/kitsuden_logo_0.png";
import Button from "components/Button";
import Image from "components/Image";
import { motion } from "framer-motion";
import useIsMounted from "hooks/useIsMounted";

const Hero = () => {
  const isMounted = useIsMounted();
  const [isMobile] = useMediaQuery("(max-width: 767.98px)");

  return (
    <Box
      position="relative"
      h={isMobile ? "800px" : "1000px"}
      w="100%"
      overflow="hidden"
    >
      <Box top="0" position="absolute" h="100%" w="100%">
        <Image src={heroBg.src} layout="fill" objectFit="cover" zIndex={0} />
        <Box
          position="relative"
          h="100%"
          w="100%"
          opacity="50%"
          zIndex={1}
          background="black"
        />
      </Box>
      <Box
        as={motion.div}
        initial={{ top: "65%", opacity: 0 }}
        animate={{ top: "50%", opacity: 1 }}
        display="flex"
        flexDir="column"
        gap="2rem"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%,-50%)"
        textAlign="center"
        zIndex={2}
        minW="272px"
      >
        <Box>
          <Image
            placeholder="empty"
            height="372px"
            width="860px"
            src={kitsudenLog.src}
          />
        </Box>
        <Button size="lg" m="0 auto">
          COMING SOON
        </Button>
      </Box>
    </Box>
  );
};

export default Hero;
