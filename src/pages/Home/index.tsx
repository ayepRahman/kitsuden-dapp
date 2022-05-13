import React from "react";
import { Box } from "@chakra-ui/react";
import Header from "containers/Header";
import Hero from "./Hero";
import Lore from "./Lore";
import Path from "./Path";
import Team from "./Team";
import Footer from "./Footer";

export const Home = () => {
  return (
    <Box position="relative">
      <Header />
      <Hero />
      <Lore />
      <Path />
      <Team />
      <Footer />
    </Box>
  );
};

export default Home;
