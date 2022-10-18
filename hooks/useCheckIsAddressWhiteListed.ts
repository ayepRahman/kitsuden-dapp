import { useToast } from "@chakra-ui/react";
import { WHITE_LIST_ADDRESSES } from "constants/constants";
import React from "react";
import { getMerkleProof, isWhiteList } from "utils/merkle";
import { useAccount } from "wagmi";
import useGetWhitelistSale from "./useGetWhitelistSale";

const useCheckIsAddressWhiteListed = () => {
  const toast = useToast();
  const [isWhiteListed, setIsWhiteListed] = React.useState<boolean>(false);
  const { address } = useAccount();
  const { data: isWhitelistSale } = useGetWhitelistSale();

  const getProof = React.useCallback(() => {
    if (!!address) {
      const proofValue = getMerkleProof(WHITE_LIST_ADDRESSES, address);
      return proofValue;
    }

    return null;
  }, []);

  React.useEffect(() => {
    if (!!address && isWhitelistSale) {
      const verify = isWhiteList(WHITE_LIST_ADDRESSES, address);
      setIsWhiteListed(verify);

      if (!verify) {
        toast({
          status: "warning",
          description: `The address ${address} is not whitelisted!`,
          position: "top-right",
        });
      }
    }
  }, [address, isWhitelistSale]);

  return { isWhiteListed, getProof };
};

export default useCheckIsAddressWhiteListed;
