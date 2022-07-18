import * as ethers from "ethers";
import { useNetwork, useContractRead } from "wagmi";
import { CONTRACT_ADDRESS } from "constants/constants";
import FoxfoneContract from "artifacts/contracts/KitsudenFoxfone.sol/KitsudenFoxfone.json";
import useGetPublicSale from "./useGetPublicSale";
import useGetWhitelistSale from "./useGetWhitelistSale";
import useGetContractAddress from "./useGetContractAddress";

// TODO: to add
const useGetMintRate = () => {
  const { data: isPublicSale } = useGetPublicSale();
  const { data: isWhitelistSale } = useGetWhitelistSale();
  const { contractAddress } = useGetContractAddress();

  const mintRateRes = useContractRead(
    {
      addressOrName: contractAddress,
      contractInterface: FoxfoneContract.abi,
    },
    "mintRate",
    {
      onError: (error) => {
        console.log("error", error.message);
      },
      enabled: !!contractAddress,
    }
  );

  const whitelistMintRateRes = useContractRead(
    {
      addressOrName: contractAddress,
      contractInterface: FoxfoneContract.abi,
    },
    "whitelistMintRate",
    {
      onError: (error) => {
        console.log("error", error.message);
      },
      enabled: !!contractAddress,
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
