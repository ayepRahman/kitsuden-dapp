import React from "react";
import {
  Box,
  Container,
  Drawer,
  DrawerContent,
  Flex,
  Image,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import logoImg from "assets/img/kitsuden_logo_1.png";
import { ReactComponent as DiscordIcon } from "assets/img/discord.svg";
import { ReactComponent as OpenseaIcon } from "assets/img/opensea.svg";
import { ReactComponent as TwitterIcon } from "assets/img/twitter.svg";
import { ReactComponent as EtherscanIcon } from "assets/img/etherscan.svg";
import { ReactComponent as LogoIcon } from "assets/img/logo_icon.svg";
import MetamaskButton from "containers/MetamaskButton";
import { HeaderLink, HeadLinkIcon, HeaderClip } from "./styled";

const Header = () => {
  const [isMobile] = useMediaQuery("(max-width: 767.98px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOnClick = (id: string) => {
    // scroll to somewhere later
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
              <Image src={logoImg} width={174} />
            </Box>
            <Flex
              gap="3rem"
              flex={1}
              textAlign="center"
              justifyContent="center"
            >
              <HeaderLink onClick={() => handleOnClick("home")}>
                HOME
              </HeaderLink>
              <HeaderLink onClick={() => handleOnClick("lore")}>
                THE LORE
              </HeaderLink>
              <HeaderLink onClick={() => handleOnClick("path")}>
                THE PATH
              </HeaderLink>
              <HeaderLink onClick={() => handleOnClick("team")}>
                THE TEAM
              </HeaderLink>
            </Flex>
            <Flex
              gap="1.5rem"
              alignItems="center"
              justifyContent="flex-end"
              flex={1}
            >
              <HeadLinkIcon>
                <DiscordIcon />
              </HeadLinkIcon>
              <HeadLinkIcon>
                <TwitterIcon />
              </HeadLinkIcon>
              <HeadLinkIcon>
                <OpenseaIcon />
              </HeadLinkIcon>
              <HeadLinkIcon>
                <EtherscanIcon />
              </HeadLinkIcon>
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
              <Image src={logoImg} width={174} />
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

                  <HeaderLink
                    mt="3rem"
                    mb="0.5rem"
                    onClick={() => handleOnClick("home")}
                  >
                    HOME
                  </HeaderLink>
                  <HeaderLink my="0.5rem" onClick={() => handleOnClick("lore")}>
                    THE LORE
                  </HeaderLink>
                  <HeaderLink my="0.5rem" onClick={() => handleOnClick("path")}>
                    THE PATH
                  </HeaderLink>
                  <HeaderLink my="0.5rem" onClick={() => handleOnClick("team")}>
                    THE TEAM
                  </HeaderLink>

                  <Flex mt="3rem" gap="2rem">
                    <HeadLinkIcon>
                      <DiscordIcon />
                    </HeadLinkIcon>
                    <HeadLinkIcon>
                      <TwitterIcon />
                    </HeadLinkIcon>
                    <HeadLinkIcon>
                      <OpenseaIcon />
                    </HeadLinkIcon>
                    <HeadLinkIcon>
                      <EtherscanIcon />
                    </HeadLinkIcon>
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
