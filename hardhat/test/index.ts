/**
 * https://docs.openzeppelin.com/test-helpers/0.5/
 */

import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

const mockHiddenURI =
  "https://kitsuden.infura-ipfs.io/ipfs/QmT7tsvigAix4AQvsfvHtJJV7U8JFYUu9MM3j4cESkVSPJ/";
const mockBaseURI = "";

describe("Foxfone", () => {
  // We define a fixture to reuse the same setup in every test. We use
  // loadFixture to run this setup once, snapshot that state, and reset Hardhat
  // Network to that snapshopt in every test.
  async function deployContractFixture() {
    // Get the ContractFactory and Signers here.
    const KitsudenFoxfone = await ethers.getContractFactory("Foxfone");
    const [owner, addr1, addr2] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // its deployed() method, which happens onces its transaction has been
    // mined.
    const contract = await KitsudenFoxfone.deploy();

    await contract.deployed();

    // Fixtures can return anything you consider useful for your tests
    return {
      KitsudenFoxfone,
      contract,
      owner,
      addr1,
      addr2,
    };
  }

  describe("contract", () => {
    it("should deployed", async () => {
      const { contract } = await loadFixture(deployContractFixture);

      const maxSupply = await contract.maxSupply();
      const mintRate = await contract.mintRate();
      const baseExtension = await contract.baseExtension();
      const baseURI = await contract.baseURI();
      const baseHiddenUri = await contract.baseHiddenUri();
      const revealed = await contract.revealed();

      expect(contract).not.equal("");
      expect(maxSupply.toNumber()).to.equal(6666);
      expect(ethers.utils.formatEther(mintRate)).to.equal("0.0066");
      expect(baseExtension).to.equal(".json");
      expect(baseURI).to.equal(mockBaseURI);
      expect(baseHiddenUri).to.equal(mockHiddenURI);
      expect(revealed).to.equal(false);
    });
  });

  describe("mint", () => {
    it("should fail when is not live", async () => {
      const { contract } = await loadFixture(deployContractFixture);
      const quantity = 1;

      await expect(contract.mint(quantity)).to.be.revertedWithCustomError(
        contract,
        "PublicSaleNotLive"
      );
    });

    it("should fail when exceeded max supply", async () => {
      const { contract } = await loadFixture(deployContractFixture);
      const quantity = 10;
      const reserveQuantity = 6666;

      await contract.setMintPhase(2);
      const mintPhase = await contract.mintPhase();
      expect(mintPhase).to.equal(2);

      await contract.teamMint(reserveQuantity);

      await expect(contract.mint(quantity)).to.be.revertedWithCustomError(
        contract,
        "NotEnoughTokensLeft"
      );
    });

    it("should fail when paused", async () => {
      const { contract } = await loadFixture(deployContractFixture);
      const quantity = 10;
      const reserveQuantity = 6666;

      await contract.setMintPhase(2);
      const mintPhase = await contract.mintPhase();
      expect(mintPhase).to.equal(2);

      await contract.setTogglePaused();

      await expect(contract.mint(quantity)).to.be.revertedWith("Paused");
    });

    it("should fail when wrong ether value", async () => {
      const { contract } = await loadFixture(deployContractFixture);
      const quantity = 2;
      const minRate = 0.07;
      let wei = ethers.utils.parseEther(`${minRate}`);
      const msg = { value: wei };

      await contract.setMintPhase(2);
      const mintPhase = await contract.mintPhase();
      expect(mintPhase).to.equal(2);

      await expect(contract.mint(quantity, msg)).to.be.revertedWithCustomError(
        contract,
        "WrongEther"
      );
    });

    it("should fail when exceed limit", async () => {
      const { contract } = await loadFixture(deployContractFixture);
      const quantity = 11;
      const minRate = await contract.mintRate();
      const totalEthInWei = minRate.mul(quantity);
      const msg = { value: totalEthInWei };

      await contract.setMintPhase(2);
      const mintPhase = await contract.mintPhase();
      expect(mintPhase).to.equal(2);

      await expect(contract.mint(quantity, msg)).to.be.revertedWithCustomError(
        contract,
        "ExceededLimit"
      );
    });

    it("should be call successfull", async () => {
      const { contract } = await loadFixture(deployContractFixture);
      const quantity = 2;
      const secondQuantity = 3;
      const minRate = await contract.mintRate();
      const totalEthInWei = minRate.mul(quantity);
      const secondTotalEthInWei = minRate.mul(secondQuantity);
      const sumEthInWei = minRate.mul(quantity + secondQuantity);

      const msg = { value: totalEthInWei };
      const msg2 = { value: secondTotalEthInWei };

      await contract.setMintPhase(2);
      const mintPhase = await contract.mintPhase();
      expect(mintPhase).to.equal(2);

      // first mint
      await contract.mint(quantity, msg);

      const totalSupply = await contract.totalSupply();

      expect(totalSupply.toNumber()).to.equal(quantity);

      const balanceInWei = await ethers.provider.getBalance(contract.address);

      expect(balanceInWei).to.equal(totalEthInWei);

      // second mint
      await contract.mint(secondQuantity, msg2);

      const secondTotalSupply = await contract.totalSupply();

      expect(secondTotalSupply.toNumber()).to.equal(quantity + secondQuantity);

      const secondBalanceInWei = await ethers.provider.getBalance(
        contract.address
      );

      expect(secondBalanceInWei).to.equal(sumEthInWei);
    });
  });

  describe("tokenURI", () => {
    it("should reverted with a not token exist", async () => {
      const { contract } = await loadFixture(deployContractFixture);

      await expect(contract.tokenURI(0)).to.be.revertedWith(
        "token does not exist!"
      );
    });

    it("should get default hiddenTokenUri when is not revealed", async () => {
      const { contract, owner } = await loadFixture(deployContractFixture);
      const quantity = 1;
      const mintRate = await contract.mintRate();
      const totalEth = mintRate.mul(quantity);
      const msg = { value: totalEth };

      await contract.setMintPhase(2);
      const mintPhase = await contract.mintPhase();
      expect(mintPhase).to.equal(2);

      await contract.mint(quantity, msg);

      const totalSupply = await contract.totalSupply();
      expect(totalSupply.toNumber()).to.equal(quantity);
      const tokenUri = await contract.tokenURI(0);
      expect(tokenUri).to.equal(`${mockHiddenURI}0.json`);
    });

    it("should get default baseUri when revealed", async () => {
      const { contract, owner } = await loadFixture(deployContractFixture);
      const quantity = 1;
      const mockBasUri = "someCoolUri/";

      const mintRate = await contract.mintRate();
      const totalEth = mintRate.mul(quantity);
      const msg = { value: totalEth };

      await contract.setMintPhase(2);
      const mintPhase = await contract.mintPhase();
      expect(mintPhase).to.equal(2);

      await contract.mint(quantity, msg);

      const totalSupply = await contract.totalSupply();
      expect(totalSupply.toNumber()).to.equal(quantity);

      await contract.setBaseURI(mockBasUri);

      const baseUri = await contract.baseURI();

      expect(baseUri).to.equal(mockBasUri);

      const tokenUri = await contract.tokenURI(0);
      expect(tokenUri).to.equal(`${baseUri}0.json`);
    });
  });

  describe("setBaseURI", () => {
    it("should revert with required suffix error", async () => {
      const { contract } = await loadFixture(deployContractFixture);

      await expect(contract.setBaseURI("123456789")).to.be.revertedWith(
        "_newBaseURI should have a suffix of '/'"
      );
    });

    it("should revert with only be able to setBaseURI once", async () => {
      const { contract } = await loadFixture(deployContractFixture);
      const mockBaseUri = "someUrl/";

      await contract.setBaseURI(mockBaseUri);

      const url = await contract.baseURI();

      expect(url).to.equal(mockBaseUri);

      await expect(contract.setBaseURI(mockBaseUri)).to.be.revertedWith(
        "You can only set baseURI once!"
      );
    });

    it("should revert with no empty input allow", async () => {
      const { contract } = await loadFixture(deployContractFixture);
      const mockBaseUri = "";

      await expect(contract.setBaseURI(mockBaseUri)).to.be.revertedWith(
        "_newBaseURI cannot be empty!"
      );
    });
  });

  describe("withdraw", async () => {
    it("should fail if not owner ", async () => {
      const { contract, owner, addr1 } = await loadFixture(
        deployContractFixture
      );
      const quantity = 1;
      const mintRate = await contract.mintRate();
      const totalEth = mintRate.mul(quantity);
      const msg = { value: totalEth };

      await contract.setMintPhase(2);
      const mintPhase = await contract.mintPhase();
      expect(mintPhase).to.equal(2);

      await contract.mint(quantity, msg);
      const totalSupply = await contract.totalSupply();
      expect(totalSupply.toNumber()).to.equal(quantity);
      await expect(contract.connect(addr1).withdraw()).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });

    it("should succeed if owner ", async () => {
      const { contract, owner } = await loadFixture(deployContractFixture);

      const quantity = 1;
      const mintRate = await contract.mintRate();
      const totalEth = mintRate.mul(quantity);
      const msg = { value: totalEth };

      await contract.setMintPhase(2);
      const mintPhase = await contract.mintPhase();
      expect(mintPhase).to.equal(2);

      await contract.mint(quantity, msg);

      const totalSupply = await contract.totalSupply();

      expect(totalSupply.toNumber()).to.equal(quantity);

      const previousOwnerBalance = await owner.getBalance();

      await contract.withdraw();

      const currentOwnerBalance = await owner.getBalance();

      expect(currentOwnerBalance).to.gt(previousOwnerBalance);
    });
  });

  describe("teamMint", async () => {
    it("should fail when supplied quantity is more than the avaiable supply", async () => {
      const { contract, addr1 } = await loadFixture(deployContractFixture);
      const quantity = 6666;

      contract.teamMint(quantity);

      await expect(contract.teamMint(1)).to.be.revertedWithCustomError(
        contract,
        "NotEnoughTokensLeft"
      );
    });

    it("should fail when msg sender is not an owner", async () => {
      const { contract, addr1 } = await loadFixture(deployContractFixture);

      await expect(contract.connect(addr1).teamMint(1)).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });

    it("should succeed", async () => {
      const { contract, addr1 } = await loadFixture(deployContractFixture);
      const quantity = 2;

      await contract.teamMint(quantity);

      const totalSupply = await contract.totalSupply();
      expect(totalSupply.toNumber()).to.equal(quantity);
    });
  });

  describe("setMintRate", async () => {
    it("should fail if not owner", async () => {
      const { contract, addr1 } = await loadFixture(deployContractFixture);
      await expect(contract.connect(addr1).setMintRate(1)).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });

    it("should succeed", async () => {
      const { contract, addr1 } = await loadFixture(deployContractFixture);

      const minRate = 0.07;
      let wei = ethers.utils.parseEther(`${minRate}`);

      await contract.setMintRate(wei);
      const updateMintRate = await contract.mintRate();

      expect(updateMintRate).to.equal(wei);
    });
  });
});
