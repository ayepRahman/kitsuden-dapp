import * as ethers from "ethers";
import { useNetwork, useContractRead } from "wagmi";
import { CONTRACT_ADDRESS } from "constants/constants";
import foxfoneContract from "artifacts/contracts/KitsudenFoxfone.sol/KitsudenFoxfone.json";
import useGetPublicSale from "./useGetPublicSale";
import useGetWhitelistSale from "./useGetWhitelistSale";

const useGetMintRate = () => {
  const { activeChain } = useNetwork();
  const currentChainId = activeChain?.id || 1;
  const { data: isPublicSale } = useGetPublicSale();
  const { data: isWhitelistSale } = useGetWhitelistSale();

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
  const mintRateEth: number = mintRateRes?.data
    ? Number(ethers.utils.formatEther(mintRateRes.data))
    : 0;
  const whitelistMintRateWei = whitelistMintRateRes?.data ?? 0;
  const whitelistMintRateEth: number = whitelistMintRateRes?.data
    ? Number(ethers.utils.formatEther(whitelistMintRateRes.data))
    : 0;

  return {
    isLoading: mintRateRes.isLoading || whitelistMintRateRes.isLoading,
    currentMintRateEth: isWhitelistSale ? whitelistMintRateEth : mintRateEth,
    currentMintRateWei: isWhitelistSale ? whitelistMintRateWei : mintRateWei,
    mintRateWei,
    mintRateEth,
    whitelistMintRateWei,
    whitelistMintRateEth,
  };
};

export default useGetMintRate;
