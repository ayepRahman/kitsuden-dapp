// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

error PublicSaleNotLive();
error WhitelistNotActive();
error ExceededLimit();
error NotEnoughTokensLeft();
error WrongEther();
error InvalidMerkle();
error WhitelistUsed();

contract OnlyAyep is ERC721A, ReentrancyGuard, Ownable {
    using Address for address;
    using Strings for uint256;
    using MerkleProof for bytes32[];

    address proxyRegistryAddress;

    bytes32 public merkleRoot; // 0xabcd1234
    uint256 public maxMints = 2;
    uint256 public maxSupply = 500; // Genesis
    uint256 public mintRate = 0.07 ether;
    uint256 public whitelistMintRate = 0.05 ether;
    string public hiddenUri = "ipfs://<ID>/hidden.json";
    string public baseExtension = ".json";
    string public baseURI = ""; // ipfs://<ID>/
    bool public revealed = false;
    bool public publicSale = false;
    bool public whitelistSale = false;

    mapping(address => uint256) public usedAddresses;

    constructor() ERC721A("OnlyAyep", "ONLYAYEP") {}

    function mint(uint256 quantity) external payable nonReentrant {
        if (!publicSale) revert PublicSaleNotLive();

        // check for user mint limit
        if (quantity + _numberMinted(msg.sender) > maxMints) {
            revert ExceededLimit();
        }

        if (totalSupply() + quantity > maxSupply) {
            revert NotEnoughTokensLeft();
        }

        // check for the value user pass is equal to the quantity and the mintRate
        if (mintRate * quantity != msg.value) {
            revert WrongEther();
        }

        _safeMint(msg.sender, quantity);
    }

    function whiteListMint(uint256 quantity, bytes32[] calldata proof)
        external
        payable
        nonReentrant
    {
        if (quantity > 2) revert ExceededLimit();
        if (whitelistMintRate * quantity != msg.value) {
            revert WrongEther();
        }

        if (usedAddresses[msg.sender] + quantity > 2) {
            revert WhitelistUsed();
        }
        if (!whitelistSale) revert WhitelistNotActive();

        if (totalSupply() + quantity > maxSupply) {
            revert NotEnoughTokensLeft();
        }
        if (!isWhiteListed(msg.sender, proof)) revert InvalidMerkle();
        usedAddresses[msg.sender] += quantity;
        _safeMint(msg.sender, quantity);
    }

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
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        if (!revealed) {
            return hiddenUri;
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

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setBaseUri(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
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

    function setHiddenUri(string memory _hiddenUri) public onlyOwner {
        hiddenUri = _hiddenUri;
    }

    function setMintRate(uint256 _mintRate) public onlyOwner {
        mintRate = _mintRate;
    }

    function setWhitelistMintRate(uint256 _mintRate) public onlyOwner {
        whitelistMintRate = _mintRate;
    }

    function setMaxSupply(uint256 _newSupply) public onlyOwner {
        maxSupply = _newSupply;
    }

    function setMaxMints(uint256 _newMaxMints) public onlyOwner {
        maxMints = _newMaxMints;
    }

    function withdraw() external payable onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
