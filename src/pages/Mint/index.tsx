import React from "react";
import { Box, Container, Flex, Image } from "@chakra-ui/react";
import Header from "containers/Header";
import Minting from "containers/Minting";
import mintBrushImg from "assets/img/mint_brush_bg.png";

const Mint = () => {
  return (
    <Box>
      <Header />
      <Box bgColor="gray" height="100vh">
        <Container maxW={1600} py="5rem">
          <Flex gap="5rem" alignItems="center">
            <Box flexBasis="50%">
              <Minting />
            </Box>
            <Box flexBasis="50%">
              <Image src={mintBrushImg} width="100%" height="100%" />
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Mint;
