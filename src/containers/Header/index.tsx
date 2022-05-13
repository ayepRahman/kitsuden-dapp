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
import ScrollLink from "components/ScrollLink";
import SocialLink from "components/SocialLink";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { ReactComponent as LogoImg } from "assets/img/kitsuden_logo_1.svg";
import { ReactComponent as DiscordIcon } from "assets/img/discord.svg";
import { ReactComponent as OpenseaIcon } from "assets/img/opensea.svg";
import { ReactComponent as TwitterIcon } from "assets/img/twitter.svg";
import { ReactComponent as EtherscanIcon } from "assets/img/etherscan.svg";
import { ReactComponent as LogoIcon } from "assets/img/logo_icon.svg";
import MetamaskButton from "containers/MetamaskButton";
import { HeaderClip } from "./styled";

interface HeaderProps {
  scrollTo: (to: string) => void;
}

const Header: React.FC<HeaderProps> = ({ scrollTo }) => {
  const [isMobile] = useMediaQuery("(max-width: 767.98px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOnClick = (to: string) => {
    // scroll to somewhere later
    scrollTo(to);
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
              <MetamaskButton width="6rem" />
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

            <Drawer
              variant="alwaysOpen"
              onClose={() => onClose()}
              isOpen={isOpen}
              size="full"
              trapFocus={false}
              blockScrollOnMount={false}
            >
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

                  <LogoIcon />

                  <ScrollLink
                    mt="3rem"
                    mb="0.5rem"
                    onClick={() => handleOnClick("home")}
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
