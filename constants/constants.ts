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
  // 5: "0x920A09067360E1132a6a2A8ad6A9d2968c023177", // goerli
  // 5: "0xD3efC7336E63F3B1E99bd40Cb30E8F66554e57a0", // goerli
  // 5: "0x1c56a059802F6ac544989e3CaFe07623da54FfB1", // goerli
  // 5: "0x260BAab44c789Efb5A255B1432AB1fEC8fDEB65E", // goerli
  5: "0x20703586F654CAf50bfa70F905Db2fed15BCA78F", // goerli
};

const PROD_WHITE_LIST_ADDRESSES = [
  "0x0Aa32Ace6A4e447310cc145dda5D984A6B5733ea",
  "0x1C0C70453C5eD96c7C4EC2EA98c3A99Fc1Dd27EF",
];
const TESTNET_WHITE_LIST_ADDRESSES = [
  "0x6d8610a39D293E9397103f95a3E7562b8d1BE186", // adri
  "0x11a54D0B10A5755bb732c3448222d450a0a34945", // adri
  "0x7B0Dd34B8e081Bd74177A80fabFc3bED66cf7578", // gefi
  "0xA756ADb1C3dbB4c0ac61cF01A2881E87F633DE81", // arif/amy
  "0x0Aa32Ace6A4e447310cc145dda5D984A6B5733ea", // deployer
  "0xEeD462B644BdDCb20aCa6c0fDaEB07bF9433ef9A", // amymochi
  "0x1C0C70453C5eD96c7C4EC2EA98c3A99Fc1Dd27EF",
  "0x020f02f24d7ba4bF69Ac2e21E32776a438Ef3e04",
];

export const WHITE_LIST_ADDRESSES: { [key: number]: string[] } = {
  1: PROD_WHITE_LIST_ADDRESSES,
  5: TESTNET_WHITE_LIST_ADDRESSES,
};

export const MINT_PHASE = {
  WHITE_LIST: 1,
  PUBLIC: 2,
};

const uri = {
  preReveal:
    "https://kitsuden.infura-ipfs.io/ipfs/QmT8WwUuAzpeLqixJDfvVHx9KrxFo8wbG811JZBjkfr6Cg/", // PRE REVEAL
  testReveal:
    "https://kitsuden.infura-ipfs.io/ipfs/QmdXXS57RnDsyyDEMAPaF8rnKAZAkbRVBYwRUzzXSztEj6/", // TEST
  reveal:
    "https://kitsuden.infura-ipfs.io/ipfs/QmTJvaYiKvsv9jprmfb9Hw93FoyBVdmdKRmzVcB5T7Ck38/", // PRODUCTION
};
