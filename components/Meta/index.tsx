import { NextSeo } from "next-seo";

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
    <NextSeo
      title={title}
      description={description}
      themeColor="#1f1860"
      openGraph={{
        type: "website",
        locale: "en_IE",
        url: "https://kitsuden.com/",
        siteName: "Kitsuden",
        images: [
          {
            url: "https://www.superful.xyz/_next/image?url=https%3A%2F%2Fsuperful-assets-prod.s3.amazonaws.com%2Fimages%2F9ed4e498-ebc5-4568-845a-0b7736f159e0.png&w=828&q=75",
            alt: "kitsuden alt",
          },
        ],
      }}
      twitter={{
        handle: "@KitsudenNFT",
        site: "@KitsudenNFT",
        cardType: "summary_large_image",
      }}
    />
  );
};
