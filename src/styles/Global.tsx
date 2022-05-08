import { Global as EmotionGlobal, css } from "@emotion/react";
import nineTsukiFontRegular from "assets/fonts/NineTsukiRegular.ttf";

const Global = () => (
  <EmotionGlobal
    styles={css`
      /* @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800&display=swap"); */

      @font-face {
        font-family: "NineTsukiRegular";
        src: url(${nineTsukiFontRegular}) format("truetype");
      }

      @font-face {
        font-family: "Montserrat", sans-serif;
        src: url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800&display=swap");
      }
    `}
  />
);

export { Global };
