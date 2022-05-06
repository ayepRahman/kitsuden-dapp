import { createClient, chain, defaultChains } from "wagmi";
import * as ethers from "ethers";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { ALCHEMY_API_ID, ALCHEMY_API_URL, GANACHE_TEST_URL } from "config";

const chains = [
  ...defaultChains,
  {
    id: 1337,
    name: "Ganache",
    rpcUrls: {
      default: "http://127.0.0.1:7545",
    },
  },
];
const defaultChain = chain.mainnet;

export const wagmiClient = createClient({
  autoConnect: true,
  connectors({ chainId }) {
    const chain = chains.find((x) => x.id === chainId) ?? defaultChain;
    console.log("CHAIN", chain);

    const rpcUrl = chain.rpcUrls.alchemy
      ? ALCHEMY_API_URL
      : chain.rpcUrls.default;

    const metamaskConnector = new MetaMaskConnector({
      chains,
    });
    const coinbaseConnector = new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "someappname.xyz",
        chainId: chain.id,
        jsonRpcUrl: rpcUrl,
      },
    });
    const injectConnector = new InjectedConnector({
      chains,
      options: { name: "Injected" },
    });

    return [metamaskConnector, coinbaseConnector, injectConnector];
  },
  provider(config) {
    if (config.chainId === 1337) {
      return new ethers.providers.JsonRpcProvider(GANACHE_TEST_URL);
    }

    return new ethers.providers.AlchemyProvider(config.chainId, ALCHEMY_API_ID);
  },
});
