import { Box, Container, Flex } from "@chakra-ui/react";
import Icon from "components/Icon";
import ScrollLink from "components/ScrollLink";
import { navLinks, socialLinks } from "constants/links";
import LogoImg from "public/svg/kitsuden_logo_1.svg";
import LogoIcon from "public/svg/logo_icon.svg";
import React from "react";

interface FooterProps {
  scrollTo?: (to: string) => void;
}

const Footer: React.FC<FooterProps> = ({ scrollTo }) => {
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
      bgColor="black"
      zIndex={6}
      marginTop={["-18rem", "-12rem"]}
    >
      <Icon
        top="-4rem"
        width="inherit"
        height="inherit"
        position="absolute"
        name="footer"
        objectFit={["cover", "fill"]}
      />
      <Container
        position="relative"
        zIndex={1}
        maxW={1920}
        p={["2rem 1rem", "4rem 1rem 5rem"]}
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flexDirection={["column", "row"]}
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
              flexDirection={["column", "row"]}
            >
              {navLinks.map((sl) => {
                return (
                  <ScrollLink
                    key={sl.title}
                    color="white"
                    onClick={() => handleOnClick(sl.link)}
                  >
                    {sl.title}
                  </ScrollLink>
                );
              })}
            </Flex>
          </Box>
          <Box>
            <Flex
              gap="1.5rem"
              alignItems="center"
              justifyContent="flex-end"
              flex={1}
            >
              {socialLinks.map((sl) => {
                return (
                  <Icon
                    key={sl.name}
                    name={sl.name}
                    cursor="pointer"
                    height="1.25rem"
                    width="1.25rem"
                    fill="white"
                    _hover={{ fill: "brand.200" }}
                    onClick={() => handleOpenLink(sl.link)}
                  />
                );
              })}
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
