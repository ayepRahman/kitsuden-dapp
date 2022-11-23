import dotenv from "dotenv";

import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import { HardhatUserConfig } from "hardhat/config";
import "solidity-coverage";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

const GOERLI_URL = process.env.GOERLI_URL || "";
const MAINNET_URL = process.env.MAINNET_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const REPORT_GAS = process.env.REPORT_GAS;
const CMC_API_KEY = process.env.CMC_API_KEY;

console.log({
  GOERLI_URL,
  PRIVATE_KEY,
  ETHERSCAN_API_KEY,
  REPORT_GAS,
  CMC_API_KEY,
});

const config: HardhatUserConfig = {
  solidity: "0.8.13",
  networks: {
    goerli: {
      url: GOERLI_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    mainnet: {
      url: MAINNET_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: REPORT_GAS !== undefined,
    currency: "USD",
    coinmarketcap: CMC_API_KEY,
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "../artifacts",
  },
};

export default config;
