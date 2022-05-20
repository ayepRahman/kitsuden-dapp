import { useNetwork, useContractWrite } from "wagmi";
import { CONTRACT_ADDRESS } from "constants/constants";
import foxfoneContract from "artifacts/contracts/KitsudenFoxfone.sol/KitsudenFoxfone.json";

const useMint = () => {
  const { activeChain } = useNetwork();
  const currentChainId = activeChain?.id || 1;

  const contractWrite = useContractWrite(
    {
      addressOrName: CONTRACT_ADDRESS[currentChainId],
      contractInterface: foxfoneContract.abi,
    },
    "mint"
  );

  /**
   * need to getProof for merkleProof
   */
  const whiteListMint = () => {};
};

export default useMint;
