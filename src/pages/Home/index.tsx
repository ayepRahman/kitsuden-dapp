import React from "react";
import { Box } from "@chakra-ui/react";
import Header from "containers/Header";
import Hero from "./Hero";
import Lore from "./Lore";
import Path from "./Path";

export const Home = () => {
  return (
    <Box height="100vh" width="100%">
      <Header />
      <Hero />
      <Lore />
      <Path />
    </Box>
  );
};

export default Home;
