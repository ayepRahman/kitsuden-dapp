import { ChakraProvider } from "@chakra-ui/react";
import { wagmiClient } from "config/wagmi";
import { ConnectKitProvider } from "connectkit";
import type { AppProps } from "next/app";
import { theme } from "styles";
import { WagmiConfig } from "wagmi";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <ConnectKitProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default MyApp;
