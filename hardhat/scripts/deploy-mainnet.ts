// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

const KITSUDEN = "KitsudenFoxfone";

async function main() {
  console.log(`deploying on MAINNET ${KITSUDEN} smart contract.......`);

  const [owner] = await ethers.getSigners();
  const feeData = await ethers.provider.getFeeData();

  console.log("FEE", feeData);

  const contractFactory = await ethers.getContractFactory(KITSUDEN);
  const contract = await contractFactory.deploy();

  await contract.deployed();

  console.log(`${KITSUDEN} deployed to:`, contract.address);
  console.log(`${KITSUDEN} deployed by:`, owner.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
