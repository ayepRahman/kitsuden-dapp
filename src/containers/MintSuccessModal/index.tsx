import React from "react";
import {
  Modal,
  ModalBody,
  ModalOverlay,
  Heading,
  Text,
  Box,
  Flex,
} from "@chakra-ui/react";
import { TwitterShareButton } from "react-share";
import { CloseIcon } from "@chakra-ui/icons";
import { ReactComponent as FoxfoneLogo } from "assets/img/foxfone_logo.svg";
import { ReactComponent as OpenseaIcon } from "assets/img/opensea.svg";
import { ReactComponent as EtherscanIcon } from "assets/img/etherscan.svg";
import { ReactComponent as TwitterIcon } from "assets/img/twitter.svg";
import SocialLink from "components/SocialLink";
import Button from "components/Button";
import { useNetwork } from "wagmi";
import { KitsudenModalContent } from "./styled";
import { MintSuccessModalProps } from "./interfaces";

const MintSuccessModal: React.FC<MintSuccessModalProps> = ({
  isOpen,
  onClose,
  contractAddress,
  tokenId,
  quantity = 0,
  txHash,
}) => {
  const { activeChain } = useNetwork();

  console.log({
    contractAddress,
    tokenId,
    quantity,
    txHash,
  });

  const osLink = React.useMemo(() => {
    if (activeChain?.id === 1) {
      return `https://opensea.io/assets/ethereum/${contractAddress}/${tokenId}`;
    }

    return `https://testnets.opensea.io/assets/rinkeby/${contractAddress}/${tokenId}`;
  }, [activeChain, activeChain?.id, contractAddress, tokenId]);

  const esLink = React.useMemo(() => {
    if (activeChain?.id === 1) {
      return `https://etherscan.io/tx/${txHash}`;
    }

    return `https://rinkeby.etherscan.io/tx/${txHash}`;
  }, [activeChain, activeChain?.id, txHash]);

  const generateTwitterLink = () => {
    const text =
      "Minted my Foxfone via @KitsudenNFT #Kitsuden #NFT https://www.kitsuden.com/";

    return `https://twitter.com/intent/tweet?text=${text}`;
  };

  return (
    <Modal trapFocus={false} isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <KitsudenModalContent>
        <ModalBody
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <CloseIcon
            cursor="pointer"
            fontSize={24}
            position="absolute"
            top="2.5rem"
            right="2.5rem"
            onClick={onClose}
          />
          <Heading fontSize={60} fontWeight={400}>
            ADVENTURE AWAITS!
          </Heading>
          <Text fontWeight={500} fontSize="1rem">
            YOU SUCCESSFULLY HAVE MINTED
          </Text>

          <Box mt="2rem" display="flex" width="100%" justifyContent="center">
            <FoxfoneLogo />
          </Box>

          <Text fontWeight={500} fontSize="1rem">
            {quantity}x FOXFONE NFTs
          </Text>

          <Text>VIEW YOUR TRANSACTION ON</Text>

          <Flex justifyContent="center" gap="1rem">
            <SocialLink onClick={() => window.open(osLink)}>
              <OpenseaIcon />
            </SocialLink>
            <SocialLink onClick={() => window.open(esLink)}>
              <EtherscanIcon />
            </SocialLink>
          </Flex>

          <Text mt="1rem">LEAVE A PARTING NOTE TO YOUR FRIENDS...</Text>

          <Button
            mt="1rem"
            width="fit-content"
            mx="auto"
            onClick={() => window.open(generateTwitterLink())}
          >
            <SocialLink mr="0.5rem">
              <TwitterIcon />
            </SocialLink>
            SHARE ON TWITTER
          </Button>
        </ModalBody>
      </KitsudenModalContent>
    </Modal>
  );
};

export default MintSuccessModal;