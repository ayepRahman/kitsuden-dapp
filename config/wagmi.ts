import { ALCHEMY_API_ID } from "config";
import { getDefaultClient } from "connectkit";
import { chain, createClient } from "wagmi";

import { alchemyProvider } from "wagmi/providers/alchemy";

console.log("ALCHEMY_API_ID", ALCHEMY_API_ID);

alchemyProvider();
export const wagmiClient = createClient(
  getDefaultClient({
    appName: "kitsuden_dapp",
    alchemyId: ALCHEMY_API_ID,
    chains: [chain.mainnet, chain.goerli, chain.hardhat],
  })
);
