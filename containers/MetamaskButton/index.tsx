import React from "react";
import { ButtonProps, useToast } from "@chakra-ui/react";
import { useConnect, useDisconnect, useProvider } from "wagmi";
import metamaskImg from "public/img/metamask.png";
import Button from "components/Button";
import Image from "components/Image";
import useIsMounted from "hooks/useIsMounted";

const MetamaskButton: React.FC<ButtonProps> = ({ ...props }) => {
  const isMounted = useIsMounted();
  const toast = useToast();
  const { disconnect } = useDisconnect();
  const { connect, isConnected, connectors, isConnecting } = useConnect({
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

  const metamaskConnector = connectors[0];

  return (
    <Button
      size="sm"
      isLoading={isMounted && isConnecting}
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
      {isMounted ? (
        <>
          {isConnected ? (
            <span>Connected</span>
          ) : (
            <>
              <Image src={metamaskImg.src} height="16px" width="16px" />
              <span>
                {!isConnected && !metamaskConnector?.ready
                  ? "Install Metamask"
                  : "Connect"}
              </span>
            </>
          )}
        </>
      ) : (
        <span>Connect</span>
      )}
    </Button>
  );
};

export default MetamaskButton;
