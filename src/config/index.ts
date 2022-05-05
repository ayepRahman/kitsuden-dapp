export const ALCHEMY_API_ID = process.env.REACT_APP_ALCHEMY_API_ID;
export const ALCHEMY_API_URL = `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_ID}`;
export const GANACHE_TEST_URL = "HTTP://127.0.0.1:7545";
export const CONTRACT_ADDRESS: { [key: number]: string } = {
  1: "",
  1337: "0x467D5d3603b33C590A4e395457E0F80F8d9A962C",
};
