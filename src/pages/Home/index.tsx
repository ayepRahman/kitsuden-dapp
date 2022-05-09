import React from "react";
import { Box } from "@chakra-ui/react";
import Header from "containers/Header";
import Hero from "components/Hero";
import Lore from "./Lore";

export const Home = () => {
  return (
    <Box height="100vh" width="100%">
      <Header />
      <Hero />
      <Lore />
    </Box>
  );
};

export default Home;
