import React from "react";
import { Box } from "@chakra-ui/react";
import Header from "containers/Header";
import Hero from "components/Hero";

export const Home = () => {
  return (
    <Box height="100vh" width="100%" overflow="hidden">
      <Header />
      <Hero />
    </Box>
  );
};

export default Home;
