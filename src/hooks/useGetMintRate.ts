import {
  useContract,
  useConnect,
  useProvider,
  useNetwork,
  useContractRead,
} from "wagmi";
import * as ethers from "ethers";
import { CONTRACT_ADDRESS } from "constants/constants";
import foxfoneContract from "artifacts/contracts/KitsudenFoxfone.sol/KitsudenFoxfone.json";

const useGetMintRate = () => {
  const { activeChain } = useNetwork();
  const currentChainId = activeChain?.id || 1;

  const mintRateRes = useContractRead(
    {
      addressOrName: CONTRACT_ADDRESS[currentChainId],
      contractInterface: foxfoneContract.abi,
    },
    "mintRate",
    {
      onError: (error) => {
        console.log("error", error.message);
      },
    }
  );

  const whitelistMintRateRes = useContractRead(
    {
      addressOrName: CONTRACT_ADDRESS[currentChainId],
      contractInterface: foxfoneContract.abi,
    },
    "whitelistMintRate",
    {
      onError: (error) => {
        console.log("error", error.message);
      },
    }
  );

  const mintRateWei = mintRateRes?.data ?? 0;
  const mintRateEth = mintRateRes?.data
    ? ethers.utils.formatEther(mintRateRes.data)
    : 0;
  const whitelistMintRateWei = whitelistMintRateRes?.data ?? 0;
  const whitelistMintRateEth = whitelistMintRateRes?.data
    ? Number(ethers.utils.formatEther(whitelistMintRateRes.data))
    : 0;

  return {
    isLoading: mintRateRes.isLoading || whitelistMintRateRes.isLoading,
    currentMintRate: mintRateWei,
    mintRateEth,
    whitelistMintRateWei,
    whitelistMintRateEth,
  };
};

export default useGetMintRate;
