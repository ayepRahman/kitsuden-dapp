export interface MintSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  contractAddress?: string;
  tokenId?: number;
  quantity?: number;
  txHash?: string;
}
