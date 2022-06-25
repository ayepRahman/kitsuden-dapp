import { Global as EmotionGlobal, css } from "@emotion/react";

const Global = () => (
  <EmotionGlobal
    styles={css`
      @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800&display=swap");

      @font-face {
        font-family: "NineTsukiRegular";
        src: url("fonts/NineTsukiRegular.ttf") format("truetype");
      }

      @font-face {
        font-family: "Montserrat", sans-serif;
      }
    `}
  />
);

export { Global };
