import { Box, Text, useDisclosure } from "@chakra-ui/react";
import Button from "components/Button";
import MintSuccessModal from "containers/MintSuccessModal";
import { abi } from "contracts/abi";
import { BigNumber } from "ethers/lib/ethers";
import useCheckIsAddressWhiteListed from "hooks/useCheckIsAddressWhiteListed";
import useCheckMintPhase from "hooks/useCheckMintPhase";
import useGetContractAddress from "hooks/useGetContractAddress";
import useGetMintAvailable from "hooks/useGetMintAvailable";
import { useEffect, useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

export interface WhiteListMintButtonProps {
  count: number;
  price: BigNumber;
}

const WhiteListMintButton: React.FC<WhiteListMintButtonProps> = ({
  count,
  price,
}) => {
  const [mintSuccessProps, setMintSuccessProps] = useState<{
    contractAddress: string;
    quantity: number;
    txHash: string;
  } | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isWhiteListed, getProof } = useCheckIsAddressWhiteListed();
  const { whiteListMintLimit } = useGetMintAvailable();

  const { contractAddress } = useGetContractAddress();
  const { data: mintPhaseData } = useCheckMintPhase();
  const proof = getProof() as `0x${string}`[];

  useEffect(() => {
    if (!isOpen) {
      setMintSuccessProps(null);
    }
  }, [isOpen]);

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "whiteListMint",
    args: [BigNumber.from(count), proof],
    overrides: {
      value: price,
    },
    enabled: isWhiteListed,
  });

  const { write, isLoading } = useContractWrite({
    ...config,
    onSuccess(data) {
      // TODO: test white list mint again
      console.log("DATA", { data });
      onOpen();
      setMintSuccessProps({
        contractAddress,
        txHash: data?.hash,
        quantity: count,
      });
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
          {whiteListMintLimit === 0 ? (
            <Text>You've have minted out!</Text>
          ) : (
            <>
              <Text>CONTINUE</Text>
              <Text>(White List Mint)</Text>
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

export default WhiteListMintButton;
