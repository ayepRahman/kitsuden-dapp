export const ALCHEMY_API_ID = process.env.REACT_APP_ALCHEMY_API_ID;
export const ALCHEMY_API_URL = `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_ID}`;
export const GANACHE_TEST_URL = "HTTP://127.0.0.1:7545";
export const CONTRACT_ADDRESS: { [key: number]: string } = {
  1: "0x636b3bfB1c585C47f7B04df8727E3596897F6Ce0", // todo change when ready
  3: "0xf38F6275d5B1f3b3D1DA7476f2855947B5585a71",
  4: "0xf38F6275d5B1f3b3D1DA7476f2855947B5585a71", // https://rinkeby.etherscan.io/address/0xf38f6275d5b1f3b3d1da7476f2855947b5585a71#code
  1337: "0xf38F6275d5B1f3b3D1DA7476f2855947B5585a71",
};
