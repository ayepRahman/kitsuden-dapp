import { Global as EmotionGlobal, css } from "@emotion/react";
import nineTsukiFontRegular from "assets/fonts/NineTsukiRegular.ttf";

const Global = () => (
  <EmotionGlobal
    styles={css`
      @font-face {
        font-family: "NineTsukiRegular";
        src: url(${nineTsukiFontRegular}) format("truetype");
      }
    `}
  />
);

export { Global };
