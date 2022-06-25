import { ChakraProvider } from "@chakra-ui/react";
import { WagmiConfig } from "wagmi";
import type { AppProps } from "next/app";
import { theme } from "styles";
import { wagmiClient } from "config/wagmi";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </WagmiConfig>
  );
};

export default MyApp;
