/**
 * https://medium.com/@ItsCuzzo/using-merkle-trees-for-nft-whitelists-523b58ada3f9
 */

import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { getAndConvertAddresses } from "./ethers";

const WHITE_LIST_ADDRESSES = [
  "0xA423Bb1F81568F464296050d9A3eA678aC5a2064",
  "0x6d8610a39D293E9397103f95a3E7562b8d1BE186",
  "0x11a54D0B10A5755bb732c3448222d450a0a34945",
];

// 589dafee34d035929dc11b3d90885999167e2f4f5c2211d24732af1137974b1a

const generateMerkle = (addresses: string[]) => {
  if (!addresses?.length) return null;

  //  This is to ensure the addresses is valid and injects the checksum
  const convertedAddresses = getAndConvertAddresses(addresses);

  /**
   * Create a new array of `leafNodes` by hashing all indexes of the `whitelistAddresses`
   * using `keccak256`. Then creates a Merkle Tree object using keccak256 as the algorithm.
   * The leaves, merkleTree, and rootHas are all PRE-DETERMINED prior to whitelist claim
   */
  const leafNodes = convertedAddresses.map((addr) => keccak256(addr));
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  const merkleRootHash = merkleTree.getRoot().toString("hex");
  const merkleTreeString = merkleTree.toString();

  console.log("Whitelist Merkle Tree\n", merkleTree.toString());
  console.log("Root Hash: ", merkleRootHash);

  return {
    merkleRootHash,
    merkleTreeString,
    merkleTree,
  };
};

const getMerkleProof = (walletAddress: string) => {
  const convertedAddresses = getAndConvertAddresses([walletAddress]);
  const merkle = generateMerkle(WHITE_LIST_ADDRESSES);
  const hashAddress = keccak256(convertedAddresses[0]);
  const proof = merkle?.merkleTree.getHexProof(hashAddress);
  return proof;
};

const isWhiteList = (walletAddress: string) => {
  const convertedAddresses = getAndConvertAddresses([walletAddress]);
  const merkle = generateMerkle(WHITE_LIST_ADDRESSES);
  const hashAddress = keccak256(convertedAddresses[0]);
  const proof = merkle?.merkleTree?.getHexProof(hashAddress) || [];
  const verify = merkle?.merkleTree.verify(
    proof,
    hashAddress,
    merkle?.merkleRootHash
  );

  return verify;
};

generateMerkle(WHITE_LIST_ADDRESSES);

// console.log(
//   "isWhiteList",
//   isWhiteList("0xA756ADb1C3dbB4c0ac61cF01A2881E87F633DE81")
// );

export { generateMerkle as generateMerkleRoot, getMerkleProof as getProof };
