import React from "react";
import {
  Box,
  Container,
  Drawer,
  DrawerContent,
  Flex,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import ScrollLink from "components/ScrollLink";
import SocialLink from "components/SocialLink";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { ReactComponent as LogoImg } from "public/img/kitsuden_logo_1.svg";
import { ReactComponent as DiscordIcon } from "public/img/discord.svg";
import { ReactComponent as OpenseaIcon } from "public/img/opensea.svg";
import { ReactComponent as TwitterIcon } from "public/img/twitter.svg";
import { ReactComponent as EtherscanIcon } from "public/img/etherscan.svg";
import { ReactComponent as LogoIcon } from "public/img/logo_icon.svg";
import MetamaskButton from "containers/MetamaskButton";
import { HeaderClip } from "./styled";
import { SOCIAL_LINKS } from "constants/constants";
import { useRouter } from "next/router";

interface HeaderProps {
  scrollTo?: (to: string) => void;
}

const Header: React.FC<HeaderProps> = ({ scrollTo }) => {
  const router = useRouter();
  const [isMobile] = useMediaQuery("(max-width: 767.98px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOnClick = (to: string) => {
    if (to === "hero") {
      router.push("/");
    }
    // scroll to somewhere later
    scrollTo && scrollTo(to);
    onClose();
  };

  const handleOpenLink = (link: string) => {
    window.open(link);
    onClose();
  };

  return (
    <Box bg="brand.100" height="max-content" position="relative">
      <Container
        position="relative"
        padding=" 1rem"
        maxW={1920}
        background="Background.100"
      >
        {/* large */}
        {!isMobile && (
          <Flex
            position="relative"
            zIndex="2"
            alignItems="center"
            width="full"
            justifyContent="space-between"
          >
            <Box flex={1}>
              <LogoImg width={174} fill="black" />
            </Box>
            <Flex
              gap="3rem"
              flex={1}
              textAlign="center"
              justifyContent="center"
            >
              <ScrollLink onClick={() => handleOnClick("hero")}>
                HOME
              </ScrollLink>
              <ScrollLink onClick={() => handleOnClick("lore")}>
                THE LORE
              </ScrollLink>
              <ScrollLink onClick={() => handleOnClick("path")}>
                THE PATH
              </ScrollLink>
              <ScrollLink onClick={() => handleOnClick("team")}>
                THE TEAM
              </ScrollLink>
            </Flex>
            <Flex
              gap="1.5rem"
              alignItems="center"
              justifyContent="flex-end"
              flex={1}
            >
              <SocialLink>
                <DiscordIcon />
              </SocialLink>
              <SocialLink
                onClick={() =>
                  handleOpenLink("https://twitter.com/kitsudennft")
                }
              >
                <TwitterIcon />
              </SocialLink>
              <SocialLink>
                <OpenseaIcon />
              </SocialLink>
              <SocialLink>
                <EtherscanIcon />
              </SocialLink>
              <MetamaskButton width="fit-content" />
            </Flex>
          </Flex>
        )}

        {/* mobile */}
        {isMobile && (
          <Flex
            position="relative"
            zIndex="2"
            alignItems="center"
            width="full"
            justifyContent="space-between"
          >
            <Box flex={1} />
            <Box flex={1} width="50%" textAlign="center" margin="0 auto">
              <LogoImg width={174} fill="black" />
            </Box>
            <Box flex={1} textAlign="right">
              <HamburgerIcon onClick={() => onOpen()} fontSize={24} />
            </Box>

            <Drawer onClose={() => onClose()} isOpen={isOpen} size="full">
              <DrawerContent bgColor="brand.100">
                <Flex
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  height="full"
                  position="relative"
                >
                  <CloseIcon
                    fontSize={24}
                    position="absolute"
                    top="1.5rem"
                    right="1.5rem"
                    onClick={onClose}
                  />

                  <LogoIcon width={94} height={94} />

                  <ScrollLink
                    mt="3rem"
                    mb="0.5rem"
                    onClick={() => handleOnClick("hero")}
                  >
                    HOME
                  </ScrollLink>
                  <ScrollLink my="0.5rem" onClick={() => handleOnClick("lore")}>
                    THE LORE
                  </ScrollLink>
                  <ScrollLink my="0.5rem" onClick={() => handleOnClick("path")}>
                    THE PATH
                  </ScrollLink>
                  <ScrollLink my="0.5rem" onClick={() => handleOnClick("team")}>
                    THE TEAM
                  </ScrollLink>

                  <Flex mt="3rem" gap="2rem">
                    <SocialLink
                      onClick={() => handleOpenLink(SOCIAL_LINKS.discord)}
                    >
                      <DiscordIcon />
                    </SocialLink>
                    <SocialLink
                      onClick={() => handleOpenLink(SOCIAL_LINKS.twitter)}
                    >
                      <TwitterIcon />
                    </SocialLink>
                    <SocialLink>
                      <OpenseaIcon />
                    </SocialLink>
                    <SocialLink>
                      <EtherscanIcon />
                    </SocialLink>
                  </Flex>
                </Flex>
              </DrawerContent>
            </Drawer>
          </Flex>
        )}
      </Container>

      <HeaderClip />
    </Box>
  );
};

export default Header;
