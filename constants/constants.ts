export const SOCIAL_LINKS = {
  twitter: "https://twitter.com/kitsudennft",
  // discord: "https://discord.gg/XNYvaFcw",
  discord: "",
  instagram: "https://www.instagram.com/kitsudennft/",
  etherscan: "", // link to
  opensea: "", // link to
};

export const CONTRACT_ADDRESS: { [key: number]: string } = {
  1: "", // mainnet
  3: "0x7ee8e466e4B53299175e6c0E40fF3e0a588FfB61", // ropsten
  4: "0x7ee8e466e4B53299175e6c0E40fF3e0a588FfB61", // rinkeby
  5: "0x7ee8e466e4B53299175e6c0E40fF3e0a588FfB61", // goerli
  1337: "0x5fbdb2315678afecb367f032d93f642f64180aa3", // localhost
  31337: "0x5fbdb2315678afecb367f032d93f642f64180aa3", // hardhat
};

const PROD_WHITE_LIST_ADDRESSES = [
  "0x0Aa32Ace6A4e447310cc145dda5D984A6B5733ea",
];
const TESTNET_WHITE_LIST_ADDRESSES = [
  "0x6d8610a39D293E9397103f95a3E7562b8d1BE186", // adri
  "0x11a54D0B10A5755bb732c3448222d450a0a34945", // adri
  "0x7B0Dd34B8e081Bd74177A80fabFc3bED66cf7578", // gefi
  "0xA756ADb1C3dbB4c0ac61cF01A2881E87F633DE81", // amy
  "0x0Aa32Ace6A4e447310cc145dda5D984A6B5733ea", // deployer
];

export const WHITE_LIST_ADDRESSES: { [key: number]: string[] } = {
  1: PROD_WHITE_LIST_ADDRESSES,
  5: TESTNET_WHITE_LIST_ADDRESSES,
};

export const MINT_PHASE = {
  WHITE_LIST: 1,
  PUBLIC: 2,
};
