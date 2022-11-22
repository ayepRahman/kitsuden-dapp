import { ButtonProps } from "@chakra-ui/react";
import Button from "components/Button";
import { ConnectKitButton } from "connectkit";
import React from "react";

const MetamaskButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <ConnectKitButton.Custom>
      {({
        isConnected,
        isConnecting,
        show,
        hide,
        truncatedAddress,
        ensName,
      }) => {
        return (
          <Button
            size="sm"
            colorScheme="orange"
            display="flex"
            alignItems="center"
            gap="0.5rem"
            isLoading={isConnecting}
            onClick={show}
            {...props}
          >
            {isConnected
              ? ensName ?? truncatedAddress
              : children || "Connect Wallet"}
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default MetamaskButton;
