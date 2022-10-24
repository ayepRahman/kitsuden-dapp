export interface MintSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  contractAddress?: string;
  quantity?: number;
  txHash?: string;
}
