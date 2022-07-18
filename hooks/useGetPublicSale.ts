import { useNetwork, useContractRead } from "wagmi";
import { CONTRACT_ADDRESS } from "constants/constants";
import FoxfoneContract from "artifacts/contracts/KitsudenFoxfone.sol/KitsudenFoxfone.json";
import useGetContractAddress from "./useGetContractAddress";

const useGetPublicSale = () => {
  const { contractAddress } = useGetContractAddress();

  return useContractRead(
    {
      addressOrName: contractAddress,
      contractInterface: FoxfoneContract.abi,
    },
    "publicSale",
    {
      onError: (error) => {
        console.log("error", error.message);
      },
      enabled: !!contractAddress,
    }
  );
};

export default useGetPublicSale;
