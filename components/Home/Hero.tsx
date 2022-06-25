import React from "react";
import { Box, useMediaQuery } from "@chakra-ui/react";
import heroBg from "public/img/kitsuden-lore-banner.jpg";
import kitsudenLog from "public/img/kitsuden_logo_0.png";
import Button from "components/Button";
import Image from "components/Image";

const Hero = () => {
  const [isMobile] = useMediaQuery("(max-width: 767.98px)");

  return (
    <Box width="full" position="relative" height="80vh">
      <Image
        top="0"
        position="absolute"
        src={heroBg.src}
        width="full"
        height="100%"
        objectFit={isMobile ? "cover" : "cover"}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        margin="0 auto"
        transform="translate(-50%,-50%)"
        textAlign="center"
      >
        <Image width="full" minW={360} src={kitsudenLog.src} />
        <Button size="lg" mt="2rem">
          COMING SOON
        </Button>
      </Box>
    </Box>
  );
};

export default Hero;
