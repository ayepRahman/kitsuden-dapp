import { Meta } from "components/Meta";
import Header from "containers/Header";
import useScrollTo from "hooks/useScrollTo";

const Home = async () => {
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
    <div className="relative">
      <Meta title="Kitsuden | Home" />

      <Header scrollTo={handleScrollTo} />
    </div>
  );
};

export default Home;
