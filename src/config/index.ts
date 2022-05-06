export const ALCHEMY_API_ID = process.env.REACT_APP_ALCHEMY_API_ID;
export const ALCHEMY_API_URL = `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_ID}`;
export const GANACHE_TEST_URL = "HTTP://127.0.0.1:7545";
export const CONTRACT_ADDRESS: { [key: number]: string } = {
  1: "0x636b3bfB1c585C47f7B04df8727E3596897F6Ce0", // todo change when ready
  3: "0x636b3bfB1c585C47f7B04df8727E3596897F6Ce0",
  4: "0x636b3bfB1c585C47f7B04df8727E3596897F6Ce0",
  1337: "0x636b3bfB1c585C47f7B04df8727E3596897F6Ce0",
};
