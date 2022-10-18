import { extendTheme } from "@chakra-ui/react";
export { Fonts as Global } from "./Global";

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
  components: {
    // @link - fixing issue with overlay in modal/drawer/portal https://github.com/chakra-ui/chakra-ui/issues/2893
    // Drawer: {
    //   variants: {
    //     alwaysOpen: {
    //       parts: ["dialog, dialogContainer"],
    //       dialog: {
    //         pointerEvents: "auto",
    //       },
    //       dialogContainer: {
    //         pointerEvents: "none",
    //       },
    //     },
    //   },
    // },
    // Modal: {
    //   variants: {
    //     clickThrough: {
    //       dialogContainer: {
    //         pointerEvents: "none",
    //       },
    //       dialog: {
    //         pointerEvents: "auto",
    //       },
    //     },
    //   },
    // },
  },
});

type Theme = typeof theme;

export type { Theme };
export { theme };
