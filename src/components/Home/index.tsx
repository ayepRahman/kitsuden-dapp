import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Footer from "src/components/Footer";
import Header from "src/containers/Header";
import useScrollTo from "src/hooks/useScrollTo";
import Hero from "./Hero";
import Lore from "./Lore";

const Path = dynamic(() => import("./Path"), { ssr: false });

export const Home = () => {
  const [heroRef, scrollToHero] = useScrollTo<HTMLDivElement>();
  const [loreRef, scrollToLore] = useScrollTo<HTMLDivElement>();
  const [pathRef, scrollToPath] = useScrollTo<HTMLDivElement>();

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
  };

  return (
    <Box position="relative">
      <Header scrollTo={handleScrollTo} />
      <Hero ref={heroRef} />
      <Lore ref={loreRef} />
      <div ref={pathRef}>
        <Path />
      </div>
      <Footer scrollTo={handleScrollTo} />
    </Box>
  );
};

export default Home;
