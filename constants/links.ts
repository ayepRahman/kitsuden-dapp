import { IconNamesType } from "components/Icon";
import { SOCIAL_LINKS } from "./constants";

export const socialLinks: {
  name: IconNamesType;
  link: string;
}[] = [
  {
    name: "discord",
    link: SOCIAL_LINKS.discord,
  },
  {
    name: "twitter",
    link: SOCIAL_LINKS.twitter,
  },
  {
    name: "opensea",
    link: SOCIAL_LINKS.discord,
  },
  {
    name: "etherscan",
    link: SOCIAL_LINKS.discord,
  },
];

export const navLinks = [
  {
    title: "HOME",
    link: "hero",
  },
  {
    title: "THE LORE",
    link: "lore",
  },
  {
    title: "THE PATH",
    link: "path",
  },
  // {
  //   title: "THE TEAM",
  //   link: "team",
  // },
];
