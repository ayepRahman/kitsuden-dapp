// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

const KITSUDEN = "KitsudenFoxfone";

async function main() {
  console.log(`deploying on MAINNET ${KITSUDEN} smart contract.......`);

  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const contractFactory = await ethers.getContractFactory(KITSUDEN);
  const contract = await contractFactory.deploy();

  await contract.deployed();

  console.log(`${KITSUDEN} deployed to:`, contract.address);
  // saveFrontendFiles(contract);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
