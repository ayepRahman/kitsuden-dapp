import { WHITE_LIST_ADDRESSES } from "constants/constants";
import React from "react";
import { getMerkleProof, isWhiteList } from "utils/merkle";
import { useAccount, useNetwork } from "wagmi";

const useCheckIsAddressWhiteListed = () => {
  const { chain } = useNetwork();
  const [isWhiteListed, setIsWhiteListed] = React.useState<boolean>(false);
  const { address } = useAccount();

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
    if (!!address) {
      const verify = isWhiteList(WHITE_LIST_ADDRESSES[chain?.id || 1], address);
      setIsWhiteListed(verify);
    }
  }, [address]);

  return { isWhiteListed, getProof };
};

export default useCheckIsAddressWhiteListed;
