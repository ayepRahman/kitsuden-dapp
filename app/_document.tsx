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
        </Head>
        <body
          style={{
            backgroundColor: "black",
          }}
        >
          <Fonts />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
