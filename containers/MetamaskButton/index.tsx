import { ButtonProps, useToast } from "@chakra-ui/react";
import Button from "components/Button";
import Image from "components/Image";
import metamaskImg from "public/img/metamask.png";
import React, { useMemo } from "react";
import { useConnect, useDisconnect } from "wagmi";

const MetamaskButton: React.FC<ButtonProps> = ({ ...props }) => {
  // const isMounted = useIsMounted();
  const toast = useToast();
  const { disconnect } = useDisconnect();
  const {
    connect,
    isConnected: _isConnected,
    connectors,
    isConnecting,
  } = useConnect({
    onError(error) {
      console.log("Error", error);
      toast({
        title: `error ${error.message}`,
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    },
  });

  const isConnected = useMemo(() => {
    return _isConnected;
  }, [_isConnected]);

  const metamaskConnector = connectors[0];

  return (
    <Button
      size="sm"
      isLoading={isConnecting}
      onClick={() => {
        if (isConnected) {
          disconnect();
          return;
        }

        if (!metamaskConnector.ready) {
          window.open("https://metamask.io/download/");
          return;
        }
        connect(metamaskConnector);
      }}
      w="100%"
      colorScheme="orange"
      display="flex"
      alignItems="center"
      gap="0.5rem"
      {...props}
    >
      {isConnected ? (
        <span>Connected</span>
      ) : (
        <>
          <Image
            src={metamaskImg.src}
            height="16px"
            width="16px"
            placeholder="empty"
          />
          <span>
            {!isConnected && !metamaskConnector?.ready
              ? "Install Metamask"
              : "Connect"}
          </span>
        </>
      )}
    </Button>
  );
};

export default MetamaskButton;
