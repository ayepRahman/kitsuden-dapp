import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Button from "components/Button";
import ButtonCount from "components/ButtonCount";
import { MINT_PHASE } from "constants/constants";
import MetamaskButton from "containers/MetamaskButton";
import MintButton from "containers/MintButton";
import * as ethers from "ethers";
import useCheckMintPhase from "hooks/useCheckMintPhase";
import useGetMaxSupply from "hooks/useGetMaxSupply";
import useGetMintRate from "hooks/useGetMintRate";
import useGetTotalSupply from "hooks/useGetTotalSupply";
import React, { useEffect } from "react";
import { truncateAddress } from "utils/address";
import { useAccount } from "wagmi";

const Minting = () => {
  const [selected, setSelected] = React.useState<number>(1);
  const { address, isConnected } = useAccount();
  const { data: _maxSupply } = useGetMaxSupply();
  const { totalSupply, refetch: refetchTotalSupply } = useGetTotalSupply();
  const { data: mintPhaseData } = useCheckMintPhase();
  const { currentMintRateEth, currentMintRateWei } = useGetMintRate();

  const mintPhase = Number(mintPhaseData || 0);
  const maxSupply = ethers.BigNumber.from(_maxSupply || 0).toNumber() || 0;
  const isPublicSale = mintPhase === MINT_PHASE.PUBLIC;
  const isFullyMintedOut = totalSupply >= maxSupply;

  // @desc - value to be pass when mint
  const totalMintPriceInWei =
    (selected &&
      currentMintRateWei &&
      ethers.BigNumber.from(currentMintRateWei).mul(selected)) ||
    ethers.BigNumber.from(0);
  const totalMintPriceText = ethers.utils.formatEther(totalMintPriceInWei);
  const isLive = !!mintPhase;

  useEffect(() => {
    if (isFullyMintedOut) {
      setSelected(0);
    }
  }, [isFullyMintedOut]);

  return (
    <Box color="white" width="100%">
      <Flex fontSize={["1rem", "22px"]} fontWeight={600} mb="1rem">
        <Text color="brand.200">{totalSupply}</Text>&nbsp;/&nbsp;
        <Text>{`${maxSupply} FOXFONE MINTED`}</Text>
      </Flex>

      {isFullyMintedOut && (
        <>
          <Heading fontSize={[42, 84]} lineHeight={["42px", "84px"]}>
            ALL OUR FOXFONES
          </Heading>
          <Heading
            fontSize={[42, 84]}
            lineHeight={["42px", "84px]"]}
            textAlign="right"
          >
            HAS BEEN MINTED
          </Heading>
        </>
      )}

      {isLive && isPublicSale && !isFullyMintedOut && (
        <>
          <Heading fontSize={[42, 84]} lineHeight={["42px", "84px"]}>
            HOW MANY FOXFONES
          </Heading>
          <Heading
            fontSize={[42, 84]}
            lineHeight={["42px", "84px"]}
            textAlign="right"
          >
            ARE YOU TAKING?
          </Heading>
        </>
      )}

      {!isLive && !isFullyMintedOut && (
        <Heading fontSize={[42, 84]} lineHeight={["42px", "84px"]}>
          MINTING NOT LIVE
        </Heading>
      )}

      {isLive && (
        <Flex
          mt="3rem"
          alignItems="center"
          width="100%"
          gap="0.5rem"
          justifyContent="space-between"
          flexWrap={["wrap", "nowrap"]}
        >
          {Array.from({ length: 10 }, (_, i) => {
            const counter = i + 1;

            return (
              <ButtonCount
                key={i}
                active={selected ? selected === counter : false}
                onClick={() => setSelected(counter)}
                disabled={isFullyMintedOut}
              >
                {counter}
              </ButtonCount>
            );
          })}
        </Flex>
      )}

      <Box mt="1rem" borderRadius="4px" bgColor="rgba(0,0,0,0.7)" p="2rem">
        <Flex justifyContent="space-between" flexWrap={["wrap", "nowrap"]}>
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
          <Flex mt="2rem" gap="2rem" flexWrap={["wrap", "nowrap"]}>
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
              <Button disabled={!isLive} w="100%" py="1rem">
                <Text>MINTING NOT LIVE</Text>
              </Button>
            )}
            {isLive && !selected && (
              <Button disabled={!selected} w="100%" py="1rem">
                {isPublicSale && !isFullyMintedOut && selected <= 0 && (
                  <Text>SELECT MIN 1</Text>
                )}
                {isFullyMintedOut && <Text>MINTED OUT</Text>}
              </Button>
            )}

            {/* mint button */}
            {isLive && !!selected && isPublicSale && (
              <MintButton
                isLive={isLive}
                count={selected}
                price={totalMintPriceInWei}
              />
            )}
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default Minting;
