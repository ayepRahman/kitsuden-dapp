import { Box } from "@chakra-ui/react";
import Button from "components/Button";
import ChakraBox from "components/ChakraBox";
import Image from "components/Image";
import heroBg from "public/img/hero_bg.png";
import kitsudenLog from "public/img/kitsuden_logo_0.png";
import React from "react";

const Hero = React.forwardRef<any>((_, ref) => {
  return (
    <Box
      ref={ref}
      position="relative"
      h={{
        base: "calc(100vh - 60px)",
        lg: "1000px",
      }}
      w="100%"
      overflow="hidden"
    >
      <ChakraBox
        initial={{ opacity: 0.1, scale: 1.3 }}
        animate={{ opacity: 1, scale: 1 }}
        // @ts-ignore no problem in operation, although type error appears.
        transition={{ duration: 1.5 }}
        top="0"
        position="absolute"
        h="100%"
        w="100%"
      >
        <Image
          src={heroBg.src}
          layout="fill"
          objectFit="cover"
          placeholder="empty"
          zIndex={0}
        />
        <Box
          position="relative"
          h="100%"
          w="100%"
          opacity="50%"
          zIndex={1}
          background="black"
        />
      </ChakraBox>
      <ChakraBox
        initial={{ opacity: 0, top: "65%" }}
        animate={{ opacity: 1, top: "50%" }}
        // @ts-ignore no problem in operation, although type error appears.
        transition={{ duration: 1.5 }}
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
      </ChakraBox>
    </Box>
  );
});

export default Hero;
