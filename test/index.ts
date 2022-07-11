/**
 * https://docs.openzeppelin.com/test-helpers/0.5/
 */

import { expect } from "chai";
import { WHITE_LIST_ADDRESSES } from "../constants/constants";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { getMerkleProof, generateMerkle } from "../utils/merkle";

describe("KitsudenFoxfone", () => {
  // We define a fixture to reuse the same setup in every test. We use
  // loadFixture to run this setup once, snapshot that state, and reset Hardhat
  // Network to that snapshopt in every test.
  async function deployContractFixture() {
    // Get the ContractFactory and Signers here.
    const KitsudenFoxfone = await ethers.getContractFactory("KitsudenFoxfone");
    const [owner, addr1, addr2] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // its deployed() method, which happens onces its transaction has been
    // mined.
    const contract = await KitsudenFoxfone.deploy();
    const provider = contract.provider;

    await contract.deployed();

    // Fixtures can return anything you consider useful for your tests
    return {
      KitsudenFoxfone,
      provider,
      contract,
      owner,
      addr1,
      addr2,
    };
  }

  it("should deployed", async () => {
    const { contract } = await loadFixture(deployContractFixture);
    expect(contract).not.equal("");
  });

  // publicMint test

  it("publicMint should fail when is not publicSale", async () => {
    const { contract } = await loadFixture(deployContractFixture);
    const quantity = 1;
    const publicSale = await contract.publicSale();

    expect(publicSale).to.equal(false);

    await expect(contract.mint(quantity)).to.be.revertedWithCustomError(
      contract,
      "PublicSaleNotLive"
    );
  });

  it("publicMint should fail when quantity is greater than maxMints", async () => {
    const { contract } = await loadFixture(deployContractFixture);
    const quantity = 10;

    await contract.togglePublicSale();
    const publicSale = await contract.publicSale();

    expect(publicSale).to.equal(true);

    await expect(contract.mint(quantity)).to.be.revertedWithCustomError(
      contract,
      "ExceededLimit"
    );
  });

  it("publicMint should fail when quantity set is more than max supply ", async () => {
    const { contract } = await loadFixture(deployContractFixture);
    const quantity = 6665; // quantity more than set maxSupploy

    await contract.togglePublicSale();
    const publicSale = await contract.publicSale();
    const mintRate = await contract.mintRate();
    const price = mintRate.mul(quantity); // price in wei
    const msg = { value: price };

    expect(publicSale).to.equal(true);

    await contract.setMaxMints(9999999);

    await contract.mint(quantity, msg);

    await expect(contract.mint(quantity, msg)).to.be.revertedWithCustomError(
      contract,
      "NotEnoughTokensLeft"
    );
  });

  it("publicMint should fail when msg value is not equal to minRate * quantity ", async () => {
    const { contract } = await loadFixture(deployContractFixture);
    const quantity = 2;
    const minRate = 0.07;
    let wei = ethers.utils.parseEther(`${minRate}`);

    await contract.togglePublicSale();
    const publicSale = await contract.publicSale();
    expect(publicSale).to.equal(true);

    await expect(contract.mint(quantity)).to.be.revertedWithCustomError(
      contract,
      "WrongEther"
    );
  });

  it("publicMint should be call successfull", async () => {
    const { contract, provider } = await loadFixture(deployContractFixture);
    const quantity = 2;
    const minRate = await contract.mintRate();
    const totalEthInWei = minRate.mul(2);

    const msg = { value: totalEthInWei };

    await contract.togglePublicSale();
    const publicSale = await contract.publicSale();
    expect(publicSale).to.equal(true);

    await contract.mint(quantity, msg);

    const totalSupply = await contract.totalSupply();

    expect(totalSupply.toNumber()).to.equal(quantity);

    const balanceInWei = await provider.getBalance(contract.address);

    expect(balanceInWei).to.equal(totalEthInWei);
  });

  it("whiteListMint should fail when is not live", async () => {
    const { contract, owner } = await loadFixture(deployContractFixture);

    const quantity = 10;
    const merkle = generateMerkle([owner.address]);

    const hash = `${merkle?.merkleRootHash}`;

    await contract.setMerkleRoot(hash);
    const proof = getMerkleProof(WHITE_LIST_ADDRESSES, owner.address);

    await expect(
      contract.whiteListMint(quantity, proof)
    ).to.be.revertedWithCustomError(contract, "WhitelistNotActive");
  });

  it("whiteListMint should fail when invalida merkle proof ", async () => {
    const { contract, addr1 } = await loadFixture(deployContractFixture);

    const quantity = 2;
    const merkle = generateMerkle([addr1.address]);
    const hash = `${merkle?.merkleRootHash}`;
    const whitelistMintRate = await contract.whitelistMintRate();
    const totalEth = whitelistMintRate.mul(quantity);
    const msg = { value: totalEth };

    await contract.setMerkleRoot(hash);
    const proof = getMerkleProof(WHITE_LIST_ADDRESSES, addr1.address);
    await contract.toggleWhitelistSale();

    await expect(
      contract.whiteListMint(quantity, proof, msg)
    ).to.be.revertedWithCustomError(contract, "InvalidMerkle");
  });

  it("whiteListMint should fail when quantity is greater than whiteListMaxMints", async () => {
    const { contract, owner } = await loadFixture(deployContractFixture);

    const quantity = 10;
    const merkle = generateMerkle([owner.address]);
    const hash = `${merkle?.merkleRootHash}`;

    await contract.setMerkleRoot(hash);
    const proof = getMerkleProof(WHITE_LIST_ADDRESSES, owner.address);

    await contract.toggleWhitelistSale();

    await expect(
      contract.whiteListMint(quantity, proof)
    ).to.be.revertedWithCustomError(contract, "ExceededLimit");
  });

  it("whiteListMint should fail when quantity and msg value does not match ", async () => {
    const { contract, owner } = await loadFixture(deployContractFixture);
    const quantity = 2;
    const merkle = generateMerkle([owner.address]);
    const hash = `${merkle?.merkleRootHash}`;
    const whitelistMintRate = await contract.whitelistMintRate();
    const totalEth = whitelistMintRate.mul(3);
    const msg = { value: totalEth };

    await contract.setMerkleRoot(hash);
    const proof = getMerkleProof(WHITE_LIST_ADDRESSES, owner.address);

    await contract.toggleWhitelistSale();

    await expect(
      contract.whiteListMint(quantity, proof)
    ).to.be.revertedWithCustomError(contract, "WrongEther");
  });

  it("whiteListMint should fail when whitelist is used", async () => {
    const { contract, owner } = await loadFixture(deployContractFixture);
    const quantity = 2;
    const merkle = generateMerkle([owner.address]);
    const hash = `${merkle?.merkleRootHash}`;
    const whitelistMintRate = await contract.whitelistMintRate();
    const totalEth = whitelistMintRate.mul(quantity);
    const msg = { value: totalEth };

    await contract.setMerkleRoot(hash);
    const proof = getMerkleProof(WHITE_LIST_ADDRESSES, owner.address);
    await contract.toggleWhitelistSale();

    await contract.whiteListMint(quantity, proof, msg);

    await expect(
      contract.whiteListMint(quantity, proof, msg)
    ).to.be.revertedWithCustomError(contract, "WhitelistUsed");
  });

  it("whiteListMint should fail when maxSupply is MAX ", async () => {
    const { contract, owner } = await loadFixture(deployContractFixture);

    const quantity = 6665;
    const merkle = generateMerkle([owner.address]);
    const hash = `${merkle?.merkleRootHash}`;
    const whitelistMintRate = await contract.whitelistMintRate();
    const totalEth = whitelistMintRate.mul(quantity);
    const msg = { value: totalEth };

    await contract.setWhiteListMaxMints(9999999);

    await contract.setMerkleRoot(hash);
    const proof = getMerkleProof(WHITE_LIST_ADDRESSES, owner.address);
    await contract.toggleWhitelistSale();

    await contract.whiteListMint(quantity, proof, msg);

    await expect(
      contract.whiteListMint(quantity, proof, msg)
    ).to.be.revertedWithCustomError(contract, "NotEnoughTokensLeft");
  });

  it("whiteListMint should succeed ", async () => {
    const { contract, owner } = await loadFixture(deployContractFixture);

    const quantity = 2;
    const merkle = generateMerkle([owner.address]);
    const hash = `${merkle?.merkleRootHash}`;
    const whitelistMintRate = await contract.whitelistMintRate();
    const totalEth = whitelistMintRate.mul(quantity);
    const msg = { value: totalEth };

    await contract.setMerkleRoot(hash);
    const proof = getMerkleProof(WHITE_LIST_ADDRESSES, owner.address);
    await contract.toggleWhitelistSale();

    await contract.whiteListMint(quantity, proof, msg);

    const totalSupply = await contract.totalSupply();
    const count = await contract.whiteListUsedAddresses(owner.address);

    expect(totalSupply.toNumber()).to.equal(quantity);
    expect(count).to.equal(quantity);
  });

  it("should get default hiddenTokenUri when is not revealed", async () => {
    const { contract, owner } = await loadFixture(deployContractFixture);

    const quantity = 2;
    const merkle = generateMerkle([owner.address]);
    const hash = `${merkle?.merkleRootHash}`;
    const whitelistMintRate = await contract.whitelistMintRate();
    const totalEth = whitelistMintRate.mul(quantity);
    const msg = { value: totalEth };

    await contract.setMerkleRoot(hash);
    const proof = getMerkleProof(WHITE_LIST_ADDRESSES, owner.address);
    await contract.toggleWhitelistSale();

    await contract.whiteListMint(quantity, proof, msg);

    const totalSupply = await contract.totalSupply();
    const count = await contract.whiteListUsedAddresses(owner.address);

    expect(totalSupply.toNumber()).to.equal(quantity);
    expect(count).to.equal(quantity);

    const tokenUri = await contract.tokenURI(1);

    expect(tokenUri).to.equal("");
  });

  it("should get updated hiddenTokenUri when is not revealed", async () => {
    const mockHiddenUri = "ipfs://mockhiddenuri/";
    const mockTokenId = 0;
    const { contract, owner } = await loadFixture(deployContractFixture);

    const quantity = 2;
    const merkle = generateMerkle([owner.address]);
    const hash = `${merkle?.merkleRootHash}`;
    const whitelistMintRate = await contract.whitelistMintRate();
    const totalEth = whitelistMintRate.mul(quantity);
    const msg = { value: totalEth };

    await contract.setMerkleRoot(hash);
    const proof = getMerkleProof(WHITE_LIST_ADDRESSES, owner.address);
    await contract.toggleWhitelistSale();

    await contract.whiteListMint(quantity, proof, msg);

    const totalSupply = await contract.totalSupply();
    const count = await contract.whiteListUsedAddresses(owner.address);

    expect(totalSupply.toNumber()).to.equal(quantity);
    expect(count).to.equal(quantity);

    await contract.setBaseHiddenUri(mockHiddenUri);
    const baseExt = await contract.baseExtension();

    const tokenUri = await contract.tokenURI(mockTokenId);

    expect(tokenUri).to.equal(`${mockHiddenUri}${mockTokenId}${baseExt}`);
  });

  it("should get default revealed token uri", async () => {
    const mockHiddenUri = "ipfs://revealed/";
    const mockTokenId = 0;
    const { contract, owner } = await loadFixture(deployContractFixture);

    const quantity = 2;
    const merkle = generateMerkle([owner.address]);
    const hash = `${merkle?.merkleRootHash}`;
    const whitelistMintRate = await contract.whitelistMintRate();
    const totalEth = whitelistMintRate.mul(quantity);
    const msg = { value: totalEth };

    await contract.setMerkleRoot(hash);
    const proof = getMerkleProof(WHITE_LIST_ADDRESSES, owner.address);
    await contract.toggleWhitelistSale();

    await contract.whiteListMint(quantity, proof, msg);

    const totalSupply = await contract.totalSupply();
    const count = await contract.whiteListUsedAddresses(owner.address);

    expect(totalSupply.toNumber()).to.equal(quantity);
    expect(count).to.equal(quantity);

    await contract.setBaseURI(mockHiddenUri);
    await contract.toggleReveal();
    const baseExt = await contract.baseExtension();
    const tokenUri = await contract.tokenURI(mockTokenId);

    expect(tokenUri).to.equal(`${mockHiddenUri}${mockTokenId}${baseExt}`);
  });

  it("withdraw should fail if not owner ", async () => {
    const { contract, owner, addr1 } = await loadFixture(deployContractFixture);

    const quantity = 2;
    const merkle = generateMerkle([owner.address]);
    const hash = `${merkle?.merkleRootHash}`;
    const whitelistMintRate = await contract.whitelistMintRate();
    const totalEth = whitelistMintRate.mul(quantity);
    const msg = { value: totalEth };

    await contract.setMerkleRoot(hash);
    const proof = getMerkleProof(WHITE_LIST_ADDRESSES, owner.address);
    await contract.toggleWhitelistSale();

    await contract.whiteListMint(quantity, proof, msg);

    const totalSupply = await contract.totalSupply();
    const count = await contract.whiteListUsedAddresses(owner.address);

    expect(totalSupply.toNumber()).to.equal(quantity);
    expect(count).to.equal(quantity);

    await expect(contract.connect(addr1).withdraw()).to.be.revertedWith(
      "Ownable: caller is not the owner"
    );
  });

  it("withdraw should succeed if owner ", async () => {
    const { contract, owner } = await loadFixture(deployContractFixture);

    const quantity = 2;
    const merkle = generateMerkle([owner.address]);
    const hash = `${merkle?.merkleRootHash}`;
    const whitelistMintRate = await contract.whitelistMintRate();
    const totalEth = whitelistMintRate.mul(quantity);
    const msg = { value: totalEth };

    await contract.setMerkleRoot(hash);
    const proof = getMerkleProof(WHITE_LIST_ADDRESSES, owner.address);
    await contract.toggleWhitelistSale();

    await contract.whiteListMint(quantity, proof, msg);

    const totalSupply = await contract.totalSupply();
    const count = await contract.whiteListUsedAddresses(owner.address);

    expect(totalSupply.toNumber()).to.equal(quantity);
    expect(count).to.equal(quantity);

    const previousOwnerBalance = await owner.getBalance();

    await contract.withdraw();

    const currentOwnerBalance = await owner.getBalance();

    expect(currentOwnerBalance).to.gt(previousOwnerBalance);
  });

  it("should be able to setMintRate", async () => {
    const mockMintRate = "999.99";
    const mockMintRateInWei = ethers.utils.parseEther(mockMintRate);
    const { contract } = await loadFixture(deployContractFixture);

    let minRate = await contract.mintRate();
    let balanceInEth = ethers.utils.formatEther(minRate);

    expect(balanceInEth).to.equal("0.07777");

    await contract.setMintRate(mockMintRateInWei);

    minRate = await contract.mintRate();
    balanceInEth = ethers.utils.formatEther(minRate);

    expect(balanceInEth).to.equal(mockMintRate);
  });

  it("should be able to setWhitelistMintRate", async () => {
    const mockMintRate = "999.99";
    const mockMintRateInWei = ethers.utils.parseEther(mockMintRate);
    const { contract } = await loadFixture(deployContractFixture);

    let minRate = await contract.whitelistMintRate();
    let balanceInEth = ethers.utils.formatEther(minRate);

    expect(balanceInEth).to.equal("0.05555");

    await contract.setWhitelistMintRate(mockMintRateInWei);

    minRate = await contract.whitelistMintRate();
    balanceInEth = ethers.utils.formatEther(minRate);

    expect(balanceInEth).to.equal(mockMintRate);
  });

  it("should be able to setMaxMints", async () => {
    const mockMaxMints = 123123;
    const { contract } = await loadFixture(deployContractFixture);

    let maxMints = await contract.maxMints();

    expect(maxMints).to.equal(5);

    await contract.setMaxMints(mockMaxMints);

    maxMints = await contract.maxMints();

    expect(maxMints).to.equal(mockMaxMints);
  });

  it("should be able to setWhiteListMaxMints", async () => {
    const mockMaxMints = 123123;
    const { contract } = await loadFixture(deployContractFixture);

    let maxMints = await contract.maxMints();

    expect(maxMints).to.equal(5);

    await contract.setMaxMints(mockMaxMints);

    maxMints = await contract.maxMints();

    expect(maxMints).to.equal(mockMaxMints);
  });

  it("mintAvailable should return correct value when is not live", async () => {
    const { contract } = await loadFixture(deployContractFixture);
    const count = await contract.mintAvailable();

    expect(count).to.equal(0);
  });

  it("mintAvailable should return correct value for publicSale", async () => {
    const { contract, provider } = await loadFixture(deployContractFixture);

    const quantity = 2;
    const minRate = await contract.mintRate();
    const totalEth = minRate.mul(2);

    const msg = { value: totalEth };

    await contract.togglePublicSale();
    const publicSale = await contract.publicSale();
    expect(publicSale).to.equal(true);

    await contract.mint(quantity, msg);

    const totalSupply = await contract.totalSupply();
    expect(totalSupply.toNumber()).to.equal(quantity);

    const balanceInWei = await provider.getBalance(contract.address);

    expect(balanceInWei).to.equal(totalEth);

    const count = await contract.mintAvailable();

    expect(count.toNumber()).to.equal(3);
  });

  it("mintAvailable should return correct value for whitelistSale", async () => {
    const { contract, provider, owner } = await loadFixture(
      deployContractFixture
    );

    const quantity = 2;
    const whitelistMintRate = await contract.whitelistMintRate();
    const totalEth = whitelistMintRate.mul(2);

    const msg = { value: totalEth };

    await contract.toggleWhitelistSale();
    const whiteListSale = await contract.whitelistSale();
    expect(whiteListSale).to.equal(true);

    const merkle = generateMerkle([owner.address]);
    const hash = `${merkle?.merkleRootHash}`;

    await contract.setMerkleRoot(hash);
    const proof = getMerkleProof(WHITE_LIST_ADDRESSES, owner.address);

    await contract.whiteListMint(quantity, proof, msg);

    const totalSupply = await contract.totalSupply();
    expect(totalSupply.toNumber()).to.equal(quantity);

    const balanceInWei = await provider.getBalance(contract.address);

    expect(balanceInWei).to.equal(totalEth);

    const count = await contract.mintAvailable();

    expect(count.toNumber()).to.equal(0);
  });
});
