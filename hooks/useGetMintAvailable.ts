import FoxfoneContract from "artifacts/contracts/Foxfone.sol/Foxfone.json";
import * as ethers from "ethers";
import { useAccount, useContractRead } from "wagmi";
import useGetContractAddress from "./useGetContractAddress";

const useGetMintAvailable = () => {
  const { address } = useAccount();
  const { contractAddress } = useGetContractAddress();

  const useAddressRes = useContractRead({
    address: contractAddress,
    abi: FoxfoneContract.abi,
    functionName: "usedAddresses",
    args: [address],
  });
  const whiteListUsedAddressesRes = useContractRead({
    address: contractAddress,
    abi: FoxfoneContract.abi,
    functionName: "whiteListUsedAddresses",
    args: [address],
  });
  const maxMintsRes = useContractRead({
    address: contractAddress,
    abi: FoxfoneContract.abi,
    functionName: "maxMints",
  });
  const whiteListMaxMintsRes = useContractRead({
    address: contractAddress,
    abi: FoxfoneContract.abi,
    functionName: "whiteListMaxMints",
  });

  return {
    refetchMintLimit: () => {
      useAddressRes.refetch();
    },
    refetchWhiteListMintLimit: () => {
      whiteListUsedAddressesRes.refetch();
    },
    mintLimit:
      ethers.BigNumber.from(maxMintsRes?.data || 0).toNumber() -
      ethers.BigNumber.from(useAddressRes?.data || 0).toNumber(),
    whiteListMintLimit:
      ethers.BigNumber.from(whiteListMaxMintsRes?.data || 0).toNumber() -
      ethers.BigNumber.from(whiteListUsedAddressesRes?.data || 0).toNumber(),
  };
};

export default useGetMintAvailable;
