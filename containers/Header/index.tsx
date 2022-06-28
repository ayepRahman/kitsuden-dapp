import React from "react";
import dynamic from "next/dynamic";
import {
  Box,
  Container,
  Drawer,
  DrawerContent,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";

import ScrollLink from "components/ScrollLink";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { HeaderClip } from "./styled";
import { SOCIAL_LINKS } from "constants/constants";
import { useRouter } from "next/router";
import { Mobile, Desktop } from "components/MediaQuery";
import Icon, { IconNamesType } from "components/Icon";

const MetamaskButton = dynamic(() => import("containers/MetamaskButton"));

const navLinks = [
  {
    title: "HOME",
    link: "hero",
  },
  {
    title: "THE LORE",
    link: "lore",
  },
  {
    title: "THE PATH",
    link: "path",
  },
  {
    title: "THE TEAM",
    link: "team",
  },
];

const socialLinks: {
  name: IconNamesType;
  link: string;
}[] = [
  {
    name: "discord",
    link: SOCIAL_LINKS.discord,
  },
  {
    name: "twitter",
    link: SOCIAL_LINKS.twitter,
  },
  {
    name: "opensea",
    link: SOCIAL_LINKS.discord,
  },
  {
    name: "etherscan",
    link: SOCIAL_LINKS.discord,
  },
];

interface HeaderProps {
  scrollTo?: (to: string) => void;
}

const Header: React.FC<HeaderProps> = ({ scrollTo }) => {
  const router = useRouter();
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
    window && window.open(link);
    onClose();
  };

  return (
    <Box
      bg="brand.100"
      height="max-content"
      position="relative"
      // overflowX="hidden"
    >
      <Container
        position="relative"
        padding={{ base: "0.5rem 1rem", lg: "1rem" }}
        maxW={1920}
        background="Background.100"
        zIndex={4}
      >
        {/* large */}
        <Desktop>
          <Flex
            position="relative"
            zIndex="2"
            alignItems="center"
            width="full"
            justifyContent="space-between"
          >
            <Box flex={1}>
              <Icon name="kitsudenName" width="111px" height="33px" />
            </Box>
            <Flex
              gap="2rem"
              flex={1}
              textAlign="center"
              justifyContent="center"
            >
              {navLinks.map((l) => {
                return (
                  <ScrollLink
                    key={l.title}
                    color="black"
                    onClick={() => handleOnClick(`${l.link}`)}
                  >
                    {l.title}
                  </ScrollLink>
                );
              })}
            </Flex>
            <Flex
              gap="1.5rem"
              alignItems="center"
              justifyContent="flex-end"
              flex={1}
            >
              {socialLinks.map((s) => {
                return (
                  <Icon
                    key={s.name}
                    name={s.name}
                    cursor="pointer"
                    height="1.25rem"
                    width="1.25rem"
                    _hover={{ fill: "brand.200" }}
                    onClick={() => handleOpenLink(s.link)}
                  />
                );
              })}

              <MetamaskButton width="fit-content" />
            </Flex>
          </Flex>
        </Desktop>

        {/* mobile */}
        <Mobile>
          <Flex
            position="relative"
            zIndex="2"
            alignItems="center"
            width="full"
            justifyContent="space-between"
          >
            <Box flex={1} />
            <Box flex={1} textAlign="center">
              <Icon name="kitsudenName" w="133px" h="40px" />
            </Box>
            <Box flex={1} textAlign="right">
              <HamburgerIcon
                color="black"
                onClick={() => onOpen()}
                fontSize={24}
              />
            </Box>

            {/* menu */}
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
                    color="black"
                    fontSize={24}
                    position="absolute"
                    top="1.5rem"
                    right="1.5rem"
                    onClick={onClose}
                  />

                  <Icon
                    name="kitsudenLogo"
                    width="94px"
                    height="94px"
                    mb="3rem"
                  />

                  {navLinks.map((l) => {
                    return (
                      <ScrollLink
                        key={l.title}
                        color="black"
                        my="0.5rem"
                        onClick={() => handleOnClick(`${l.link}`)}
                      >
                        {l.title}
                      </ScrollLink>
                    );
                  })}

                  <Flex mt="3rem" gap="2rem">
                    {socialLinks.map((s) => {
                      return (
                        <Icon
                          key={s.name}
                          name={s.name}
                          cursor="pointer"
                          height="1.25rem"
                          width="1.25rem"
                          _hover={{ fill: "brand.200" }}
                          onClick={() => handleOpenLink(s.link)}
                        />
                      );
                    })}
                  </Flex>
                </Flex>
              </DrawerContent>
            </Drawer>
          </Flex>
        </Mobile>
      </Container>

      <HeaderClip />
    </Box>
  );
};

export default Header;
