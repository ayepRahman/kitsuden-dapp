import { useToast } from "@chakra-ui/react";
import { useNetwork, useContractWrite } from "wagmi";
import { CONTRACT_ADDRESS } from "constants/constants";
import FoxfoneContract from "artifacts/contracts/KitsudenFoxfone.sol/KitsudenFoxfone.json";
import useCheckIsAddressWhiteListed from "./useCheckIsAddressWhiteListed";
import { BigNumber } from "ethers";
import {
  UseContractWriteArgs,
  UseContractWriteConfig,
} from "wagmi/dist/declarations/src/hooks/contracts/useContractWrite";

const useWhitelistMint = (
  options?: UseContractWriteArgs & UseContractWriteConfig
) => {
  const toast = useToast();
  const { activeChain } = useNetwork();
  const currentChainId = activeChain?.id || 1;
  const { isWhiteListed, getProof } = useCheckIsAddressWhiteListed();

  const contractWrite = useContractWrite(
    {
      addressOrName: CONTRACT_ADDRESS[currentChainId],
      contractInterface: FoxfoneContract.abi,
    },
    "whiteListMint",
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

  const whiteListMint = (count: number, totalMintPriceInWei: BigNumber) => {
    const proof = getProof();
    if (
      isWhiteListed &&
      isWhiteListed &&
      totalMintPriceInWei &&
      count &&
      proof
    ) {
      contractWrite.write({
        args: [count, proof, { value: totalMintPriceInWei }],
      });
    }
  };

  return {
    ...contractWrite,
    whiteListMint,
  };
};

export default useWhitelistMint;
