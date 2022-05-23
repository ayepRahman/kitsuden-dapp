import {
  generateMerkle,
  getMerkleProof,
  isWhiteList,
} from "../src/utils/merkle";
import { WHITE_LIST_ADDRESSES } from "../src/constants/constants";

console.log(generateMerkle(WHITE_LIST_ADDRESSES));
