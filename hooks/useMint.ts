import FoxfoneContract from "artifacts/contracts/KitsudenFoxfone.sol/KitsudenFoxfone.json";
import { useContractWrite } from "wagmi";
import { UseContractWriteConfig } from "wagmi/dist/declarations/src/hooks/contracts/useContractWrite";
import useGetContractAddress from "./useGetContractAddress";

const useMint = (options?: UseContractWriteConfig<any[], "mint">) => {
  const { contractAddress } = useGetContractAddress();

  return useContractWrite({
    mode: "recklesslyUnprepared",
    address: contractAddress,
    abi: FoxfoneContract.abi,
    functionName: "mint",
    ...options,
  });
};

export default useMint;
