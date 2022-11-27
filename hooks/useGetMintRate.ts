import FoxfoneContract from "artifacts/contracts/Foxfone.sol/Foxfone.json";
import { BigNumber, utils } from "ethers";
import { useContractRead } from "wagmi";
import useCheckMintPhase from "./useCheckMintPhase";
import useGetContractAddress from "./useGetContractAddress";

const useGetMintRate = () => {
  const { data: mintPhaseData } = useCheckMintPhase();
  const { contractAddress } = useGetContractAddress();

  const mintRateRes = useContractRead({
    address: contractAddress,
    abi: FoxfoneContract.abi,
    functionName: "mintRate",
    enabled: !!contractAddress,
  });

  const mintRateWei = mintRateRes?.data ?? 0;
  const mintRateEth: number = mintRateRes?.data
    ? Number(utils.formatEther(mintRateRes?.data as BigNumber))
    : 0;

  return {
    isLoading: mintRateRes.isLoading,
    currentMintRateEth: mintRateEth,
    currentMintRateWei: mintRateWei,
  };
};

export default useGetMintRate;
