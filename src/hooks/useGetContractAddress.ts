import { CONTRACT_ADDRESS } from "src/constants/constants";
import { useNetwork } from "wagmi";

const useGetContractAddress = () => {
  const { chain } = useNetwork();
  const currentChainId = chain?.id || 1;

  return {
    contractAddress: CONTRACT_ADDRESS[currentChainId],
  };
};

export default useGetContractAddress;
