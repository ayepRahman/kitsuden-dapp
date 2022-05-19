import React from "react";
import {
  useContract,
  useConnect,
  useProvider,
  useNetwork,
  useContractRead,
} from "wagmi";
import foxfoneContract from "artifacts/contracts/KitsudenFoxfone.sol/KitsudenFoxfone.json";
import { CONTRACT_ADDRESS } from "constants/constants";

const useFoxfoneContract = () => {
  const { activeChain } = useNetwork();
  const currentChainId = activeChain?.id || 1;

  console.log(currentChainId);

  // const contract = useContract({
  //   addressOrName: CONTRACT_ADDRESS[currentChainId],
  //   contractInterface: foxfoneContract.abi,
  // });

  const { data, isError, isLoading } = useContractRead(
    {
      addressOrName: CONTRACT_ADDRESS[currentChainId],
      contractInterface: foxfoneContract.abi,
    },
    "publicSale",
    {
      onSuccess: (data) => {
        console.log("success", data);
      },
      onError: (error) => {
        console.log("error", error.message);
      },
    }
  );

  console.log("useContractRead", data);
};

export default useFoxfoneContract;
