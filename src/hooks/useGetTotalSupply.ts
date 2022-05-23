import {
  useContract,
  useConnect,
  useProvider,
  useNetwork,
  useContractRead,
} from "wagmi";
import { CONTRACT_ADDRESS } from "constants/constants";
import foxfoneContract from "../artifacts/contracts/KitsudenFoxfone.sol/KitsudenFoxfone.json";

const useGetTotalSupply = () => {
  const { activeChain } = useNetwork();
  const currentChainId = activeChain?.id || 1;

  const res = useContractRead(
    {
      addressOrName: CONTRACT_ADDRESS[currentChainId],
      contractInterface: foxfoneContract.abi,
    },
    "totalSupply",
    {
      onError: (error) => {
        console.log("error", error.message);
      },
    }
  );

  return {
    ...res,
    totalSupply: res?.data ? Number(res?.data) : 0,
  };
};

export default useGetTotalSupply;
