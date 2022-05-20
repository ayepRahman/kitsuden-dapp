import { useNetwork, useContractWrite } from "wagmi";
import { CONTRACT_ADDRESS } from "constants/constants";
import foxfoneContract from "artifacts/contracts/KitsudenFoxfone.sol/KitsudenFoxfone.json";
import { useToast } from "@chakra-ui/react";

const useMint = () => {
  const toast = useToast();
  const { activeChain } = useNetwork();
  const currentChainId = activeChain?.id || 1;

  return useContractWrite(
    {
      addressOrName: CONTRACT_ADDRESS[currentChainId],
      contractInterface: foxfoneContract.abi,
    },
    "mint",
    {
      onError: (error) => {
        toast({
          status: "error",
          description: error?.message,
          position: "top-right",
        });
      },
      onSuccess: (data) => {
        console.log(data);
        // TODO: pop modal when succes

        toast({
          status: "success",
          description: "Success",
          position: "top-right",
        });
      },
    }
  );
};

export default useMint;
