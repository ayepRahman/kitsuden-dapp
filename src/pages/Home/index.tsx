import React from "react";
import { Box } from "@chakra-ui/react";
import Header from "containers/Header";
import Hero from "./Hero";
import Lore from "./Lore";
import Path from "./Path";
import Team from "./Team";

export const Home = () => {
  return (
    <Box height="100vh" width="100%">
      <Header />
      <Hero />
      <Lore />
      <Path />
      <Team />
    </Box>
  );
};

export default Home;
