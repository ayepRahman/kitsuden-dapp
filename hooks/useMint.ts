import { useContractWrite } from "wagmi";
import FoxfoneContract from "artifacts/contracts/KitsudenFoxfone.sol/KitsudenFoxfone.json";
import { useToast } from "@chakra-ui/react";
import {
  UseContractWriteArgs,
  UseContractWriteConfig,
} from "wagmi/dist/declarations/src/hooks/contracts/useContractWrite";
import useGetContractAddress from "./useGetContractAddress";

const useMint = (options?: UseContractWriteArgs & UseContractWriteConfig) => {
  const toast = useToast();
  const { contractAddress } = useGetContractAddress();

  return useContractWrite(
    {
      addressOrName: contractAddress,
      contractInterface: FoxfoneContract.abi,
    },
    "mint",
    {
      onError: (error) => {
        const convertedError = error as unknown as any;
        toast({
          status: "error",
          description: convertedError?.reason,
          position: "top-right",
        });
      },
      ...options,
    }
  );
};

export default useMint;
