import { WHITE_LIST_ADDRESSES } from "../constants/constants";
import { generateMerkle } from "../utils/merkle";

console.log("TESTNET MERKLE ROOT", generateMerkle(WHITE_LIST_ADDRESSES[5]));
