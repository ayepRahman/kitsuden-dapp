import { IconNamesType } from "src/components/Icon";
import { SOCIAL_LINKS } from "./constants";

export const socialLinks: {
  name: IconNamesType;
  link: string;
}[] = [
  {
    name: "discord",
    link: SOCIAL_LINKS.twitter,
  },
  {
    name: "twitter",
    link: SOCIAL_LINKS.twitter,
  },
  {
    name: "opensea",
    link: SOCIAL_LINKS.twitter,
  },
  {
    name: "etherscan",
    link: SOCIAL_LINKS.twitter,
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
