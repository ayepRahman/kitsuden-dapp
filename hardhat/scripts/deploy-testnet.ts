// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

const KITSUDEN = "KitsudenFoxfone";

async function main() {
  console.log(`deploying on TESTNET ${KITSUDEN} smart contract.......`);

  const [owner] = await ethers.getSigners();
  const feeData = await ethers.provider.getFeeData();

  console.log("FEE", feeData);

  // {
  //   lastBaseFeePerGas: BigNumber { value: "71577905947" },
  //   maxFeePerGas: BigNumber { value: "144655811894" },
  //   maxPriorityFeePerGas: BigNumber { value: "1500000000" },
  //   gasPrice: BigNumber { value: "72367167985" }
  // }

  // feeData?.gasPrice;

  const contractFactory = await ethers.getContractFactory(KITSUDEN);
  const contract = await contractFactory.deploy({});

  await contract.deployed();

  console.log(`${KITSUDEN} deployed to:`, contract.address);
  console.log(`${KITSUDEN} deployed by:`, owner.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
