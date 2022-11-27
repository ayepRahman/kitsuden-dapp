import FoxfoneContract from "artifacts/contracts/Foxfone.sol/Foxfone.json";
import { useContractRead } from "wagmi";
import { UseContractReadConfig } from "wagmi/dist/declarations/src/hooks/contracts/useContractRead";
import useGetContractAddress from "./useGetContractAddress";

const useGetMaxSupply = (
  options?: UseContractReadConfig<any[], "maxSupply">
) => {
  const { contractAddress } = useGetContractAddress();

  return useContractRead({
    address: contractAddress,
    abi: FoxfoneContract.abi,
    functionName: "maxSupply",
    enabled: !!contractAddress,
    ...options,
  });
};

export default useGetMaxSupply;
