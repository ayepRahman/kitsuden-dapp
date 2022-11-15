import { ALCHEMY_API_ID, INFURA_API_KEY } from "config";
import { chain, configureChains, createClient } from "wagmi";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";

console.log({ ALCHEMY_API_ID, INFURA_API_KEY });

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
    new WalletConnectConnector({
      chains: chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider,
});
