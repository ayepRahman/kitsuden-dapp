import { ChakraProvider } from "@chakra-ui/react";
import { wagmiClient } from "src/config/wagmi";
import type { AppProps } from "next/app";
import { theme } from "src/styles";
import { WagmiConfig } from "wagmi";

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
