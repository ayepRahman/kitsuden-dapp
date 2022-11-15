import { ALCHEMY_API_ID, INFURA_API_KEY } from "config";
import { chain, configureChains, createClient } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";

const { provider, chains } = configureChains(
  [chain.mainnet, chain.goerli],
  [
    alchemyProvider({ apiKey: ALCHEMY_API_ID }),
    infuraProvider({ apiKey: INFURA_API_KEY }),
    publicProvider(),
  ],
  { targetQuorum: 2 }
);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "Kitsuden",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Kitsuden",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
});
