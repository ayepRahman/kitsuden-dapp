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
  Image,
} from "@chakra-ui/react";
import { useAccount, useConnect, useEnsName, useNetwork } from "wagmi";
import { generateAddress } from "utils/address";
import metamaskImg from "assets/img/metamask.png";
import { useOnlyAyepContract } from "hooks/contract";

export const App = () => {
  const { activeChain } = useNetwork();
  const { data: account } = useAccount();

  const { connect, isConnected, connectors, isConnecting } = useConnect();

  // console.log("connectors", connectors);

  useOnlyAyepContract();

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex
        direction="column"
        alignItems="center"
        background="gray.100"
        p={12}
        rounded={6}
      >
        <Heading mb={6}>Nft Project Name</Heading>

        {account?.address && (
          <Code px="0.5rem" colorScheme="teal" mb={6} variant="solid">
            {generateAddress(account?.address || "")}
          </Code>
        )}

        <Input
          mb={6}
          placeholder="Quantity Max 2"
          variant="outline"
          type="number"
        />

        <Button isFullWidth colorScheme="teal">
          Mint
        </Button>
        {!isConnecting && !isConnected && (
          <Button
            mt={6}
            onClick={() => connect()}
            isFullWidth
            colorScheme="orange"
          >
            <Image src={metamaskImg} height={6} width={6} mr={2} />
            Metamask
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default App;
