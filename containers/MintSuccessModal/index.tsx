import { CloseIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { SOCIAL_LINKS } from "@constants/constants";
import Button from "components/Button";
import Icon from "components/Icon";
import Image from "next/image";
import React from "react";
import { useNetwork } from "wagmi";
import { MintSuccessModalProps } from "./interfaces";
import { KitsudenModalContent, ModalImageWrapper } from "./styled";

const MintSuccessModal: React.FC<MintSuccessModalProps> = ({
  isOpen,
  onClose,
  contractAddress,
  quantity = 0,
  txHash,
}) => {
  const { chain } = useNetwork();

  const osLink = React.useMemo(() => {
    // TODO: update opensea url
    if (chain?.id === 1) {
      return SOCIAL_LINKS.opensea;
    }

    return `https://testnets.opensea.io/collection/kitsudenfoxfone-v10`;
  }, [chain, chain?.id, contractAddress]);

  const esLink = React.useMemo(() => {
    if (chain?.id === 1) {
      return `https://etherscan.io/tx/${txHash}`;
    }

    return `https://goerli.etherscan.io/tx/${txHash}`;
  }, [chain, chain?.id, txHash]);

  const generateTwitterLink = () => {
    // Successfully minted my unrevealed @KitsudenNFT Foxfone! This will sure to help me uncover the hidden village! Hey, extra hands never hurt, Help us on the search by minting your own! https://www.kitsuden.com/mint-foxfone #Kitsuden

    const text =
      "Successfully minted my unrevealed @KitsudenNFT Foxfone! This will sure to help me uncover the hidden village! Hey, extra hands never hurt, Help us on the search by minting your own!";
    const url = "https://www.kitsuden.com";
    const hashtages = "Kitsuden,NFT";

    return `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${hashtages}`;
  };

  return (
    <Modal trapFocus={false} isCentered isOpen={isOpen} onClose={() => {}}>
      <ModalOverlay />
      <KitsudenModalContent>
        <ModalBody>
          <CloseIcon
            cursor="pointer"
            fontSize={24}
            position="absolute"
            top={{
              base: "2rem",
              md: "3rem",
            }}
            right={{
              base: "2rem",
              md: "3rem",
            }}
            onClick={onClose}
          />
          <Heading
            fontSize={["38px", "60px"]}
            lineHeight={["38px", "60px"]}
            fontWeight={400}
          >
            ADVENTURE AWAITS!
          </Heading>
          <Text fontWeight={500} fontSize={["12px", "1rem"]} mt="1rem">
            YOU HAVE SUCCESSFULLY MINTED
          </Text>

          <ModalImageWrapper>
            <Image
              alt="kitsuden-prereveal"
              priority
              src={"/img/kitsuden-prereveal.gif"}
              height="190px"
              width="190px"
            />
          </ModalImageWrapper>

          <Text fontWeight={500} fontSize={["12px", "1rem"]} mb="1rem">
            <b>{quantity}x</b> UNREVEALED FOXFONE NFTs
          </Text>

          <Text fontWeight={500} fontSize={["12px", "1rem"]}>
            VIEW YOUR TRANSACTION ON
          </Text>

          <Flex justifyContent="center" gap="1rem" my="1rem">
            <Icon
              cursor="pointer"
              height="1.5rem"
              width="1.5rem"
              name="opensea"
              onClick={() => window.open(osLink)}
            />
            <Icon
              cursor="pointer"
              height="1.5rem"
              width="1.5rem"
              name="etherscan"
              onClick={() => window.open(esLink)}
            />
          </Flex>

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
