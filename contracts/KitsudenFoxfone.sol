// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

// @@@@@@@@@@@(@@@@@@@@@@@@@@@@@@@@@@@@@@@/@@@@@@@@@@
// @@@@@@@@@@////%@@@@@@@@@@@@@@@@@@@@@%////@@@@@@@@@
// @@@@@@@@@////////@@@@@@@@@@@@@@@@@////////@@@@@@@@
// @@@@@@@@#//////////@@@@@@@@@@@@@//////////@@@@@@@@
// @@@@@@@@/////////////@@@@@@@@@/////////////@@@@@@@
// @@@@@@@////////////////////////////////////#@@@@@@
// @@@@@@@/////////////////////////////////////@@@@@@
// @@@@@@@/////////////////////////////////////@@@@@@
// @@@@@@/////// //////////////////////* ///////@@@@@
// @@@@@////////.    ///////////////    *////////@@@@
// @@@@//////////      ,/////////.     .//////////@@@
// @@#/////////////////////////////////////////////@@
// @/////////////////////////////////////////////////
// @&///////////////////////////////////////////////@
// @@@@@@@#///////////////////////////////////#@@@@@@
// @@@@@@@@@@@&////////////, *////////////@@@@@@@@@@@
// @@@@@@@@@@@@@@@@///////////////////&@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@////////////%@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@%/////&@@@@@@@@@@@@@@@@@@@@@

error PublicSaleNotLive();
error WhitelistNotActive();
error ExceededLimit();
error NotEnoughTokensLeft();
error WrongEther();
error InvalidMerkle();
error WhitelistUsed();

contract KitsudenFoxfone is ERC721A, ReentrancyGuard, Ownable {
    using Address for address;
    using Strings for uint256;
    using MerkleProof for bytes32[];

    address proxyRegistryAddress;

    bytes32 public merkleRoot;
    uint256 public maxMints = 5;
    uint256 public whiteListMaxMints = 2;
    uint256 public maxSupply = 6666;
    uint256 public mintRate = 0.07777 ether;
    uint256 public whitelistMintRate = 0.05555 ether;
    string public baseExtension = ".json";
    string public baseURI = ""; // ipfs://<LIVE_CID>/
    string public baseHiddenUri = ""; // ipfs://<HIDDEN_CID>/
    bool public revealed = false;
    bool public publicSale = false;
    bool public whitelistSale = false;

    mapping(address => uint256) public whiteListUsedAddresses;
    mapping(address => uint256) public usedAddresses;

    constructor() ERC721A("KitsudenFoxFone", "KSDFF") {}

    function mint(uint256 quantity) external payable nonReentrant {
        if (!publicSale) revert PublicSaleNotLive();

        // check for user mint limit
        if (
            quantity + _numberMinted(msg.sender) - usedAddresses[msg.sender] >
            maxMints
        ) {
            revert ExceededLimit();
        }

        if (totalSupply() + quantity > maxSupply) {
            revert NotEnoughTokensLeft();
        }

        // check for the value user pass is equal to the quantity and the mintRate
        if (mintRate * quantity != msg.value) {
            revert WrongEther();
        }

        usedAddresses[msg.sender] += quantity;
        _safeMint(msg.sender, quantity);
    }

    /**
     * @dev a function that only allow whitelisted addresses to mint
     */
    function whiteListMint(uint256 quantity, bytes32[] calldata proof)
        external
        payable
        nonReentrant
    {
        if (!whitelistSale) revert WhitelistNotActive();

        if (!isWhiteListed(msg.sender, proof)) revert InvalidMerkle();

        if (quantity > whiteListMaxMints) revert ExceededLimit();

        if (whitelistMintRate * quantity != msg.value) {
            revert WrongEther();
        }

        if (whiteListUsedAddresses[msg.sender] + quantity > whiteListMaxMints) {
            revert WhitelistUsed();
        }

        if (totalSupply() + quantity > maxSupply) {
            revert NotEnoughTokensLeft();
        }

        whiteListUsedAddresses[msg.sender] += quantity;
        _safeMint(msg.sender, quantity);
    }

    /**
     * @dev a function that only allow owner to reserve nft for marketing/giveaway purpose
     */
    function reserveMint(uint256 quantity) public onlyOwner {
        if (totalSupply() + quantity > maxSupply) {
            revert NotEnoughTokensLeft();
        }

        _safeMint(msg.sender, quantity);
    }

    /**
     * @dev a function that check for user address and verify its proof
     */
    function isWhiteListed(address _account, bytes32[] calldata _proof)
        internal
        view
        returns (bool)
    {
        return _verify(leaf(_account), _proof);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(tokenId), "token doest not exist");

        if (!revealed) {
            string memory currentHiddenBaseURI = _baseHiddenURI();

            return
                bytes(currentHiddenBaseURI).length > 0
                    ? string(
                        abi.encodePacked(
                            currentHiddenBaseURI,
                            tokenId.toString(),
                            baseExtension
                        )
                    )
                    : "";
        }

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        baseExtension
                    )
                )
                : "";
    }

    function _baseHiddenURI() internal view returns (string memory) {
        return baseHiddenUri;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function baseTokenURI() public view returns (string memory) {
        return baseURI;
    }

    /**
     * @dev a function that check the remainding mint available
     */
    function mintAvailable() public view returns (uint256) {
        if (whitelistSale) {
            return whiteListMaxMints - whiteListUsedAddresses[msg.sender];
        }

        if (publicSale) {
            return maxMints - usedAddresses[msg.sender];
        }

        return 0;
    }

    function leaf(address _account) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(_account));
    }

    function _verify(bytes32 _leaf, bytes32[] memory _proof)
        internal
        view
        returns (bool)
    {
        return MerkleProof.verify(_proof, merkleRoot, _leaf);
    }

    function setMerkleRoot(bytes32 _root) external onlyOwner {
        merkleRoot = _root;
    }

    function toggleReveal() public onlyOwner {
        revealed = !revealed;
    }

    function togglePublicSale() public onlyOwner {
        publicSale = !publicSale;
    }

    function toggleWhitelistSale() public onlyOwner {
        whitelistSale = !whitelistSale;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setBaseHiddenUri(string memory _baseHiddenUri) public onlyOwner {
        baseHiddenUri = _baseHiddenUri;
    }

    function setMintRate(uint256 _mintRate) public onlyOwner {
        mintRate = _mintRate;
    }

    function setWhitelistMintRate(uint256 _mintRate) public onlyOwner {
        whitelistMintRate = _mintRate;
    }

    function setMaxMints(uint256 _newMaxMints) public onlyOwner {
        maxMints = _newMaxMints;
    }

    function setWhiteListMaxMints(uint256 _newWhiteListMaxMints)
        public
        onlyOwner
    {
        whiteListMaxMints = _newWhiteListMaxMints;
    }

    function withdraw() external payable onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
