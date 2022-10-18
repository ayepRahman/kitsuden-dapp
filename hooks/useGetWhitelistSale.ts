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

const useGetWhitelistSale = () => {
  const { chain } = useNetwork();
  const { contractAddress } = useGetContractAddress();

  return useContractRead(
    {
      addressOrName: contractAddress,
      contractInterface: FoxfoneContract.abi,
    },
    "whitelistSale",
    {
      onError: (error) => {
        console.log("error", error.message);
      },
      enabled: !!contractAddress,
    }
  );
};

export default useGetWhitelistSale;
