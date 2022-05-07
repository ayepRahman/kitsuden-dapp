import React from "react";
import {
  Box,
  Heading,
  Grid,
  Button,
  Spacer,
  Flex,
  Input,
  Code,
  Avatar,
  Image,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import {
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useEnsName,
  useNetwork,
  useProvider,
} from "wagmi";
import { generateAddress } from "utils/address";
import { useOnlyAyepContract } from "hooks/contract";
import metamaskImg from "assets/img/metamask.png";
import avatarImg from "assets/img/avatar.jpeg";
import { ethLogoUrl } from "assets/img";

export const App = () => {
  const { activeChain } = useNetwork();
  const toast = useToast();

  const { data: account } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    addressOrName: account?.address,
    enabled: !!account?.address,
    onError: (error) => {
      console.log(error);
    },
  });

  const { connect, isConnected, connectors, isConnecting, activeConnector } =
    useConnect({
      onError(error) {
        console.log("Error", error);
        toast({
          title: `error ${error.message}`,
          status: "error",
          isClosable: true,
        });
      },
    });

  console.log("activeConnector", activeConnector);
  console.log("CONNNN", connectors);
  const metamaskConnector = connectors[0];

  // useOnlyAyepContract();

  return (
    <Flex
      position="relative"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      {account?.address && (
        <Menu>
          <MenuButton position="absolute" top={2} right={2}>
            <Box
              display="flex"
              rounded="full"
              padding="0.175rem 0.75rem 0.175rem 0.175rem"
              background="teal"
              alignItems="center"
              color="white"
            >
              <Avatar mr="0.5rem" size="sm" src={avatarImg} />
              <div>
                {balance?.formatted && (
                  <Flex alignItems="center" justifyContent="center">
                    <Image src={ethLogoUrl} height={4} mr={1} />
                    <Text fontSize="xs">
                      {balance?.formatted.substring(0, 7)}
                    </Text>
                  </Flex>
                )}
                <Text fontSize="xs">
                  {generateAddress(account?.address || "")}
                </Text>
              </div>
            </Box>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => disconnect()}>Disconnect</MenuItem>
          </MenuList>
        </Menu>
      )}

      <Flex
        direction="column"
        alignItems="center"
        background="gray.100"
        p={12}
        rounded={6}
      >
        <Heading size="lg" mb={6}>
          Nft Project Name
        </Heading>

        <Input
          mb={6}
          placeholder="Quantity Max 2"
          variant="outline"
          type="number"
        />

        <Button isFullWidth colorScheme="teal">
          Mint
        </Button>
        {!isConnected && (
          <Button
            isLoading={isConnecting}
            mt={6}
            onClick={() => {
              if (!metamaskConnector.ready) {
                window.open("https://metamask.io/download/");
                return;
              }
              connect(metamaskConnector);
            }}
            isFullWidth
            colorScheme="orange"
          >
            <Image src={metamaskImg} height={6} width={6} mr={2} />
            <span>
              {!metamaskConnector.ready ? "Install Metamask" : "Metamask"}
            </span>
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default App;
