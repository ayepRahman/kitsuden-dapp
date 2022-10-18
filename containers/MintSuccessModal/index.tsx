import React from "react";
import {
  Modal,
  ModalBody,
  ModalOverlay,
  Heading,
  Text,
  Box,
  Flex,
  useMediaQuery,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import FoxfoneLogo from "public/img/foxfone_logo.svg";
import OpenseaIcon from "public/img/opensea.svg";
import EtherscanIcon from "public/img/etherscan.svg";
import TwitterIcon from "public/img/twitter.svg";
import SocialLink from "components/SocialLink";
import Button from "components/Button";
import { useNetwork } from "wagmi";
import { KitsudenModalContent } from "./styled";
import { MintSuccessModalProps } from "./interfaces";
import Icon from "components/Icon";

const MintSuccessModal: React.FC<MintSuccessModalProps> = ({
  isOpen,
  onClose,
  contractAddress,
  tokenId,
  quantity = 5,
  txHash,
}) => {
  const { chain } = useNetwork();
  const [isMobile] = useMediaQuery("(max-width: 767.98px)");

  console.log({
    contractAddress,
    tokenId,
    quantity,
    txHash,
  });

  const osLink = React.useMemo(() => {
    if (chain?.id === 1) {
      return `https://opensea.io/opensea/need-to-update`;
    }

    return `https://testnets.opensea.io/collection/kitsuden-foxfone-v2`;
  }, [chain, chain?.id, contractAddress, tokenId]);

  const esLink = React.useMemo(() => {
    if (chain?.id === 1) {
      return `https://etherscan.io/tx/${txHash}`;
    }

    return `https://rinkeby.etherscan.io/tx/${txHash}`;
  }, [chain, chain?.id, txHash]);

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

          <Box
            mt="2rem"
            display="flex"
            width="100%"
            gap="1rem"
            justifyContent="center"
            alignItems="center"
          >
            {Array.from({ length: quantity }, (_, i) => {
              return <Icon name="foxfoneLogo" key={i} />;
            })}
          </Box>

          <Text fontWeight={500} fontSize="1rem">
            {quantity}x FOXFONE NFTs
          </Text>

          <Text>VIEW YOUR TRANSACTION ON</Text>

          <Flex justifyContent="center" gap="1rem">
            <Icon name="opensea" onClick={() => window.open(osLink)} />
            <Icon name="etherscan" onClick={() => window.open(esLink)} />
          </Flex>

          <Text mt="1rem">LEAVE A PARTING NOTE TO YOUR FRIENDS...</Text>

          <Button
            mt="1rem"
            width="fit-content"
            mx="auto"
            onClick={() => window.open(generateTwitterLink())}
          >
            <Icon name="twitter" mr="0.5rem" />
            SHARE ON TWITTER
          </Button>
        </ModalBody>
      </KitsudenModalContent>
    </Modal>
  );
};

export default MintSuccessModal;
