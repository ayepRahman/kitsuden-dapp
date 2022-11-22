import { Box, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";

const NetworkDetectorBanner = () => {
  const [isShowWarning, setIsShowWarning] = useState<boolean>(false);
  const { switchNetwork } = useSwitchNetwork();
  const { isConnected } = useAccount();
  const { chain } = useNetwork();

  useEffect(() => {
    if (chain?.id !== 1 && isConnected) {
      setIsShowWarning(true);
    } else {
      setIsShowWarning(false);
    }
  }, [chain, chain?.id]);

  return (
    <div>
      {" "}
      {isShowWarning && (
        <Box
          position="relative"
          textAlign="center"
          color="white"
          p={3}
          bg="brand.200"
          zIndex={1000}
        >
          Please switch to{" "}
          <Link textDecor="underline" onClick={() => switchNetwork?.(1)}>
            mainnet
          </Link>{" "}
          , currently connected to {chain?.name}
        </Box>
      )}
    </div>
  );
};

export default NetworkDetectorBanner;
