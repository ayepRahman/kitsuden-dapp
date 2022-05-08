import { extendTheme } from "@chakra-ui/react";
export { Global } from "./Global";

const theme = extendTheme({
  fonts: {
    heading: "NineTsukiRegular",
    body: "Montserrat,  sans-serif;",
  },
  colors: {
    brand: {
      100: "#FFFDE5",
      200: "#F36800",
    },
  },
});

type Theme = typeof theme;

export type { Theme };
export { theme };
