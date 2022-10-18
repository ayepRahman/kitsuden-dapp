import { useToast } from "@chakra-ui/react";
import FoxfoneContract from "artifacts/contracts/KitsudenFoxfone.sol/KitsudenFoxfone.json";
import { BigNumber } from "ethers";
import { useContractWrite } from "wagmi";
import {
  UseContractWriteArgs,
  UseContractWriteConfig,
} from "wagmi/dist/declarations/src/hooks/contracts/useContractWrite";
import useCheckIsAddressWhiteListed from "./useCheckIsAddressWhiteListed";
import useGetContractAddress from "./useGetContractAddress";

const useWhitelistMint = (
  options?: UseContractWriteArgs & UseContractWriteConfig
) => {
  const toast = useToast();
  const { isWhiteListed, getProof } = useCheckIsAddressWhiteListed();
  const { contractAddress } = useGetContractAddress();

  const contractWrite = useContractWrite(
    {
      mode: "prepared",
      address: contractAddress,
      abi: FoxfoneContract.abi,
      functionName: "whiteListMint",
    }
    // "whiteListMint",
    // {
    //   onError: (error) => {
    //     const convertedError = error as unknown as any;
    //     toast({
    //       status: "error",
    //       description: convertedError?.reason,
    //       position: "top-right",
    //     });
    //   },
    //   ...options,
    // }
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
      if (count && proof && totalMintPriceInWei) {
        contractWrite.write({
          recklesslySetUnpreparedArgs: [
            count,
            proof,
            { value: totalMintPriceInWei },
          ],
        });
      }
    }
  };

  return {
    ...contractWrite,
    whiteListMint,
  };
};

export default useWhitelistMint;
