// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

const KITSUDEN = "KitsudenFoxfone";

async function main() {
  console.log(`deploying on TESTNET ${KITSUDEN} smart contract.......`);

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

// function saveFrontendFiles(token: any) {
//   const fs = require("fs");
//   const contractsDir = path.join(__dirname, "..", "abi");

//   if (!fs.existsSync(contractsDir)) {
//     fs.mkdirSync(contractsDir);
//   }

//   fs.writeFileSync(
//     path.join(contractsDir, "contract-address.json"),
//     JSON.stringify({ Token: token.address }, undefined, 2)
//   );

//   const ContractArtifacts = artifacts.readArtifactSync(KITSUDEN);

//   const abiTs = `export const abi = ${JSON.stringify(
//     ContractArtifacts.abi,
//     null,
//     2
//   )} as const`;

//   fs.writeFileSync(path.join(contractsDir, "abi.ts"), abiTs);
// }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
