import React from "react";
import { Box, Image } from "@chakra-ui/react";
import heroBg from "assets/img/hero_bg.png";
import kitsudenLog from "assets/img/kitsuden_logo_0.png";
import Button from "components/Button";

const Hero = () => {
  return (
    <Box width="full" position="relative" height="1080px">
      <Image
        top="0"
        position="absolute"
        src={heroBg}
        width="full"
        height="inherit"
      />
      <Box
        position="absolute"
        top="calc(50% - 200px)"
        left="calc(50% - 460px)"
        textAlign="center"
      >
        <Image width={920} src={kitsudenLog} />
        <Button size="lg" mt="2rem">
          COMING SOON
        </Button>
      </Box>
    </Box>
  );
};

export default Hero;
