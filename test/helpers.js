/**
 * https://medium.com/@ItsCuzzo/using-merkle-trees-for-nft-whitelists-523b58ada3f9
 */

const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

const WHITE_LIST_ADDRESSES = [
  "0x89AaA426009fb6B04F9ADA388C864A76ec0D67f3", // first address from ganache
  "0xA423Bb1F81568F464296050d9A3eA678aC5a2064",
  "0xA756ADb1C3dbB4c0ac61cF01A2881E87F633DE81",
];

const generateMerkleRoot = () => {
  /**
   * Create a new array of `leafNodes` by hashing all indexes of the `whitelistAddresses`
   * using `keccak256`. Then creates a Merkle Tree object using keccak256 as the algorithm.
   * The leaves, merkleTree, and rootHas are all PRE-DETERMINED prior to whitelist claim
   */
  const leafNodes = WHITE_LIST_ADDRESSES.map((addr) => keccak256(addr));
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

const getMerkleProof = (walletAddress) => {
  const { merkleTree } = generateMerkleRoot(WHITE_LIST_ADDRESSES);
  const hashAddress = keccak256(walletAddress);
  const proof = merkleTree.getHexProof(hashAddress);
  return proof;
};

const isWhiteList = (walletAddress) => {
  const { merkleTree, merkleRootHash } =
    generateMerkleRoot(WHITE_LIST_ADDRESSES);
  const hashAddress = keccak256(walletAddress);
  const proof = merkleTree.getHexProof(hashAddress);
  const verify = merkleTree.verify(proof, hashAddress, merkleRootHash);

  return verify;
};

module.exports = { generateMerkleRoot, getMerkleProof, WHITE_LIST_ADDRESSES };
