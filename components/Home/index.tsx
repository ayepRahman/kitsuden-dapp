import React from "react";
import { Box } from "@chakra-ui/react";
import Header from "containers/Header";
import Footer from "components/Footer";
import Hero from "./Hero";
import Lore from "./Lore";
import Path from "./Path";
import Team from "./Team";
import useScrollTo from "hooks/useScrollTo";

export const Home = () => {
  const [heroRef, scrollToHero] = useScrollTo<HTMLDivElement>();
  const [loreRef, scrollToLore] = useScrollTo<HTMLDivElement>();
  const [pathRef, scrollToPath] = useScrollTo<HTMLDivElement>();
  const [teamRef, scrollToTeam] = useScrollTo<HTMLDivElement>();

  const handleScrollTo = (to: string) => {
    if (to === "hero") {
      scrollToHero(true);
    }
    if (to === "lore") {
      scrollToLore(true);
    }
    if (to === "path") {
      scrollToPath(true);
    }
    if (to === "team") {
      scrollToTeam(true);
    }
  };

  return (
    <Box position="relative">
      <Header scrollTo={handleScrollTo} />
      <div ref={heroRef}>
        <Hero />
      </div>
      {/* <div ref={loreRef}>
        <Lore />
      </div>
      <div ref={pathRef}>
        <Path />
      </div>
      <div ref={teamRef}>
        <Team />
      </div>
      <Footer scrollTo={handleScrollTo} /> */}
    </Box>
  );
};

export default Home;
