import { getDefaultClient } from "connectkit";
import { chain, createClient } from "wagmi";

const ALCHEMY_ID = process.env.NEXT_PUBLIC_ALCHEMY_API_ID || "";

export const wagmiClient = createClient(
  getDefaultClient({
    appName: "kitsuden_dapp",
    alchemyId: ALCHEMY_ID,
    chains: [chain.mainnet, chain.goerli, chain.hardhat],
  })
);
