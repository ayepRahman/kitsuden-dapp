/**
 * https://docs.openzeppelin.com/test-helpers/0.5/
 */

const truffleAssert = require("truffle-assertions");
const { ethers } = require("ethers");
const OnlyAyep = artifacts.require("./OnlyAyep.sol");
const { getMerkleProof, generateMerkleRoot } = require("./helpers");

const someRandomAddr =
  "0x702d0f86c1baf15ac2b8aae489113b59d27419b751fbf7da0ef0bae4688abc7a";

contract("OnlyAyep", (accounts) => {
  let contract;

  beforeEach(async function () {
    // creating new contract instance on each test
    contract = await OnlyAyep.new();
  });

  it("should deployed", async () => {
    assert.notEqual(contract, "");
  });

  // publicMint test

  it("publicMint should fail when is not publicSale", async () => {
    const quantity = 1;
    const publicSale = await contract.publicSale();

    assert.equal(publicSale, false);
    await truffleAssert.reverts(contract.mint(quantity));
  });

  it("publicMint should fail when quantity is greater than maxMints", async () => {
    const quantity = 1;

    await contract.togglePublicSale();

    const publicSale = await contract.publicSale();

    assert.equal(publicSale, true);

    await truffleAssert.reverts(contract.mint(quantity));
  });

  it("publicMint should fail when quantity set is more than max supply ", async () => {
    const quantity = 10; // quantity more than set maxSupploy
    let maxSupply;

    await contract.togglePublicSale();
    const publicSale = await contract.publicSale();
    assert.equal(publicSale, true);

    maxSupply = await contract.maxSupply();
    assert.equal(maxSupply, 500);
    await contract.setMaxSupply(1);
    maxSupply = await contract.maxSupply();
    assert.equal(maxSupply, 1);

    await truffleAssert.reverts(contract.mint(quantity));
  });

  it("publicMint should fail when msg value is not equal to minRate * quantity ", async () => {
    const quantity = 10;
    const minRate = 0.07;
    let wei = ethers.utils.parseEther(`${minRate}`);
    const msg = { value: wei };

    await contract.togglePublicSale();
    const publicSale = await contract.publicSale();
    assert.equal(publicSale, true);

    await truffleAssert.reverts(contract.mint(quantity, msg));
  });

  it("publicMint should be call successfull ", async () => {
    const quantity = 2;
    const minRate = 0.14;
    let wei = ethers.utils.parseEther(`${minRate}`);

    const msg = { value: wei };

    await contract.togglePublicSale();
    const publicSale = await contract.publicSale();
    assert.equal(publicSale, true);

    await contract.mint(quantity, msg);
    const totalSupply = await contract.totalSupply();

    assert.equal(totalSupply.toNumber(), quantity);

    const contractBalanceInWei = await web3.eth.getBalance(contract.address);
    const contractBalanceInEth = ethers.utils.formatEther(contractBalanceInWei);

    assert.equal(contractBalanceInEth, minRate);
  });

  it("whiteListMint should fail when quantity is greater than 2 ", async () => {
    const quantity = 10;
    const mockProof = [someRandomAddr];

    await truffleAssert.reverts(contract.whiteListMint(quantity, mockProof));
  });

  it("whiteListMint should fail when quantity and msg value does not match ", async () => {
    const quantity = 2;
    const mockProof = [someRandomAddr];
    const mockMinRate = 0.00999;
    const wei = ethers.utils.parseEther(`${mockMinRate}`);
    const msg = { value: wei };

    await truffleAssert.reverts(
      contract.whiteListMint(quantity, mockProof, msg)
    );
  });

  it("whiteListMint should fail when quantity and msg value does not match ", async () => {
    const quantity = 2;
    const mockProof = [someRandomAddr];
    const mockMinRate = 0.00999;
    const wei = ethers.utils.parseEther(`${mockMinRate}`);
    const msg = { value: wei };

    await truffleAssert.reverts(
      contract.whiteListMint(quantity, mockProof, msg)
    );
  });

  it("whiteListMint should fail when is not whiteListSale ", async () => {
    const quantity = 2;
    const mockProof = [someRandomAddr];
    const mockMinRate = 0.00999;
    const wei = ethers.utils.parseEther(`${mockMinRate}`);
    const msg = { value: wei };

    const whitelistSale = await contract.whitelistSale();

    assert.equal(whitelistSale, false);

    await truffleAssert.reverts(
      contract.whiteListMint(quantity, mockProof, msg)
    );
  });

  it("whiteListMint should fail when is not maxSupply is MAX ", async () => {
    const quantity = 2;
    const mockProof = [someRandomAddr];
    const mockMinRate = 0.00999;
    const wei = ethers.utils.parseEther(`${mockMinRate}`);
    const msg = { value: wei };

    await contract.toggleWhitelistSale();
    let whitelistSale = await contract.whitelistSale();
    assert.equal(whitelistSale, true);

    contract.setMaxSupply(0);

    await truffleAssert.reverts(
      contract.whiteListMint(quantity, mockProof, msg)
    );
  });

  it("whiteListMint should succeed ", async () => {
    const quantity = 2;
    const whiteListMintRate = await contract.whitelistMintRate();
    const formattedWhiteListMintRate = ethers.utils.formatEther(
      whiteListMintRate.toString()
    );

    console.log("whiteListMintRate!!!!!", formattedWhiteListMintRate);

    const totalEthPrice = formattedWhiteListMintRate * quantity;
    const wei = ethers.utils.parseEther(`${totalEthPrice}`);
    const msg = { value: wei };

    await contract.toggleWhitelistSale();
    let whitelistSale = await contract.whitelistSale();
    assert.equal(whitelistSale, true);

    const { merkleRootHash } = generateMerkleRoot();

    await contract.setMerkleRoot(`0x${merkleRootHash}`);

    const proof = getMerkleProof(accounts[0]);

    await contract.whiteListMint(quantity, proof, msg);

    const totalSupply = await contract.totalSupply();
    const count = await contract.usedAddresses(accounts[0]);

    assert.equal(totalSupply.toNumber(), quantity);
    assert.equal(count, quantity);
  });

  it("should get hiddenTokenUri when is not revealed", async () => {
    const quantity = 2;
    const whiteListMintRate = await contract.whitelistMintRate();
    const formattedWhiteListMintRate = ethers.utils.formatEther(
      whiteListMintRate.toString()
    );
    const totalEthPrice = formattedWhiteListMintRate * quantity;
    const wei = ethers.utils.parseEther(`${totalEthPrice}`);
    const msg = { value: wei };

    await contract.toggleWhitelistSale();
    let whitelistSale = await contract.whitelistSale();
    assert.equal(whitelistSale, true);

    const { merkleRootHash } = generateMerkleRoot();

    await contract.setMerkleRoot(`0x${merkleRootHash}`);

    const proof = getMerkleProof(accounts[0]);

    await contract.whiteListMint(quantity, proof, msg);

    const totalSupply = await contract.totalSupply();
    const count = await contract.usedAddresses(accounts[0]);
    const revealed = await contract.revealed();

    assert.equal(totalSupply.toNumber(), quantity);
    assert.equal(count, quantity);
    assert.equal(revealed, false);

    const tokenUri = await contract.tokenURI(1);

    assert.equal(tokenUri, "ipfs://<ID>/hidden.json");
  });
});
