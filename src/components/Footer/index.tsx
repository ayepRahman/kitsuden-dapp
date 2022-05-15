import React from "react";
import { Box, Container, Flex, useMediaQuery } from "@chakra-ui/react";
import footerBg from "assets/img/footer.svg";
import { ReactComponent as LogoImg } from "assets/img/kitsuden_logo_1.svg";
import { ReactComponent as LogoIcon } from "assets/img/logo_icon.svg";
import ScrollLink from "components/ScrollLink";
import { ReactComponent as DiscordIcon } from "assets/img/discord.svg";
import { ReactComponent as OpenseaIcon } from "assets/img/opensea.svg";
import { ReactComponent as TwitterIcon } from "assets/img/twitter.svg";
import { ReactComponent as EtherscanIcon } from "assets/img/etherscan.svg";
import SocialLink from "components/SocialLink";
import Image from "components/Image";

interface FooterProps {
  scrollTo?: (to: string) => void;
}

const Footer: React.FC<FooterProps> = ({ scrollTo }) => {
  const [isMobile] = useMediaQuery("(max-width: 767.98px)");

  const handleOnClick = (to: string) => {
    // scroll to somewhere later
    scrollTo && scrollTo(to);
  };

  const handleOpenLink = (link: string) => {
    window.open(link);
  };

  return (
    <Box
      width="full"
      position="absolute"
      bottom={isMobile ? "-30rem" : "-7rem"}
      bgColor="black"
    >
      <Image
        top="-4rem"
        right={0}
        left={0}
        position="absolute"
        width="full"
        src={footerBg}
        objectFit={isMobile ? "cover" : "fill"}
      />
      <Container
        position="relative"
        zIndex={1}
        maxW={1920}
        py={isMobile ? "2rem" : "5rem"}
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flexDirection={isMobile ? "column" : "row"}
          gap="3rem"
        >
          <Box>
            <LogoImg fill="white" width={234} />
          </Box>
          <Box>
            <Flex justifyContent="center">
              <LogoIcon fill="white" width={98} />
            </Flex>
            <Flex
              mt="2rem"
              gap="3rem"
              flex={1}
              textAlign="center"
              justifyContent="center"
              flexDirection={isMobile ? "column" : "row"}
            >
              <ScrollLink color="white" onClick={() => handleOnClick("hero")}>
                HOME
              </ScrollLink>
              <ScrollLink color="white" onClick={() => handleOnClick("lore")}>
                THE LORE
              </ScrollLink>
              <ScrollLink color="white" onClick={() => handleOnClick("path")}>
                THE PATH
              </ScrollLink>
              <ScrollLink color="white" onClick={() => handleOnClick("team")}>
                THE TEAM
              </ScrollLink>
            </Flex>
          </Box>
          <Box>
            <Flex
              gap="1.5rem"
              alignItems="center"
              justifyContent="flex-end"
              flex={1}
            >
              <SocialLink size="40px" fill="white">
                <DiscordIcon />
              </SocialLink>
              <SocialLink
                size="40px"
                fill="white"
                onClick={() =>
                  handleOpenLink("https://twitter.com/kitsudennft")
                }
              >
                <TwitterIcon />
              </SocialLink>
              <SocialLink size="40px" fill="white">
                <OpenseaIcon />
              </SocialLink>
              <SocialLink size="40px" fill="white">
                <EtherscanIcon />
              </SocialLink>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
