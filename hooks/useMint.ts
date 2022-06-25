import { useNetwork, useContractWrite } from "wagmi";
import { CONTRACT_ADDRESS } from "constants/constants";
import FoxfoneContract from "artifacts/contracts/KitsudenFoxfone.sol/KitsudenFoxfone.json";
import { useToast } from "@chakra-ui/react";
import {
  UseContractWriteArgs,
  UseContractWriteConfig,
} from "wagmi/dist/declarations/src/hooks/contracts/useContractWrite";

const useMint = (options?: UseContractWriteArgs & UseContractWriteConfig) => {
  const toast = useToast();
  const { activeChain } = useNetwork();
  const currentChainId = activeChain?.id || 1;

  return useContractWrite(
    {
      addressOrName: CONTRACT_ADDRESS[currentChainId],
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
