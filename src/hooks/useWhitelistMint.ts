import { useToast } from "@chakra-ui/react";
import { useNetwork, useContractWrite } from "wagmi";
import { CONTRACT_ADDRESS } from "constants/constants";
import FoxfoneContract from "../artifacts/contracts/KitsudenFoxfone.sol/KitsudenFoxfone.json";
import useCheckIsAddressWhiteListed from "./useCheckIsAddressWhiteListed";
import { BigNumber } from "ethers";

const useWhitelistMint = () => {
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
        console.log(JSON.stringify(convertedError, null, 2));

        toast({
          status: "error",
          description: convertedError?.reason,
          position: "top-right",
        });
      },
      onSuccess: (data) => {
        console.log(data);

        toast({
          status: "success",
          description: "Success",
          position: "top-right",
        });
      },
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
