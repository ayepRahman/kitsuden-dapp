import { useNetwork } from "wagmi";
import { CONTRACT_ADDRESS } from "constants/constants";

const useGetContractAddress = () => {
  const { activeChain } = useNetwork();
  const currentChainId = activeChain?.id || 1;

  return {
    contractAddress: CONTRACT_ADDRESS[currentChainId],
  };
};

export default useGetContractAddress;
