import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Head, Html, Main, NextScript } from "next/document";
import { Fonts } from "styles/Global";

export default class Document extends NextDocument {
  render() {
    const title = "Kitsuden";
    const description =
      "Kitsuden is an NFT project that has multiple layers (Chapters) tied to its journey. For the first chapter, We are releasing 6,666 NFTs with 3 tiers of rarity. These NFTs will be grouped into the genesis Kitsuden NFT collection with the added utility of unlocking the rest of the Kitsuden Ecosystem and Metaverse.";

    return (
      <Html lang="en">
        <Head>
          <meta
            name="google-site-verification"
            content="NtrZuSQa6v1dEdwvQRh5le_KAuDcrhXI0kDMgbL8TUE"
          />

          <title>{title}</title>
          <link rel="icon" href="/favicon.ico" />

          {/* <!-- Basic --> */}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#1f1860" />
          <meta httpEquiv="Cache-Control" content="0" />
          <meta
            name="keywords"
            content="nft, kitsuden, foxfone, project, nftproject, erc721, erc721a, web3, blockchain"
          />
          <meta
            name="description"
            content="Kitsuden is an NFT project that has multiple layers (Chapters) tied to its journey. For the first chapter, We are releasing 6,666 NFTs with 3 tiers of rarity. These NFTs will be grouped into the genesis Kitsuden NFT collection with the added utility of unlocking the rest of the Kitsuden Ecosystem and Metaverse."
          />
          <meta charSet="utf-8" />

          {/* <!--  OG --> */}
          <meta property="og:title" content={title} />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="https://superful-assets-prod.s3.amazonaws.com/images/9ed4e498-ebc5-4568-845a-0b7736f159e0.png"
          />
          <meta property="og:url" content="http://kitsuden.com" />
          <meta property="og:description" content={description} />
          <meta property="og:site_name" content="Kitsuden" />
          <meta property="og:locale" content="en_US" />
          <meta name="author" content="Kitsuden" />

          {/* <!-- twitter --> */}
          <meta name="twitter:title" content="Kitsuden" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image:alt" content="Kitsuden" />
          <meta name="twitter:site" content="@KitsudenNFT" />

          <meta name="apple-mobile-web-app-title" content="Kitsuden" />
          <meta name="application-name" content="Kitsuden" />
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
