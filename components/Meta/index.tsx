import Head from "next/head";

/**
 * A component to makes use of the Head component from Next.js to display the title,
 * keywords and description of the page. This will be used on every page of the website taking in the title,
 * keywords and description as props, useful for SEO.
 */
export const Meta: React.FC<{
  title?: string;
  keywords?: string;
  description?: string;
}> = ({
  title,
  keywords = "nft, kitsuden, foxfone, project, nftproject, erc721, erc721a, web3, blockchain",
  description = "Kitsuden is an NFT project that has multiple layers (Chapters) tied to its journey. For the first chapter, We are releasing 6,666 NFTs with 3 tiers of rarity. These NFTs will be grouped into the genesis Kitsuden NFT collection with the added utility of unlocking the rest of the Kitsuden Ecosystem and Metaverse.",
}) => {
  return (
    <Head>
      <title>{title}</title>

      {/* <!-- Basic --> */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#1f1860" />
      <meta httpEquiv="Cache-Control" content="0" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />

      {/* <!--  Essential META Tags --> */}
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/img/kitsuden-metabackground.webp" />
      {/* <meta
        property="og:image"
        content="https://superful-assets-prod.s3.amazonaws.com/images/9ed4e498-ebc5-4568-845a-0b7736f159e0.png"
      /> */}
      <meta property="og:url" content="http://kitsuden.com" />
      <meta name="twitter:title" content="Kitsuden" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={description} />

      {/* <!--  Non-Essential, But Recommended --> */}
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Kitsuden" />
      <meta name="twitter:image:alt" content="Kitsuden" />

      {/* <!--  Non-Essential, But Required for Analytics --> */}
      <meta property="fb:app_id" content="your_app_id" />
      <meta name="twitter:site" content="@KitsudenNFT" />
    </Head>
  );
};
