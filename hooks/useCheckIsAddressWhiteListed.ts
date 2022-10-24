import { useToast } from "@chakra-ui/react";
import { WHITE_LIST_ADDRESSES } from "constants/constants";
import React from "react";
import { getMerkleProof, isWhiteList } from "utils/merkle";
import { useAccount, useNetwork } from "wagmi";
import useGetWhitelistSale from "./useCheckMintPhase";

const useCheckIsAddressWhiteListed = () => {
  const toast = useToast();
  const { chain } = useNetwork();
  const [isWhiteListed, setIsWhiteListed] = React.useState<boolean>(false);
  const { address } = useAccount();
  const { data: isWhitelistSale } = useGetWhitelistSale();

  const getProof = React.useCallback(() => {
    if (!!address) {
      const proofValue = getMerkleProof(
        WHITE_LIST_ADDRESSES[chain?.id || 1],
        address
      );
      return proofValue;
    }

    return null;
  }, []);

  React.useEffect(() => {
    if (!!address && isWhitelistSale) {
      const verify = isWhiteList(WHITE_LIST_ADDRESSES[chain?.id || 1], address);
      setIsWhiteListed(verify);
    }
  }, [address, isWhitelistSale]);

  return { isWhiteListed, getProof };
};

export default useCheckIsAddressWhiteListed;
