import { useToast } from "@chakra-ui/react";
import FoxfoneContract from "artifacts/contracts/KitsudenFoxfone.sol/KitsudenFoxfone.json";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import {
  UseContractWriteArgs,
  UseContractWriteConfig,
} from "wagmi/dist/declarations/src/hooks/contracts/useContractWrite";
import useGetContractAddress from "./useGetContractAddress";

const useMint = (options?: UseContractWriteArgs & UseContractWriteConfig) => {
  const toast = useToast();
  const { contractAddress } = useGetContractAddress();

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    contractInterface: FoxfoneContract.abi,
    functionName: "mint",
  });

  return useContractWrite(config);
};

export default useMint;
