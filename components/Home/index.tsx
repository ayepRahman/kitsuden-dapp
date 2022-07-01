import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import Header from "containers/Header";
import Footer from "components/Footer";
import Hero from "./Hero";
import Lore from "./Lore";
import Path from "./Path";
import Team from "./Team";
import useScrollTo from "hooks/useScrollTo";

export const Home = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
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

  React.useEffect(() => {
    setTimeout(() => {
      // setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <Box position="relative">
      <Header scrollTo={handleScrollTo} />
      <Hero ref={heroRef} />
      <Lore ref={loreRef} />
      <Path ref={pathRef} />
      {/* <div ref={teamRef}>
        <Team />
      </div> */}
      {/* <Footer scrollTo={handleScrollTo} /> */}
    </Box>
  );
};

export default Home;
