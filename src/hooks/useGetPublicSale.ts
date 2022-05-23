import { useNetwork, useContractRead } from "wagmi";
import { CONTRACT_ADDRESS } from "constants/constants";
import FoxfoneContract from "../artifacts/contracts/KitsudenFoxfone.sol/KitsudenFoxfone.json";

const useGetPublicSale = () => {
  const { activeChain } = useNetwork();
  const currentChainId = activeChain?.id || 1;

  return useContractRead(
    {
      addressOrName: CONTRACT_ADDRESS[currentChainId],
      contractInterface: FoxfoneContract.abi,
    },
    "publicSale",
    {
      onError: (error) => {
        console.log("error", error.message);
      },
    }
  );
};

export default useGetPublicSale;
