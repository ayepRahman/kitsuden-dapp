import FoxfoneContract from "artifacts/contracts/KitsudenFoxfone.sol/KitsudenFoxfone.json";
import { useContractRead } from "wagmi";
import { UseContractReadConfig } from "wagmi/dist/declarations/src/hooks/contracts/useContractRead";
import useGetContractAddress from "./useGetContractAddress";

const useCheckMintPhase = (
  options?: UseContractReadConfig<any[], "mintPhase">
) => {
  const { contractAddress } = useGetContractAddress();

  return useContractRead({
    address: contractAddress,
    abi: FoxfoneContract.abi,
    functionName: "mintPhase",
    enabled: !!contractAddress,
    ...options,
  });
};

export default useCheckMintPhase;
