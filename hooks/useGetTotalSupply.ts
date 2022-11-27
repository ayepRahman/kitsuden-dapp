import FoxfoneContract from "artifacts/contracts/Foxfone.sol/Foxfone.json";
import { useContractRead } from "wagmi";
import useGetContractAddress from "./useGetContractAddress";

const useGetTotalSupply = () => {
  const { contractAddress } = useGetContractAddress();

  const res = useContractRead({
    address: contractAddress,
    abi: FoxfoneContract.abi,
    functionName: "totalSupply",
    enabled: !!contractAddress,
  });

  return {
    ...res,
    totalSupply: res?.data ? Number(res?.data) : 0,
  };
};

export default useGetTotalSupply;
