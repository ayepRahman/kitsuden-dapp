import { Box, Text, useDisclosure, useToast } from "@chakra-ui/react";
import Button from "components/Button";
import MintSuccessModal from "containers/MintSuccessModal";
import { abi } from "contracts/abi";
import { BigNumber } from "ethers/lib/ethers";
import useCheckMintPhase from "hooks/useCheckMintPhase";
import useGetContractAddress from "hooks/useGetContractAddress";
import useGetMintAvailable from "hooks/useGetMintAvailable";
import { useEffect, useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

export interface MintButtonProps {
  count: number;
  price: BigNumber;
}

const MintButton: React.FC<MintButtonProps> = ({ count, price }) => {
  const toast = useToast();
  const [mintSuccessProps, setMintSuccessProps] = useState<{
    contractAddress: string;
    quantity: number;
    txHash: string;
  } | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { contractAddress } = useGetContractAddress();
  const { data: mintPhaseData } = useCheckMintPhase();
  const { mintLimit, refetchMintLimit } = useGetMintAvailable();

  useEffect(() => {
    if (!isOpen) {
      setMintSuccessProps(null);
    }
  }, [isOpen]);

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "mint",
    args: [BigNumber.from(count)],
    overrides: {
      value: price,
    },
    enabled: count > 0 && !!price,
    onSettled(data, error: any) {
      if (error) {
        toast({
          title: "Error",
          description: error?.reason,
          status: "error",
          isClosable: true,
          duration: 5000,
          position: "top",
          containerStyle: {
            background: "red",
            borderRadius: "8px",
          },
        });
      }
    },
  });

  const { write, isLoading } = useContractWrite({
    ...config,
    onSuccess(data) {
      onOpen();
      setMintSuccessProps({
        contractAddress,
        txHash: data?.hash,
        quantity: count,
      });
      refetchMintLimit();
    },
  });

  const mintPhase = Number(mintPhaseData || 0);

  const isLive = !!mintPhase;

  if (!isLive) return null;

  return (
    <>
      <Button
        w="100%"
        py="1.5rem"
        disabled={isLoading || !write}
        isLoading={isLoading}
        onClick={() => write?.()}
      >
        <Box>
          {mintLimit === 0 ? (
            <Text>You've have minted out!</Text>
          ) : (
            <>
              <Text>(Mint)</Text>
              <Text>CONTINUE</Text>
            </>
          )}
        </Box>
      </Button>
      <MintSuccessModal
        isOpen={isOpen}
        onClose={onClose}
        contractAddress={mintSuccessProps?.contractAddress}
        quantity={mintSuccessProps?.quantity}
        txHash={mintSuccessProps?.txHash}
      />
    </>
  );
};

export default MintButton;
