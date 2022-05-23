import React from "react";
import { useAccount } from "wagmi";
import { WHITE_LIST_ADDRESSES } from "constants/constants";
import { isWhiteList, getMerkleProof } from "utils/merkle";
import useGetWhitelistSale from "./useGetWhitelistSale";
import { useToast } from "@chakra-ui/react";

const useCheckIsAddressWhiteListed = () => {
  const toast = useToast();
  const [isWhiteListed, setIsWhiteListed] = React.useState<boolean>(false);
  const { data: account } = useAccount();
  const { data: isWhitelistSale } = useGetWhitelistSale();

  const getProof = React.useCallback(() => {
    if (!!account?.address) {
      const proofValue = getMerkleProof(WHITE_LIST_ADDRESSES, account?.address);
      return proofValue;
    }

    return null;
  }, []);

  React.useEffect(() => {
    if (!!account?.address && isWhitelistSale) {
      const verify = isWhiteList(WHITE_LIST_ADDRESSES, account?.address);
      setIsWhiteListed(verify);

      if (!verify) {
        toast({
          status: "warning",
          description: `The address ${account?.address} is not whitelisted!`,
          position: "top-right",
        });
      }
    }
  }, [account?.address, isWhitelistSale]);

  return { isWhiteListed, getProof };
};

export default useCheckIsAddressWhiteListed;
