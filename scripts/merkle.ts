import { generateMerkle, getMerkleProof, isWhiteList } from "../utils/merkle";
import { WHITE_LIST_ADDRESSES } from "../src/constants/constants";

console.log(generateMerkle(WHITE_LIST_ADDRESSES));
