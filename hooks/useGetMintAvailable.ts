import { useNetwork, useContractRead, useConnect, useAccount } from "wagmi";
import * as ethers from "ethers";
import { CONTRACT_ADDRESS } from "constants/constants";
import FoxfoneContract from "artifacts/contracts/KitsudenFoxfone.sol/KitsudenFoxfone.json";

const useGetMintAvailable = () => {
  const { activeChain } = useNetwork();
  const { data } = useAccount();
  const currentChainId = activeChain?.id || 1;

  const res = useContractRead(
    {
      addressOrName: CONTRACT_ADDRESS[currentChainId],
      contractInterface: FoxfoneContract.abi,
    },
    "mintAvailable",
    {
      overrides: { from: data?.address },
      onError: (error) => {
        console.log("error", error.message);
      },
    }
  );

  return {
    ...res,
    mintLimit: Number(res?.data),
  };
};

export default useGetMintAvailable;
