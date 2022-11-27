// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import {
  CONTRACT_ADDRESS,
  WHITE_LIST_ADDRESSES,
} from "../../constants/constants";
import { generateMerkle } from "../../utils/merkle";

async function main() {
  const KITSUDEN = "Kitsuden FOXFONE";
  const address = CONTRACT_ADDRESS[5];
  console.log(
    `setting merkleRoot testnet for ${KITSUDEN} smart contract ${address}`
  );

  const merkle = generateMerkle(WHITE_LIST_ADDRESSES[5]);
  const feeData = await ethers.provider.getFeeData();

  console.log("FEED DATA", feeData);

  // lastBaseFeePerGas: BigNumber { value: "44359997533" },
  // maxFeePerGas: BigNumber { value: "90219995066" },
  // maxPriorityFeePerGas: BigNumber { value: "1500000000" },
  // gasPrice: BigNumber { value: "44459997533" }

  const contractFactory = await ethers.getContractFactory(KITSUDEN);
  const contract = contractFactory.attach(address);

  await contract.setMerkleRoot(merkle?.merkleRootHash || "", {
    maxFeePerGas: 100219995066,
    maxPriorityFeePerGas: 2500000000,
    nonce: 51,
  });

  console.log("setMerkleRoot: success", merkle?.merkleRootHash || "");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
