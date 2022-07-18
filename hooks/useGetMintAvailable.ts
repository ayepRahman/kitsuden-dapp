import { useContractRead, useAccount } from "wagmi";
import FoxfoneContract from "artifacts/contracts/KitsudenFoxfone.sol/KitsudenFoxfone.json";
import useGetContractAddress from "./useGetContractAddress";

const useGetMintAvailable = () => {
  const { data } = useAccount();
  const { contractAddress } = useGetContractAddress();

  const res = useContractRead(
    {
      addressOrName: contractAddress,
      contractInterface: FoxfoneContract.abi,
    },
    "mintAvailable",
    {
      overrides: { from: data?.address },
      onError: (error) => {
        console.log("error", error.message);
      },
      enabled: !!data?.address && !!contractAddress,
    }
  );

  return {
    ...res,
    mintLimit: Number(res?.data),
  };
};

export default useGetMintAvailable;
