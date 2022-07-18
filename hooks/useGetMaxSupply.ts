import { useNetwork, useContractRead } from "wagmi";
import FoxfoneContract from "artifacts/contracts/KitsudenFoxfone.sol/KitsudenFoxfone.json";
import useGetContractAddress from "./useGetContractAddress";

const useGetMaxSupply = () => {
  const { contractAddress } = useGetContractAddress();

  const res = useContractRead(
    {
      addressOrName: contractAddress,
      contractInterface: FoxfoneContract.abi,
    },
    "maxSupply",
    {
      onError: (error) => {
        console.log("error", error.message);
      },
      enabled: !!contractAddress,
    }
  );

  return {
    ...res,
    maxSupply: res?.data ? Number(res?.data) : 0,
  };
};

export default useGetMaxSupply;
