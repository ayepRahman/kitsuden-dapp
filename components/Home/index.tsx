import { Box } from "@chakra-ui/react";
import Footer from "components/Footer";
import Header from "containers/Header";
import useScrollTo from "hooks/useScrollTo";
import dynamic from "next/dynamic";
import Hero from "./Hero";
import Lore from "./Lore";
import Team from "./Team";

const Path = dynamic(() => import("./Path"), { ssr: false });

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
      <Hero ref={heroRef} />
      <Lore ref={loreRef} />
      <div ref={pathRef}>
        <Path />
      </div>
      <Team ref={teamRef} />
      <Footer scrollTo={handleScrollTo} />
    </Box>
  );
};

export default Home;
