import React from "react";
import styled from "@emotion/styled";
import { Box, Button, Container, Flex, Image, Link } from "@chakra-ui/react";
import logoImg from "assets/img/kitsuden_logo_1.png";
import { ReactComponent as DiscordIcon } from "assets/img/discord.svg";
import { ReactComponent as OpenseaIcon } from "assets/img/opensea.svg";
import { ReactComponent as TwitterIcon } from "assets/img/twitter.svg";
import { ReactComponent as EtherscanIcon } from "assets/img/etherscan.svg";
import { ReactComponent as Clip } from "assets/img/headerClip.svg";
import MetamaskButton from "containers/MetamaskButton";

const HeaderLink = styled.div`
  font-size: 1rem;
  font-weight: 700;
  font-style: normal;

  cursor: pointer;

  :hover {
    color: ${(p) => p.theme.colors.brand[200]};
  }
`;

const HeaderClip = styled(Clip)`
  position: absolute;
  bottom: -4rem;
  left: 0;
  width: 100%;
  z-index: 1;
`;

const HeadLinkIcon = styled(Link)`
  svg > path:hover {
    fill: ${(p) => p.theme.colors.brand[200]};
  }
`;

const Header = () => {
  const handleOnClick = (id: string) => {
    // scroll to somewhere later
  };

  return (
    <Box bg="brand.100" height="max-content" position="relative">
      <Container
        position="relative"
        padding=" 1rem"
        maxW={1920}
        background="Background.100"
      >
        <Flex
          position="relative"
          zIndex="2"
          alignItems="center"
          width="full"
          justifyContent="space-between"
        >
          <Image src={logoImg} width={174} />
          <Flex gap="3rem">
            <HeaderLink onClick={() => handleOnClick("home")}>HOME</HeaderLink>
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
          <Flex gap="1.5rem" alignItems="center">
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
            <MetamaskButton />
          </Flex>
        </Flex>
      </Container>
      <HeaderClip />
    </Box>
  );
};

export default Header;
