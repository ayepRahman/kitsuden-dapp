import { createClient, defaultChains } from "wagmi";
import * as ethers from "ethers";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { ALCHEMY_API_ID, ALCHEMY_API_URL, GANACHE_TEST_URL } from "config";

const chains = defaultChains;

const connectors = ({ chainId }: { chainId?: number | undefined }) => {
  // const chain = chains.find((x: any) => x.id === chainId) ?? defaultChains;
  const metamaskConnector = new MetaMaskConnector({ chains });
  const coinbaseConnector = new CoinbaseWalletConnector({
    options: {
      appName: "someappname.xyz",
      jsonRpcUrl: ALCHEMY_API_URL,
    },
  });
  const injectConnector = new InjectedConnector({
    chains,
    options: { name: "Injected" },
  });

  return [metamaskConnector, coinbaseConnector, injectConnector];
};

const provider = ({ chainId }: { chainId?: number | undefined }) => {
  // Ganache test network_id
  if (chainId === 1337) {
    return new ethers.providers.JsonRpcProvider(GANACHE_TEST_URL);
  }

  return new ethers.providers.AlchemyProvider(chainId, ALCHEMY_API_ID);
};

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
