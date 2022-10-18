import FoxfoneContract from "artifacts/contracts/KitsudenFoxfone.sol/KitsudenFoxfone.json";
import * as ethers from "ethers";
import { useAccount, useContractRead } from "wagmi";
import useGetContractAddress from "./useGetContractAddress";

const useGetMintAvailable = () => {
  const { address } = useAccount();
  const { contractAddress } = useGetContractAddress();

  const res = useContractRead({
    address: contractAddress,
    abi: FoxfoneContract.abi,
    functionName: "useAddress",
    args: [address],
  });
  const res2 = useContractRead({
    address: contractAddress,
    abi: FoxfoneContract.abi,
    functionName: "maxMints",
  });

  console.log("useGetMintAvailable: res", res?.data, res2?.data);
  console.log("useGetMintAvailable: res2", res2?.data);

  return {
    ...res,
    mintLimit:
      ethers.BigNumber.from(res2?.data || 0).toNumber() -
      ethers.BigNumber.from(res?.data || 0).toNumber(),
  };
};

export default useGetMintAvailable;
