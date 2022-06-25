import React from "react";
import { ButtonProps, useToast } from "@chakra-ui/react";
import { useConnect, useDisconnect } from "wagmi";
import metamaskImg from "public/img/metamask.png";
import Button from "components/Button";
import Image from "components/Image";

const MetamaskButton: React.FC<ButtonProps> = ({ ...props }) => {
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
      {...props}
    >
      {isConnected ? (
        "Connected"
      ) : (
        <>
          <Image src={metamaskImg} height={3} width={3} mr={2} />
          <span>
            {!metamaskConnector.ready ? "Install Metamask" : "Connect"}
          </span>
        </>
      )}
    </Button>
  );
};

export default MetamaskButton;
