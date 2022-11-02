import { WHITE_LIST_ADDRESSES } from "../constants/constants";
import { generateMerkle } from "../utils/merkle";

// console.log("PROD MERKLE ROOT", generateMerkle(WHITE_LIST_ADDRESSES[1]));
console.log("TESTNET MERKLE ROOT", generateMerkle(WHITE_LIST_ADDRESSES[5]));
