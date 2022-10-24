import { abi } from "contracts/abi";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { UsePrepareContractWriteConfig } from "wagmi/dist/declarations/src/hooks/contracts/usePrepareContractWrite";
import useGetContractAddress from "./useGetContractAddress";

const useWhitelistMint = (options?: UsePrepareContractWriteConfig) => {
  const { contractAddress } = useGetContractAddress();
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "whiteListMint",
    ...options,
  });

  return useContractWrite({ ...config });
};

export default useWhitelistMint;
