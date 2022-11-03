import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Head, Html, Main, NextScript } from "next/document";
import { Fonts } from "styles/Global";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="google-site-verification"
            content="NtrZuSQa6v1dEdwvQRh5le_KAuDcrhXI0kDMgbL8TUE"
          />
        </Head>
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
