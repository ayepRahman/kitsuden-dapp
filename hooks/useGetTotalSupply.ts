import {
  useContract,
  useConnect,
  useProvider,
  useNetwork,
  useContractRead,
} from "wagmi";
import { CONTRACT_ADDRESS } from "constants/constants";
import FoxfoneContract from "artifacts/contracts/KitsudenFoxfone.sol/KitsudenFoxfone.json";
import useGetContractAddress from "./useGetContractAddress";

const useGetTotalSupply = () => {
  const { contractAddress } = useGetContractAddress();

  console.log("useGetTotalSupply >>>>>>", contractAddress);

  const res = useContractRead(
    {
      addressOrName: contractAddress,
      contractInterface: FoxfoneContract.abi,
    },
    "totalSupply",
    {
      onError: (error) => {
        console.log("error", error.message);
      },
      enabled: !!contractAddress,
    }
  );

  return {
    ...res,
    totalSupply: res?.data ? Number(res?.data) : 0,
  };
};

export default useGetTotalSupply;
