import React from "react";
import styled from "@emotion/styled";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Heading,
  Text,
  Box,
  Flex,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import modalBg from "assets/img/modal_bg.svg";
import { ReactComponent as FoxfoneLogo } from "assets/img/foxfone_logo.svg";
import { ReactComponent as OpenseaIcon } from "assets/img/opensea.svg";
import { ReactComponent as EtherscanIcon } from "assets/img/etherscan.svg";
import { ReactComponent as TwitterIcon } from "assets/img/twitter.svg";
import SocialLink from "components/SocialLink";
import Button from "components/Button";

const CustomModalContent = styled(ModalContent)`
  position: relative;
  height: 600px;
  width: 600px;
  max-width: 600px;
  padding: 3rem 4rem 4rem;
  background-color: transparent;
  background-image: url(${modalBg});
  background-size: 100% 100%;
  -o-background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  background-size: cover;
  box-shadow: none;
  text-align: center;
  color: #200000;
`;

interface MintSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MintSuccessModal: React.FC<MintSuccessModalProps> = ({
  isOpen,
  onClose,
}) => {
  const quantity = 1;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <CustomModalContent>
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
            <SocialLink>
              <OpenseaIcon />
            </SocialLink>
            <SocialLink>
              <EtherscanIcon />
            </SocialLink>
          </Flex>

          <Text mt="1rem">LEAVE A PARTING NOTE TO YOUR FRIENDS...</Text>

          <Button mt="1rem" width="fit-content" mx="auto">
            <SocialLink mr="0.5rem">
              <TwitterIcon />
            </SocialLink>
            SHARE ON TWITTER
          </Button>
        </ModalBody>
      </CustomModalContent>
    </Modal>
  );
};

export default MintSuccessModal;
