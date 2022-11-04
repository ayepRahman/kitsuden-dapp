/**
 * A component to makes use of the Head component from Next.js to display the title,
 * keywords and description of the page. This will be used on every page of the website taking in the title,
 * keywords and description as props, useful for SEO.
 */
// export const Meta: React.FC<{
//   title?: string;
//   keywords?: string;
//   description?: string;
// }> = ({
//   title,
//   keywords = "nft, kitsuden, foxfone, project, nftproject, erc721, erc721a, web3, blockchain",
//   // description = "Kitsuden is an NFT project that has multiple layers (Chapters) tied to its journey. For the first chapter, We are releasing 6,666 NFTs with 3 tiers of rarity. These NFTs will be grouped into the genesis Kitsuden NFT collection with the added utility of unlocking the rest of the Kitsuden Ecosystem and Metaverse.",
//   description = "Kitsuden is an NFT project that has multiple layers (Chapters) tied to its journey",
// }) => {
//   return (
//     <NextSeo
//       title={title}
//       description={description}
//       themeColor="#1f1860"
//       openGraph={{
//         type: "website",
//         locale: "en_IE",
//         url: "https://kitsuden.com/",
//         siteName: "Kitsuden",
//         images: [
//           {
//             url: "https://superful-assets-prod.s3.amazonaws.com/images/9ed4e498-ebc5-4568-845a-0b7736f159e0.png",
//             alt: "kitsuden alt",
//           },
//         ],
//       }}
//       twitter={{
//         cardType: "summary_large_image",
//       }}
//     />
//   );
// };

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
  description = "Kitsuden is an NFT project that has multiple layers (Chapters) tied to its journey. For the first chapter, We are releasing 6,666 NFTs with 3 tiers of rarity.",
}) => {
  return (
    // <Head>
    //   <title>{title}</title>
    //   <link rel="icon" href="/favicon.ico" />

    //   {/* <!-- Basic --> */}
    //   <meta name="viewport" content="width=device-width, initial-scale=1" />
    //   <meta name="theme-color" content="#1f1860" />
    //   <meta httpEquiv="Cache-Control" content="0" />
    //   <meta name="keywords" content={keywords} />
    //   <meta name="description" content={description} />
    //   <meta charSet="utf-8" />

    //   {/* <!--  OG --> */}
    //   <meta property="og:title" content={title} />
    //   <meta property="og:type" content="website" />
    //   <meta
    //     property="og:image"
    //     content="https://superful-assets-prod.s3.amazonaws.com/images/9ed4e498-ebc5-4568-845a-0b7736f159e0.png"
    //   />
    //   <meta property="og:url" content="http://kitsuden.com" />
    //   <meta property="og:description" content={description} />
    //   <meta property="og:site_name" content="Kitsuden" />
    //   <meta property="og:locale" content="en_US" />

    //   {/* <!-- twitter --> */}
    //   <meta name="twitter:title" content="Kitsuden" />
    //   <meta property="twitter:card" content="summary_large_image" />
    //   <meta name="twitter:description" content={description} />
    //   <meta
    //     property="twitter:image"
    //     content="https://superful-assets-prod.s3.amazonaws.com/images/9ed4e498-ebc5-4568-845a-0b7736f159e0.png"
    //   />
    //   <meta name="twitter:image:alt" content="Kitsuden" />
    //   <meta name="twitter:site" content="@KitsudenNFT" />

    //   <meta name="apple-mobile-web-app-title" content="Kitsuden" />
    //   <meta name="application-name" content="Kitsuden" />
    //   <meta name="author" content="Kitsuden" />
    // </Head>
    <Head>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@nytimesbits" />
      <meta name="twitter:creator" content="@nickbilton" />
      <meta
        property="og:url"
        content="http://bits.blogs.nytimes.com/2011/12/08/a-twitter-for-my-sister/"
      />
      <meta property="og:title" content="A Twitter for My Sister" />
      <meta
        property="og:description"
        content="In the early days, Twitter grew so quickly that it was almost impossible to add new features because engineers spent their time trying to keep the rocket ship from stalling."
      />
      <meta
        property="og:image"
        content="http://graphics8.nytimes.com/images/2011/12/08/technology/bits-newtwitter/bits-newtwitter-tmagArticle.jpg"
      />
    </Head>
  );
};
