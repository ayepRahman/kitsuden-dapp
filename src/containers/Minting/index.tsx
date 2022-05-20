import React from "react";
import { useAccount, useConnect, useNetwork, useProvider } from "wagmi";
import { Box, Flex, Heading, Link, Text, useToast } from "@chakra-ui/react";
import MetamaskButton from "containers/MetamaskButton";
import Button from "components/Button";
import useGetPublicSale from "hooks/useGetPublicSale";
import useGetWhitelistSale from "hooks/useGetWhitelistSale";
import useGetMintAvailable from "hooks/useGetMintAvailable";
import useGetMaxSupply from "hooks/useGetMaxSupply";
import useGetTotalSupply from "hooks/useGetTotalSupply";
import useGetMintRate from "hooks/useGetMintRate";
import ButtonCount from "components/ButtonCount";
import * as ethers from "ethers";
import useMint from "hooks/useMint";

const Minting = () => {
  const toast = useToast();
  const provider = useProvider();
  const { activeChain, switchNetwork } = useNetwork();
  const { isConnected } = useConnect();
  const { data } = useAccount();
  const { maxSupply } = useGetMaxSupply();
  const { totalSupply } = useGetTotalSupply();
  const { data: isPublicSale } = useGetPublicSale();
  const { data: isWhitelistSale } = useGetWhitelistSale();
  const { mintLimit } = useGetMintAvailable();
  const { currentMintRateEth, currentMintRateWei } = useGetMintRate();
  const { write, isLoading: isMinting } = useMint();
  const [selected, setSelected] = React.useState<number | null>(null);

  const isLive = !!isPublicSale || !!isWhitelistSale;
  // @desc - value to be pass when mint
  const totalMintPriceInWei =
    (selected &&
      currentMintRateWei &&
      ethers.BigNumber.from(currentMintRateWei).mul(selected)) ||
    ethers.BigNumber.from(0);
  const totalMintPriceText = ethers.utils.formatEther(totalMintPriceInWei);

  React.useEffect(() => {
    if (activeChain?.id !== 1) {
      toast({
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
        render: (props) => {
          console.log("toast props", props);

          return (
            <Box
              color="white"
              p={3}
              bg="brand.200"
              border="1px solid"
              borderColor="brand.200"
              borderRadius="4px"
            >
              Please switch to{" "}
              <Link textDecor="underline" onClick={() => switchNetwork?.(1)}>
                mainnet
              </Link>{" "}
              , currently connected to {activeChain?.name}
            </Box>
          );
        },
      });
    }
  }, [activeChain]);

  const handleMint = async () => {
    if (!isLive) {
      toast({
        status: "error",
        description: "Minting is not live!",
        position: "top-right",
      });
    }

    if (isWhitelistSale) {
      // call white list mint
    }

    if (isPublicSale && selected && totalMintPriceInWei) {
      console.log("calling public mint");
      const gasPrice = await provider.getGasPrice();

      console.log("gasPrice", ethers.utils.formatEther(gasPrice));
      console.log("totalMintPriceInWei", totalMintPriceInWei);
      console.log("totalMintPriceText", totalMintPriceText);

      // call public mint
      write({
        args: [selected, { value: totalMintPriceInWei }],
      });
    }
  };

  return (
    <Box color="white">
      <Flex fontSize="22px" fontWeight={600}>
        <Text color="brand.200">{totalSupply}</Text>&nbsp;/&nbsp;
        <Text>{maxSupply} FOXFONEX REMAINING</Text>
      </Flex>
      {isLive ? (
        <>
          <Heading fontSize={84} lineHeight="84px">
            HOW MANY FOXFONES
          </Heading>
          <Heading fontSize={84} lineHeight="84px" textAlign="right">
            ARE YOU TAKING?
          </Heading>
        </>
      ) : (
        <Heading fontSize={84} lineHeight="84px">
          MINTING NOT LIVE
        </Heading>
      )}
      <Flex
        mt="3rem"
        alignItems="center"
        width="100%"
        justifyContent="space-between"
      >
        {Array.from({ length: 5 }, (_, i) => {
          const counter = i + 1;
          return (
            <ButtonCount
              active={selected === counter}
              onClick={() => setSelected(counter)}
              disabled={counter > mintLimit}
            >
              {counter}
            </ButtonCount>
          );
        })}
      </Flex>

      <Flex mt="1rem">
        <Text fontWeight={600}>NOTE:</Text>
        &nbsp;
        <Text>There is a maximum of 2 Foxfones per wallet for whitelist</Text>
      </Flex>

      <Box
        mt="2rem"
        borderRadius="4px"
        bgColor="rgba(0,0,0,0.7)"
        width="100%"
        p="2rem"
      >
        <Flex justifyContent="space-between">
          <Box>
            <Text>PRICE</Text>
            <Text fontSize={32} fontWeight={700}>
              {currentMintRateEth} ETH
            </Text>
          </Box>
          <Box>
            <Text>FOXFONES</Text>
            <Text fontSize={32} fontWeight={700}>
              {selected ? `${selected}x` : "0x"}
            </Text>
          </Box>
          <Box>
            <Text>TOTAL</Text>
            <Text fontSize={32} fontWeight={700}>
              {totalMintPriceText ? `${totalMintPriceText} ETH` : "0 ETH"}
            </Text>
          </Box>
        </Flex>

        {!isConnected ? (
          <MetamaskButton size="lg" mt="2rem" />
        ) : (
          <Flex mt="2rem" gap="2rem">
            <Box>
              <Text fontWeight={700}>CONNECTED TO</Text>
              <Text>{data?.address}</Text>
            </Box>

            <Button
              disabled={!selected || !isLive}
              isLoading={isMinting}
              onClick={() => handleMint()}
              isFullWidth
              py="1rem"
            >
              <Box>
                {!isLive ? (
                  <Text>MINTING NOT LIVE</Text>
                ) : !selected && isLive ? (
                  <Text>PLEASE SELECT MIN 1</Text>
                ) : (
                  <>
                    <Text>CONTINUE</Text>
                    <Text fontSize={12}>(MINT)</Text>
                  </>
                )}
              </Box>
            </Button>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default Minting;
