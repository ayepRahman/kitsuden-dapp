import Button from "@components/Button";
import { Meta } from "@components/Meta";
import useScrollTo from "@hooks/useScrollTo";

const Home = () => {
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
    <>
      <Meta title="Kitsuden | Home" />

      <div className="relative">
        {/* <Header scrollTo={handleScrollTo} /> */}
        <Button>asdasds</Button>
      </div>
    </>
  );
};

export default Home;
