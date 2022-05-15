/**
 * https://docs.openzeppelin.com/test-helpers/0.5/
 */

import { expect } from "chai";
import { ethers, waffle } from "hardhat";
import { getMerkleProof, generateMerkle } from "../src/utils/merkle";

describe("KitsudenFoxfone", () => {
  it("should deployed", async () => {
    const factory = await ethers.getContractFactory("KitsudenFoxfone");
    const contract = await factory.deploy();
    expect(contract).not.equal("");
  });

  // publicMint test

  it("publicMint should fail when is not publicSale", async () => {
    const factory = await ethers.getContractFactory("KitsudenFoxfone");
    const contract = await factory.deploy();
    await contract.deployed();
    const quantity = 1;
    const publicSale = await contract.publicSale();

    expect(publicSale).to.equal(false);

    await expect(contract.mint(quantity)).to.be.revertedWith(
      "PublicSaleNotLive"
    );
  });

  it("publicMint should fail when quantity is greater than maxMints", async () => {
    const factory = await ethers.getContractFactory("KitsudenFoxfone");
    const contract = await factory.deploy();
    await contract.deployed();
    const quantity = 10;

    await contract.togglePublicSale();
    const publicSale = await contract.publicSale();

    expect(publicSale).to.equal(true);

    await expect(contract.mint(quantity)).to.be.revertedWith("ExceededLimit");
  });

  it("publicMint should fail when quantity set is more than max supply ", async () => {
    const factory = await ethers.getContractFactory("KitsudenFoxfone");
    const contract = await factory.deploy();
    await contract.deployed();
    const quantity = 2; // quantity more than set maxSupploy
    let maxSupply;

    await contract.togglePublicSale();
    const publicSale = await contract.publicSale();
    expect(publicSale).to.equal(true);

    maxSupply = await contract.maxSupply();
    expect(maxSupply).to.equal(5555);
    await contract.setMaxSupply(1);
    maxSupply = await contract.maxSupply();
    expect(maxSupply).to.equal(1);

    await expect(contract.mint(quantity)).to.be.revertedWith(
      "NotEnoughTokensLeft"
    );
  });

  it("publicMint should fail when msg value is not equal to minRate * quantity ", async () => {
    const factory = await ethers.getContractFactory("KitsudenFoxfone");
    const contract = await factory.deploy();
    await contract.deployed();
    const quantity = 2;
    const minRate = 0.07;
    let wei = ethers.utils.parseEther(`${minRate}`);
    const msg = { value: wei };

    await contract.togglePublicSale();
    const publicSale = await contract.publicSale();
    expect(publicSale).to.equal(true);

    await expect(contract.mint(quantity)).to.be.revertedWith("WrongEther");
  });

  it("publicMint should be call successfull ", async () => {
    const factory = await ethers.getContractFactory("KitsudenFoxfone");
    const contract = await factory.deploy();
    await contract.deployed();
    const quantity = ethers.BigNumber.from(2);
    const minRate = await contract.mintRate();
    const balanceInEth = ethers.utils.formatEther(minRate);
    const totalEth = Number(balanceInEth) * 2;
    let wei = ethers.utils.parseEther(`${totalEth}`);

    const msg = { value: wei };

    await contract.togglePublicSale();
    const publicSale = await contract.publicSale();
    expect(publicSale).to.equal(true);

    await contract.mint(quantity, msg);

    const totalSupply = await contract.totalSupply();
    expect(totalSupply.toNumber()).to.equal(quantity);

    const provider = waffle.provider;
    const balanceInWei = await provider.getBalance(contract.address);
    const contractBalanceInEth = ethers.utils.formatEther(balanceInWei);

    expect(Number(contractBalanceInEth)).to.equal(totalEth);
  });

  it("whiteListMint should fail when quantity is greater than whiteListMaxMints", async () => {
    const [owner] = await ethers.getSigners();
    const factory = await ethers.getContractFactory("KitsudenFoxfone");
    const contract = await factory.deploy();
    await contract.deployed();
    const quantity = 10;
    const merkle = generateMerkle([owner.address]);
    const hash = `0x${merkle?.merkleRootHash}`;

    await contract.setMerkleRoot(hash);
    const proof = getMerkleProof(owner.address);

    await expect(contract.whiteListMint(quantity, proof)).to.be.revertedWith(
      "ExceededLimit"
    );
  });

  it("whiteListMint should fail when quantity and msg value does not match ", async () => {
    const [owner] = await ethers.getSigners();
    const factory = await ethers.getContractFactory("KitsudenFoxfone");
    const contract = await factory.deploy();
    await contract.deployed();
    const quantity = 2;
    const merkle = generateMerkle([owner.address]);
    const hash = `0x${merkle?.merkleRootHash}`;
    const whitelistMintRate = await contract.whitelistMintRate();
    const balanceInEth = ethers.utils.formatEther(whitelistMintRate);
    const totalEth = Number(balanceInEth) * 3;
    let wei = ethers.utils.parseEther(`${totalEth}`);
    const msg = { value: wei };

    await contract.setMerkleRoot(hash);
    const proof = getMerkleProof(owner.address);

    await expect(contract.whiteListMint(quantity, proof)).to.be.revertedWith(
      "WrongEther"
    );
  });

  it("whiteListMint should fail when whitelist is used", async () => {
    const [owner] = await ethers.getSigners();
    const factory = await ethers.getContractFactory("KitsudenFoxfone");
    const contract = await factory.deploy();
    await contract.deployed();
    const quantity = 2;
    const merkle = generateMerkle([owner.address]);
    const hash = `0x${merkle?.merkleRootHash}`;
    const whitelistMintRate = await contract.whitelistMintRate();
    const balanceInEth = ethers.utils.formatEther(whitelistMintRate);
    const totalEth = Number(balanceInEth) * quantity;
    let wei = ethers.utils.parseEther(`${totalEth}`);
    const msg = { value: wei };

    await contract.setMerkleRoot(hash);
    const proof = getMerkleProof(owner.address);
    await contract.toggleWhitelistSale();

    await contract.whiteListMint(quantity, proof, msg);

    await expect(
      contract.whiteListMint(quantity, proof, msg)
    ).to.be.revertedWith("WhitelistUsed");
  });

  it("whiteListMint should fail when whitelist is used", async () => {
    const [owner] = await ethers.getSigners();
    const factory = await ethers.getContractFactory("KitsudenFoxfone");
    const contract = await factory.deploy();
    await contract.deployed();
    const quantity = 2;
    const merkle = generateMerkle([owner.address]);
    const hash = `0x${merkle?.merkleRootHash}`;
    const whitelistMintRate = await contract.whitelistMintRate();
    const balanceInEth = ethers.utils.formatEther(whitelistMintRate);
    const totalEth = Number(balanceInEth) * quantity;
    let wei = ethers.utils.parseEther(`${totalEth}`);
    const msg = { value: wei };

    await contract.setMerkleRoot(hash);
    const proof = getMerkleProof(owner.address);

    await expect(
      contract.whiteListMint(quantity, proof, msg)
    ).to.be.revertedWith("WhitelistNotActive");
  });

  it("whiteListMint should fail when is not maxSupply is MAX ", async () => {
    const [owner] = await ethers.getSigners();
    const factory = await ethers.getContractFactory("KitsudenFoxfone");
    const contract = await factory.deploy();
    await contract.deployed();
    const quantity = 2;
    const merkle = generateMerkle([owner.address]);
    const hash = `0x${merkle?.merkleRootHash}`;
    const whitelistMintRate = await contract.whitelistMintRate();
    const balanceInEth = ethers.utils.formatEther(whitelistMintRate);
    const totalEth = Number(balanceInEth) * quantity;
    let wei = ethers.utils.parseEther(`${totalEth}`);
    const msg = { value: wei };

    await contract.setMerkleRoot(hash);
    const proof = getMerkleProof(owner.address);
    await contract.setMaxSupply(0);
    await contract.toggleWhitelistSale();

    await expect(
      contract.whiteListMint(quantity, proof, msg)
    ).to.be.revertedWith("NotEnoughTokensLeft");
  });

  it("whiteListMint should fail when invalida merkle proof ", async () => {
    const [owner, owner2] = await ethers.getSigners();
    const factory = await ethers.getContractFactory("KitsudenFoxfone");
    const contract = await factory.deploy();
    await contract.deployed();
    const quantity = 2;
    const merkle = generateMerkle([owner2.address]);
    const hash = `0x${merkle?.merkleRootHash}`;
    const whitelistMintRate = await contract.whitelistMintRate();
    const balanceInEth = ethers.utils.formatEther(whitelistMintRate);
    const totalEth = Number(balanceInEth) * quantity;
    let wei = ethers.utils.parseEther(`${totalEth}`);
    const msg = { value: wei };

    await contract.setMerkleRoot(hash);
    const proof = getMerkleProof(owner2.address);
    await contract.toggleWhitelistSale();

    await expect(
      contract.whiteListMint(quantity, proof, msg)
    ).to.be.revertedWith("InvalidMerkle");
  });

  it("whiteListMint should succeed ", async () => {
    const [owner] = await ethers.getSigners();
    const factory = await ethers.getContractFactory("KitsudenFoxfone");
    const contract = await factory.deploy();
    await contract.deployed();
    const quantity = 2;
    const merkle = generateMerkle([owner.address]);
    const hash = `0x${merkle?.merkleRootHash}`;
    const whitelistMintRate = await contract.whitelistMintRate();
    const balanceInEth = ethers.utils.formatEther(whitelistMintRate);
    const totalEth = Number(balanceInEth) * quantity;
    let wei = ethers.utils.parseEther(`${totalEth}`);
    const msg = { value: wei };

    await contract.setMerkleRoot(hash);
    const proof = getMerkleProof(owner.address);
    await contract.toggleWhitelistSale();

    await contract.whiteListMint(quantity, proof, msg);

    const totalSupply = await contract.totalSupply();
    const count = await contract.usedAddresses(owner.address);

    expect(totalSupply.toNumber()).to.equal(quantity);
    expect(count).to.equal(quantity);
  });

  it("should get hiddenTokenUri when is not revealed", async () => {
    const [owner] = await ethers.getSigners();
    const factory = await ethers.getContractFactory("KitsudenFoxfone");
    const contract = await factory.deploy();
    await contract.deployed();
    const quantity = 2;
    const merkle = generateMerkle([owner.address]);
    const hash = `0x${merkle?.merkleRootHash}`;
    const whitelistMintRate = await contract.whitelistMintRate();
    const balanceInEth = ethers.utils.formatEther(whitelistMintRate);
    const totalEth = Number(balanceInEth) * quantity;
    let wei = ethers.utils.parseEther(`${totalEth}`);
    const msg = { value: wei };

    await contract.setMerkleRoot(hash);
    const proof = getMerkleProof(owner.address);
    await contract.toggleWhitelistSale();

    await contract.whiteListMint(quantity, proof, msg);

    const totalSupply = await contract.totalSupply();
    const count = await contract.usedAddresses(owner.address);

    expect(totalSupply.toNumber()).to.equal(quantity);
    expect(count).to.equal(quantity);

    const tokenUri = await contract.tokenURI(1);

    expect(tokenUri).to.equal("ipfs://<ID>/hidden.json");
  });
});
