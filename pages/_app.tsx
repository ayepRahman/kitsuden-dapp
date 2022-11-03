import { ChakraProvider } from "@chakra-ui/react";
import { wagmiClient } from "config/wagmi";
import { ConnectKitProvider } from "connectkit";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import { theme } from "styles";
import { WagmiConfig } from "wagmi";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <ConnectKitProvider>
        <ChakraProvider theme={theme}>
          <DefaultSeo
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
              cardType: "summary_large_image",
            }}
          />
          <Component {...pageProps} />
        </ChakraProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default MyApp;
