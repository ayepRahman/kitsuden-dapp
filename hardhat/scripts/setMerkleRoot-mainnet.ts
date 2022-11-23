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

const KITSUDEN = "KitsudenFoxfone";
const address = CONTRACT_ADDRESS[1];

async function main() {
  console.log(
    `setting merkleRoot mainnet for ${KITSUDEN} smart contract.......`
  );

  const merkle = generateMerkle(WHITE_LIST_ADDRESSES[1]);

  const contractFactory = await ethers.getContractFactory(KITSUDEN);
  const contract = contractFactory.attach(address);

  await contract.setMerkleRoot(merkle?.merkleRootHash || "");

  console.log("setMerkleRoot: success", merkle?.merkleRootHash || "");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
