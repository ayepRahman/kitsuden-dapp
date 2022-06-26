import React from "react";
import {
  Box,
  Container,
  Drawer,
  DrawerContent,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import ScrollLink from "components/ScrollLink";
import SocialLink from "components/SocialLink";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import MetamaskButton from "containers/MetamaskButton";
import { HeaderClip } from "./styled";
import { SOCIAL_LINKS } from "constants/constants";
import { useRouter } from "next/router";
import { Mobile, Desktop } from "components/MediaQuery";
import {
  DiscordIcon,
  EtherscanIcon,
  LogoNameIcon,
  OpenseaIcon,
  TwitterIcon,
} from "components/Icon";

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

const socialLinks = [
  // ele
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
    <Box bg="brand.100" height="max-content" position="relative">
      <Container
        position="relative"
        padding=" 1rem"
        maxW={1920}
        background="Background.100"
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
              <LogoNameIcon width="111px" height="33px" />
            </Box>
            <Flex
              gap="3rem"
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
              <DiscordIcon
                cursor="pointer"
                height="1.25rem"
                width="1.25rem"
                _hover={{ fill: "brand.200" }}
                onClick={() =>
                  handleOpenLink("https://twitter.com/kitsudennft")
                }
              />
              <TwitterIcon
                cursor="pointer"
                height="1.25rem"
                width="1.25rem"
                _hover={{ fill: "brand.200" }}
                onClick={() =>
                  handleOpenLink("https://twitter.com/kitsudennft")
                }
              />
              <OpenseaIcon
                cursor="pointer"
                height="1.25rem"
                width="1.25rem"
                _hover={{ fill: "brand.200" }}
                onClick={() =>
                  handleOpenLink("https://twitter.com/kitsudennft")
                }
              />
              <EtherscanIcon
                cursor="pointer"
                height="1.25rem"
                width="1.25rem"
                _hover={{ fill: "brand.200" }}
                onClick={() =>
                  handleOpenLink("https://twitter.com/kitsudennft")
                }
              />
              <MetamaskButton width="fit-content" />
            </Flex>
          </Flex>
        </Desktop>

        {/* mobile */}
        {/* <Mobile>
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
        </Mobile> */}
      </Container>

      <HeaderClip />
    </Box>
  );
};

export default Header;
