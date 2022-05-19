import React from "react";
import styled from "@emotion/styled";
import { useAccount, useConnect } from "wagmi";
import {
  Box,
  Button as CKButton,
  Flex,
  Heading,
  Text,
  toast,
  useToast,
} from "@chakra-ui/react";
import MetamaskButton from "containers/MetamaskButton";
import Button from "components/Button";
import useFoxfoneContract from "hooks/useFoxfoneContract";
import useGetPublicSale from "hooks/useGetPublicSale";
import useGetWhitelistSale from "hooks/useGetWhitelistSale";
import useGetMintAvailable from "hooks/useGetMintAvailable";
import useGetMaxSupply from "hooks/useGetMaxSupply";
import useGetTotalSupply from "hooks/useGetTotalSupply";
import useGetMintRate from "hooks/useGetMintRate";

const ButtonCount = styled(CKButton)<{ active?: boolean }>`
  height: 70px;
  width: 70px;
  background-color: ${(p) =>
    p.active ? p.theme.colors.brand[200] : "rgba(0, 0, 0, 0.7)"};
  font-size: 40px;
  font-weight: 700;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
`;

const Minting = () => {
  const { isConnected } = useConnect();
  const { data } = useAccount();
  const toast = useToast();
  const { maxSupply } = useGetMaxSupply();
  const { totalSupply } = useGetTotalSupply();
  const { data: isPublicSale } = useGetPublicSale();
  const { data: isWhitelistSale } = useGetWhitelistSale();
  const { mintLimit } = useGetMintAvailable();
  const {} = useGetMintRate();
  const [selected, setSelected] = React.useState<number | null>(null);
  const isLive = isPublicSale || isWhitelistSale;
  console.log({
    isPublicSale,
    isWhitelistSale,
    isLive,
    mintLimit,
    maxSupply,
    totalSupply,
  });

  // these value should be getting from the contract
  const mintPrice = 0.05555;
  // value to be used for setter contract
  const totalMintPrice = selected && mintPrice * selected;
  const totalMintPriceText = (selected && mintPrice * selected)?.toFixed(5);

  const handleMint = () => {
    if (!isLive) {
      toast({
        status: "error",
        description: "Minting is not live!",
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
              {mintPrice} ETH
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
