import { useNetwork, useContractRead } from "wagmi";
import * as ethers from "ethers";
import { CONTRACT_ADDRESS } from "constants/constants";
import foxfoneContract from "artifacts/contracts/KitsudenFoxfone.sol/KitsudenFoxfone.json";

const useGetMintAvailable = () => {
  const { activeChain } = useNetwork();
  const currentChainId = activeChain?.id || 1;

  const res = useContractRead(
    {
      addressOrName: CONTRACT_ADDRESS[currentChainId],
      contractInterface: foxfoneContract.abi,
    },
    "mintAvailable",
    {
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
