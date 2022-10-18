import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Head, Html, Main, NextScript } from "next/document";
import { Fonts } from "src/styles/Global";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body
          style={{
            backgroundColor: "black",
          }}
        >
          {/* 👇 Here's the script */}
          <ColorModeScript />
          <Fonts />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
