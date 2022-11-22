import { NextSeo } from "next-seo";

/**
 * A component to makes use of the Head component from Next.js to display the title,
 * keywords and description of the page. This will be used on every page of the website taking in the title,
 * keywords and description as props, useful for SEO.
 */

const defaultImages = [
  {
    url: "https://kitsuden.s3.amazonaws.com/images/kitsuden-metabackground.webp",
    alt: "kitsuden alt",
  },
];

export const Meta: React.FC<{
  title?: string;
  keywords?: string;
  description?: string;
  images?: { url: string; alt: string }[];
}> = ({
  title,
  images = defaultImages,
  keywords = "nft, kitsuden, foxfone, project, nftproject, erc721, erc721a, web3, blockchain",
  description = "Kitsuden is a multi-chapter NFT project that takes its community on a magical adventure through fantastical story-telling and world-building. Starting from our first release, holders of our NFT will take part in an ever-evolving narrative and are key to unraveling the mysterious hidden village and its forgotten history. Take part as Curious explorers, Brave adventurers, and Astute architects, and help Kitsuden regain its former glory!",
}) => {
  // <link rel="shortcut icon" href="https://your-site.com/your-logo.png" />

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
        images: images,
      }}
      twitter={{
        cardType: "summary_large_image",
      }}
      additionalLinkTags={[
        {
          rel: "icon",
          href: "https://kitsuden.s3.amazonaws.com/images/kitsuden-logo.png",
        },
        {
          rel: "shortcut icon",
          href: "https://kitsuden.s3.amazonaws.com/images/kitsuden-logo.png",
        },
      ]}
    />
  );
};
