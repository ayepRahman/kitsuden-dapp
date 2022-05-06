import { useContract, useNetwork } from "wagmi";
import OnlyAyepABI from "contractsABI/OnlyAyep.json";
import { CONTRACT_ADDRESS } from "config";

export const useOnlyAyepContract = () => {
  const { activeChain, pendingChainId } = useNetwork();
  const contractAddress = CONTRACT_ADDRESS[activeChain?.id || 1];

  console.log("ID", activeChain);
  console.log("pendingChainId ID", pendingChainId);
  console.log("contractAddress", contractAddress);

  // const contract = useContract({
  //   addressOrName: CONTRACT_ADDRESS[activeChain?.id || 1],
  //   contractInterface: OnlyAyepABI.abi,
  // });

  // const getTotalSupply = async () => {
  //   const total = await contract.totalSupply();

  //   return total;
  // };

  // return { contract, getTotalSupply };
};
