/**
 * https://docs.openzeppelin.com/test-helpers/0.5/
 */

import { expect } from "chai";
import { ethers, waffle } from "hardhat";
import { getMerkleProof, generateMerkle } from "utils/merkleTree";

const someRandomProof =
  "0x702d0f86c1baf15ac2b8aae489113b59d27419b751fsbf7da0ef0bae4688abc7a";

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

  it.only("whiteListMint should fail when quantity is greater than 2 ", async () => {
    const [owner] = await ethers.getSigners();

    console.log(owner);

    const factory = await ethers.getContractFactory("KitsudenFoxfone");
    const contract = await factory.deploy();
    await contract.deployed();
    const quantity = 10;
    const mockProof = [someRandomProof];

    await expect(
      contract.whiteListMint(quantity, mockProof)
    ).to.be.revertedWith("WrongEther");
  });

  // it.skip("whiteListMint should fail when quantity and msg value does not match ", async () => {
  //   const quantity = 2;
  //   const mockProof = [someRandomAddr];
  //   const mockMinRate = 0.00999;
  //   const wei = ethers.utils.parseEther(`${mockMinRate}`);
  //   const msg = { value: wei };

  //   await truffleAssert.reverts(
  //     contract.whiteListMint(quantity, mockProof, msg)
  //   );
  // });

  // it.skip("whiteListMint should fail when quantity and msg value does not match ", async () => {
  //   const quantity = 2;
  //   const mockProof = [someRandomAddr];
  //   const mockMinRate = 0.00999;
  //   const wei = ethers.utils.parseEther(`${mockMinRate}`);
  //   const msg = { value: wei };

  //   await truffleAssert.reverts(
  //     contract.whiteListMint(quantity, mockProof, msg)
  //   );
  // });

  // it.skip("whiteListMint should fail when is not whiteListSale ", async () => {
  //   const quantity = 2;
  //   const mockProof = [someRandomAddr];
  //   const mockMinRate = 0.00999;
  //   const wei = ethers.utils.parseEther(`${mockMinRate}`);
  //   const msg = { value: wei };

  //   const whitelistSale = await contract.whitelistSale();

  //   assert.equal(whitelistSale, false);

  //   await truffleAssert.reverts(
  //     contract.whiteListMint(quantity, mockProof, msg)
  //   );
  // });

  // it.skip("whiteListMint should fail when is not maxSupply is MAX ", async () => {
  //   const quantity = 2;
  //   const mockProof = [someRandomAddr];
  //   const mockMinRate = 0.00999;
  //   const wei = ethers.utils.parseEther(`${mockMinRate}`);
  //   const msg = { value: wei };

  //   await contract.toggleWhitelistSale();
  //   let whitelistSale = await contract.whitelistSale();
  //   assert.equal(whitelistSale, true);

  //   contract.setMaxSupply(0);

  //   await truffleAssert.reverts(
  //     contract.whiteListMint(quantity, mockProof, msg)
  //   );
  // });

  // it.skip("whiteListMint should succeed ", async () => {
  //   const quantity = 2;
  //   const whiteListMintRate = await contract.whitelistMintRate();
  //   const formattedWhiteListMintRate = ethers.utils.formatEther(
  //     whiteListMintRate.toString()
  //   );

  //   console.log("whiteListMintRate!!!!!", formattedWhiteListMintRate);

  //   const totalEthPrice = formattedWhiteListMintRate * quantity;
  //   const wei = ethers.utils.parseEther(`${totalEthPrice}`);
  //   const msg = { value: wei };

  //   await contract.toggleWhitelistSale();
  //   let whitelistSale = await contract.whitelistSale();
  //   assert.equal(whitelistSale, true);

  //   const { merkleRootHash } = generateMerkleRoot();

  //   await contract.setMerkleRoot(`0x${merkleRootHash}`);

  //   const proof = getMerkleProof(accounts[0]);

  //   await contract.whiteListMint(quantity, proof, msg);

  //   const totalSupply = await contract.totalSupply();
  //   const count = await contract.usedAddresses(accounts[0]);

  //   assert.equal(totalSupply.toNumber(), quantity);
  //   assert.equal(count, quantity);
  // });

  // it.skip("should get hiddenTokenUri when is not revealed", async () => {
  //   const quantity = 2;
  //   const whiteListMintRate = await contract.whitelistMintRate();
  //   const formattedWhiteListMintRate = ethers.utils.formatEther(
  //     whiteListMintRate.toString()
  //   );
  //   const totalEthPrice = formattedWhiteListMintRate * quantity;
  //   const wei = ethers.utils.parseEther(`${totalEthPrice}`);
  //   const msg = { value: wei };

  //   await contract.toggleWhitelistSale();
  //   let whitelistSale = await contract.whitelistSale();
  //   assert.equal(whitelistSale, true);

  //   const { merkleRootHash } = generateMerkleRoot();

  //   await contract.setMerkleRoot(`0x${merkleRootHash}`);

  //   const proof = getMerkleProof(accounts[0]);

  //   await contract.whiteListMint(quantity, proof, msg);

  //   const totalSupply = await contract.totalSupply();
  //   const count = await contract.usedAddresses(accounts[0]);
  //   const revealed = await contract.revealed();

  //   assert.equal(totalSupply.toNumber(), quantity);
  //   assert.equal(count, quantity);
  //   assert.equal(revealed, false);

  //   const tokenUri = await contract.tokenURI(1);

  //   assert.equal(tokenUri, "ipfs://<ID>/hidden.json");
  // });
});
