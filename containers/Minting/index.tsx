import { Box, Flex, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import Button from "components/Button";
import ButtonCount from "components/ButtonCount";
import { MINT_PHASE } from "constants/constants";
import MetamaskButton from "containers/MetamaskButton";
import MintButton from "containers/MintButton";
import WhiteListMintButton from "containers/WhiteListMintButton";
import * as ethers from "ethers";
import useCheckMintPhase from "hooks/useCheckMintPhase";
import useGetMaxSupply from "hooks/useGetMaxSupply";
import useGetMintAvailable from "hooks/useGetMintAvailable";
import useGetMintRate from "hooks/useGetMintRate";
import useGetTotalSupply from "hooks/useGetTotalSupply";
import React from "react";
import { truncateAddress } from "utils/address";
import { useAccount, useNetwork } from "wagmi";

const Minting = () => {
  const [isMobile] = useMediaQuery("(max-width: 767.98px)");
  const { chain } = useNetwork();
  const [selected, setSelected] = React.useState<number | null>(null);
  const { address, isConnected } = useAccount();
  const { data: maxSupplyBn } = useGetMaxSupply();
  const { totalSupply } = useGetTotalSupply();
  const { data: mintPhaseData } = useCheckMintPhase();
  const { mintLimit, whiteListMintLimit } = useGetMintAvailable();
  const { currentMintRateEth, currentMintRateWei } = useGetMintRate();

  const mintPhase = Number(mintPhaseData || 0);
  const maxSupply = ethers.BigNumber.from(maxSupplyBn || 0).toNumber() || 0;
  const isWhitelistSale = mintPhase === MINT_PHASE.WHITE_LIST;
  const isPublicSale = mintPhase === MINT_PHASE.PUBLIC;

  // @desc - value to be pass when mint
  const totalMintPriceInWei =
    (selected &&
      currentMintRateWei &&
      ethers.BigNumber.from(currentMintRateWei).mul(selected)) ||
    ethers.BigNumber.from(0);
  const totalMintPriceText = ethers.utils.formatEther(totalMintPriceInWei);
  const isLive = !!mintPhase;

  console.log("Minting Component >>>>", {
    maxSupply,
    address,
    mintLimit,
    mintPhase,
    isWhitelistSale,

    selected,
  });

  return (
    <Box color="white" width="100%">
      <Flex fontSize={isMobile ? "1rem" : "22px"} fontWeight={600} mb="1rem">
        <Text color="brand.200">{totalSupply}</Text>&nbsp;/&nbsp;
        <Text>{`${maxSupply} FOXFONEX REMAINING`}</Text>
      </Flex>

      {/* TODO: need to update logic here */}
      {isLive && !whiteListMintLimit && isWhitelistSale && (
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
      )}

      {isLive && !mintLimit && isPublicSale && (
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
      )}

      {isLive && !!whiteListMintLimit && isWhitelistSale && (
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
      )}
      {isLive && !!mintLimit && isPublicSale && (
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
      )}

      {!isLive && (
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
          const disabled = !isLive
            ? true
            : isWhitelistSale
            ? counter > whiteListMintLimit
            : counter > mintLimit;

          return (
            <ButtonCount
              key={i}
              active={selected ? selected === counter : false}
              onClick={() => setSelected(counter)}
              disabled={disabled}
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

      <Box mt="2rem" borderRadius="4px" bgColor="rgba(0,0,0,0.7)" p="2rem">
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
                {truncateAddress(address || "")}
              </Text>
            </Box>
            {!isLive && (
              <Button disabled={!selected} w="100%" py="1rem">
                <Text>MINTING NOT LIVE</Text>
              </Button>
            )}
            {isLive && !selected && (
              <Button disabled={!selected} w="100%" py="1rem">
                {isWhitelistSale && whiteListMintLimit === 0 && (
                  <Text>You've have minted out!</Text>
                )}
                {isPublicSale && mintLimit === 0 && (
                  <Text>You've have minted out!</Text>
                )}

                {isWhitelistSale && whiteListMintLimit > 0 && (
                  <Text>SELECT MIN 1</Text>
                )}
                {isPublicSale && mintLimit > 0 && <Text>SELECT MIN 1</Text>}
              </Button>
            )}
            {/* white list mint button */}
            {isLive &&
              !!selected &&
              isWhitelistSale &&
              whiteListMintLimit > 0 && (
                <WhiteListMintButton
                  count={selected}
                  price={totalMintPriceInWei}
                />
              )}
            {/* mint button */}
            {isLive && !!selected && isPublicSale && mintLimit > 0 && (
              <MintButton count={selected} price={totalMintPriceInWei} />
            )}
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default Minting;
