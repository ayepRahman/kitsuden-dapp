// emotion.d.ts
import "@emotion/react";
import { Theme as CustomTheme } from "src/styles";

declare module "@emotion/react" {
  export interface Theme extends CustomTheme {}
}
