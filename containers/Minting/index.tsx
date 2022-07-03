import React from "react";
import * as ethers from "ethers";
import { useAccount, useConnect, useNetwork } from "wagmi";
import {
  Box,
  Flex,
  Heading,
  Text,
  useDisclosure,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import MetamaskButton from "containers/MetamaskButton";
import Button from "components/Button";
import useGetPublicSale from "hooks/useGetPublicSale";
import useGetWhitelistSale from "hooks/useGetWhitelistSale";
import useGetMintAvailable from "hooks/useGetMintAvailable";
import useGetMaxSupply from "hooks/useGetMaxSupply";
import useGetTotalSupply from "hooks/useGetTotalSupply";
import useGetMintRate from "hooks/useGetMintRate";
import ButtonCount from "components/ButtonCount";
import useMint from "hooks/useMint";
import useCheckIsAddressWhiteListed from "hooks/useCheckIsAddressWhiteListed";
import useWhitelistMint from "hooks/useWhitelistMint";
import MintSuccessModal from "containers/MintSuccessModal";
import { CONTRACT_ADDRESS } from "constants/constants";
import { truncateAddress } from "utils/address";
import useIsMounted from "hooks/useIsMounted";

const Minting = () => {
  const isMounted = useIsMounted();
  const [isMobile] = useMediaQuery("(max-width: 767.98px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { activeChain } = useNetwork();
  const [selected, setSelected] = React.useState<number | null>(null);
  const currentChainId = activeChain?.id || 1;
  const [mintSuccessProps, setMintSuccessProps] = React.useState<{
    contractAddress?: string;
    tokenId?: number;
    quantity?: number;
    txHash?: string;
  }>({});
  const toast = useToast();
  const { isConnected } = useConnect();
  const { data: account } = useAccount();
  const { maxSupply } = useGetMaxSupply();
  const { totalSupply } = useGetTotalSupply();
  const { data: isPublicSale } = useGetPublicSale();
  const { data: isWhitelistSale } = useGetWhitelistSale();
  const { mintLimit } = useGetMintAvailable();
  const { currentMintRateEth, currentMintRateWei } = useGetMintRate();
  const { isWhiteListed } = useCheckIsAddressWhiteListed();

  console.log({
    mintLimit,
    isPublicSale,
    isWhitelistSale,
    isWhiteListed,
    selected,
    mintSuccessProps,
  });

  const { write: mint, isLoading: isMinting } = useMint({
    onSuccess: (data) => {
      setMintSuccessProps({
        contractAddress: CONTRACT_ADDRESS[currentChainId],
        tokenId: 0,
        quantity: selected || 0,
        txHash: data?.hash,
      });
      onOpen();
      setSelected(null);
    },
  });
  const { whiteListMint, isLoading: isWhiteListMinting } = useWhitelistMint({
    onSuccess: (data) => {
      setMintSuccessProps({
        contractAddress: CONTRACT_ADDRESS[currentChainId],
        tokenId: 0,
        quantity: selected || 0,
        txHash: data?.hash,
      });
      onOpen();
      setSelected(null);
    },
  });

  // @desc - value to be pass when mint
  const totalMintPriceInWei =
    (selected &&
      currentMintRateWei &&
      ethers.BigNumber.from(currentMintRateWei).mul(selected)) ||
    ethers.BigNumber.from(0);
  const totalMintPriceText = ethers.utils.formatEther(totalMintPriceInWei);
  const isLive = !!isPublicSale || !!isWhitelistSale;

  React.useEffect(() => {
    if (!isOpen) {
      setMintSuccessProps({});
    }
  }, [isOpen]);

  const handleMint = async () => {
    if (!isLive) {
      toast({
        status: "error",
        description: "Minting is not live!",
        position: "top-right",
      });
      return;
    }

    if (isWhitelistSale && isWhiteListed && selected && totalMintPriceInWei) {
      whiteListMint(selected, totalMintPriceInWei);
      return;
    }

    if (isPublicSale && selected && totalMintPriceInWei) {
      mint({
        args: [selected, { value: totalMintPriceInWei }],
      });
      return;
    }
  };

  if (!isMounted) return null;

  return (
    <Box color="white" width="100%">
      <MintSuccessModal
        isOpen={isOpen}
        onClose={onClose}
        contractAddress={mintSuccessProps?.contractAddress}
        tokenId={mintSuccessProps?.tokenId}
        quantity={mintSuccessProps?.quantity}
        txHash={mintSuccessProps?.txHash}
      />

      <Flex fontSize={isMobile ? "1rem" : "22px"} fontWeight={600} mb="1rem">
        <Text color="brand.200">{totalSupply}</Text>&nbsp;/&nbsp;
        <Text>{maxSupply} FOXFONEX REMAINING</Text>
      </Flex>
      {isLive && !mintLimit ? (
        <>
          <Heading
            fontSize={isMobile ? 42 : 84}
            lineHeight={isMobile ? "42px" : "84px"}
          >
            CONGRATZ YOU'VE
          </Heading>
          <Heading
            fontSize={isMobile ? 42 : 84}
            lineHeight={isMobile ? "42px" : "84px"}
            textAlign="right"
          >
            FULLY MINTED
          </Heading>
        </>
      ) : (
        <>
          {isLive ? (
            <>
              <Heading
                fontSize={isMobile ? 42 : 84}
                lineHeight={isMobile ? "42px" : "84px"}
              >
                HOW MANY FOXFONES
              </Heading>
              <Heading
                fontSize={isMobile ? 42 : 84}
                lineHeight={isMobile ? "42px" : "84px"}
                textAlign="right"
              >
                ARE YOU TAKING?
              </Heading>
            </>
          ) : (
            <Heading
              fontSize={isMobile ? 42 : 84}
              lineHeight={isMobile ? "42px" : "84px"}
            >
              MINTING NOT LIVE
            </Heading>
          )}
          <Flex
            mt="3rem"
            alignItems="center"
            width="100%"
            justifyContent="space-between"
            flexWrap={isMobile ? "wrap" : "nowrap"}
          >
            {Array.from({ length: 5 }, (_, i) => {
              const counter = i + 1;
              const disabled = counter > mintLimit;

              return (
                <ButtonCount
                  active={selected ? selected === counter : false}
                  onClick={() => setSelected(counter)}
                  disabled={disabled}
                >
                  {counter}
                </ButtonCount>
              );
            })}
          </Flex>
        </>
      )}

      <Flex mt="1rem">
        <Text fontWeight={600}>NOTE:</Text>
        &nbsp;
        <Text>There is a maximum of 2 Foxfones per wallet for whitelist</Text>
      </Flex>

      <Box
        mt="2rem"
        borderRadius="4px"
        bgColor="rgba(0,0,0,0.7)"
        // width="100%"
        p="2rem"
      >
        <Flex
          justifyContent="space-between"
          flexWrap={isMobile ? "wrap" : "nowrap"}
        >
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
          <Flex mt="2rem" gap="2rem" flexWrap={isMobile ? "wrap" : "nowrap"}>
            <Box w="100%">
              <Text fontWeight={700}>CONNECTED TO</Text>
              <Text
                width="full"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {isMobile
                  ? truncateAddress(account?.address || "")
                  : account?.address}
              </Text>
            </Box>

            <Button
              disabled={!selected || !isLive}
              isLoading={isMinting || isWhiteListMinting}
              onClick={() => handleMint()}
              w="100%"
              py="1rem"
            >
              <Box>
                {!isLive ? (
                  <Text>MINTING NOT LIVE</Text>
                ) : !selected && isLive && !!mintLimit ? (
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
