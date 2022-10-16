// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

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
error WhitelistNotLive();
error ExceededLimit();
error NotEnoughTokensLeft();
error WrongEther();
error InvalidMerkle();

contract KitsudenFoxfone is ERC721A, ReentrancyGuard, Ownable {
    using Address for address;
    using Strings for uint256;
    using MerkleProof for bytes32[];

    bytes32 public merkleRoot;
    uint256 public maxMints = 5;
    uint256 public whiteListMaxMints = 2;
    uint256 public maxSupply = 6666;
    uint256 public mintRate = 0.029 ether;
    uint256 public whitelistMintRate = 0.029 ether;
    string public baseExtension = ".json";
    string public baseURI = ""; // ipfs://<LIVE_CID>
    string public baseHiddenUri = ""; // TODO: to update before deploying
    bool public revealed = false;
    bool public publicSale = false;
    bool public whitelistSale = false;

    mapping(address => uint256) public whiteListUsedAddresses;
    mapping(address => uint256) public usedAddresses;

    constructor(string memory _baseHiddenUri)
        ERC721A("KitsudenFoxFone", "KSDFF")
    {
        baseHiddenUri = _baseHiddenUri;
    }

    function mint(uint256 quantity) external payable nonReentrant {
        // check if public sale is live
        if (!publicSale) revert PublicSaleNotLive();

        // check if enough token balance
        if (totalSupply() + quantity > maxSupply) {
            revert NotEnoughTokensLeft();
        }

        // check for the value user pass is equal to the quantity and the mintRate
        if (mintRate * quantity != msg.value) {
            revert WrongEther();
        }

        // check for user mint limit
        if (quantity + usedAddresses[msg.sender] > maxMints) {
            revert ExceededLimit();
        }

        usedAddresses[msg.sender] += quantity;
        _mint(msg.sender, quantity);
    }

    /**
     * @dev a function that only allow whitelisted addresses to mint
     */
    function whiteListMint(uint256 quantity, bytes32[] calldata proof)
        external
        payable
        nonReentrant
    {
        // check if white list sale is live
        if (!whitelistSale) revert WhitelistNotLive();

        // check if the user is white listed.
        if (!isWhiteListed(msg.sender, proof)) revert InvalidMerkle();

        // check if enough token balance
        if (totalSupply() + quantity > maxSupply) {
            revert NotEnoughTokensLeft();
        }

        // check for the value user pass is equal to the quantity and the mintRate
        if (whitelistMintRate * quantity != msg.value) {
            revert WrongEther();
        }

        // cehck if user exceeded mint limit
        if (whiteListUsedAddresses[msg.sender] + quantity > whiteListMaxMints) {
            revert ExceededLimit();
        }

        whiteListUsedAddresses[msg.sender] += quantity;
        _mint(msg.sender, quantity);
    }

    /**
     * @dev a function that only allow owner to reserve nft for marketing/giveaway purpose
     */
    function reserveMint(uint256 quantity) public onlyOwner {
        if (totalSupply() + quantity > maxSupply) {
            revert NotEnoughTokensLeft();
        }

        _mint(msg.sender, quantity);
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
        require(_exists(tokenId), "token does not exist!");

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

    /**
     * @dev a function to set white list merkle root
     */
    function setMerkleRoot(bytes32 _root) external onlyOwner {
        merkleRoot = _root;
    }

    function togglePublicSale() public onlyOwner {
        publicSale = !publicSale;
    }

    function toggleWhitelistSale() public onlyOwner {
        whitelistSale = !whitelistSale;
    }

    /**
     * @dev a function to setBaseURI only once, this to ensure that the tokenURI can't be meddle with!
     */
    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        require(bytes(_newBaseURI).length > 1, "_newBaseURI cannot be empty!");
        uint256 len = stringLength(_newBaseURI);
        string memory char = substring(_newBaseURI, len - 1, len);

        require(
            compareStrings(char, "/"),
            "_newBaseURI should have a suffix of '/'"
        );
        require(!revealed, "You can only set baseURI once!");
        revealed = true;
        baseURI = _newBaseURI;
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function substring(
        string memory str,
        uint256 startIndex,
        uint256 endIndex
    ) public pure returns (string memory) {
        bytes memory strBytes = bytes(str);
        bytes memory result = new bytes(endIndex - startIndex);
        for (uint256 i = startIndex; i < endIndex; i++) {
            result[i - startIndex] = strBytes[i];
        }
        return string(result);
    }

    /**
     * @dev Returns the length of a given string
     *
     * @param s The string to measure the length of
     * @return The length of the input string
     */
    function stringLength(string memory s) internal pure returns (uint256) {
        uint256 len;
        uint256 i = 0;
        uint256 bytelength = bytes(s).length;

        for (len = 0; i < bytelength; len++) {
            bytes1 b = bytes(s)[i];
            if (b < 0x80) {
                i += 1;
            } else if (b < 0xE0) {
                i += 2;
            } else if (b < 0xF0) {
                i += 3;
            } else if (b < 0xF8) {
                i += 4;
            } else if (b < 0xFC) {
                i += 5;
            } else {
                i += 6;
            }
        }
        return len;
    }

    function compareStrings(string memory a, string memory b)
        internal
        pure
        returns (bool)
    {
        return
            keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b)));
    }
}
