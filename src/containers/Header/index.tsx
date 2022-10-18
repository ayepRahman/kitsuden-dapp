import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Drawer,
  DrawerContent,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import ChakraBox from "src/components/ChakraBox";
import Icon from "src/components/Icon";
import { Desktop, Mobile } from "src/components/MediaQuery";
import ScrollLink from "src/components/ScrollLink";
import { navLinks, socialLinks } from "src/constants/links";
import { HeaderClip } from "./styled";

const MetamaskButton = dynamic(() => import("src/containers/MetamaskButton"), {
  ssr: false,
});

interface HeaderProps {
  scrollTo?: (to: string) => void;
}

const Header: React.FC<HeaderProps> = ({ scrollTo }) => {
  // const isMounted = useIsMounted();
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
    <ChakraBox bg="brand.100" height="max-content" position="relative">
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
    </ChakraBox>
  );
};

export default Header;
