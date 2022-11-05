import "@styles/global.css";
import { wagmiClient } from "config/wagmi";
import { ConnectKitProvider } from "connectkit";
import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <ConnectKitProvider>
        <Component {...pageProps} />
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default MyApp;
