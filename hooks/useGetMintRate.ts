import FoxfoneContract from "artifacts/contracts/KitsudenFoxfone.sol/KitsudenFoxfone.json";
import { BigNumber, utils } from "ethers";
import { useContractRead } from "wagmi";
import useGetContractAddress from "./useGetContractAddress";
import useGetPublicSale from "./useGetPublicSale";
import useGetWhitelistSale from "./useGetWhitelistSale";

// TODO: to add
const useGetMintRate = () => {
  const { data: isPublicSale } = useGetPublicSale();
  const { data: isWhitelistSale } = useGetWhitelistSale();
  const { contractAddress } = useGetContractAddress();

  const mintRateRes = useContractRead({
    address: contractAddress,
    abi: FoxfoneContract.abi,
    functionName: "mintRate",
    enabled: !!contractAddress,
  });

  const whitelistMintRateRes = useContractRead({
    address: contractAddress,
    abi: FoxfoneContract.abi,
    functionName: "whitelistMintRate",
    enabled: !!contractAddress,
  });

  const mintRateWei = mintRateRes?.data ?? 0;
  const mintRateEth: number = mintRateRes?.data
    ? Number(utils.formatEther(mintRateRes?.data as BigNumber))
    : 0;
  const whitelistMintRateWei = whitelistMintRateRes?.data ?? 0;
  const whitelistMintRateEth: number = whitelistMintRateRes?.data
    ? Number(utils.formatEther(whitelistMintRateRes?.data as BigNumber))
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
