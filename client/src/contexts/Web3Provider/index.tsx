import React from "react";
import * as ethers from "ethers";
import { Provider as WagmiProvider, chain, defaultChains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";

// API key for Ethereum node
// Two popular services are Infura (infura.io) and Alchemy (alchemy.com)
const INFURA_ID = process.env.REACT_APP_INFURA_ID;
// Chains for connectors to support
const chains = defaultChains;

const Web3Provider: React.FC = ({ children }) => {
  const provider = ({ chainId }: { chainId?: number | undefined }) => {
    // Ganache test network_id
    if (chainId === 1337) {
      return new ethers.providers.JsonRpcProvider("HTTP://127.0.0.1:7545");
    }

    return ethers.providers.getDefaultProvider();
  };

  const connectors = ({ chainId }: { chainId?: number | undefined }) => {
    const rpcUrl =
      chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
      chain.mainnet.rpcUrls[0];

    return [
      new InjectedConnector({
        chains,
        options: { shimDisconnect: true },
      }),
      new WalletConnectConnector({
        options: {
          infuraId: INFURA_ID,
          qrcode: true,
        },
      }),
      new CoinbaseWalletConnector({
        options: {
          appName: "My wagmi app",
          jsonRpcUrl: `${rpcUrl}/${INFURA_ID}`,
        },
      }),
    ];
  };

  return (
    <WagmiProvider autoConnect connectors={connectors} provider={provider}>
      {children}
    </WagmiProvider>
  );
};

export { Web3Provider };
