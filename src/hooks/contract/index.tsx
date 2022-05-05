import { useContract, useNetwork } from "wagmi";
import OnlyAyepABI from "contractsABI/OnlyAyep.json";
import { CONTRACT_ADDRESS } from "config";

export const useOnlyAyepContract = () => {
  const { activeChain } = useNetwork();
  const contractAddress = CONTRACT_ADDRESS[activeChain?.id || 1];

  console.log("AC", activeChain);
  console.log("contractAddress", contractAddress);

  const contract = useContract({
    addressOrName: CONTRACT_ADDRESS[activeChain?.id || 1],
    contractInterface: OnlyAyepABI.abi,
  });

  const totalSupply = () => {};
};
