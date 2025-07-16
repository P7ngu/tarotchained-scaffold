pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
//Using 1155 instead of 721, it can be later expanded + can work with batches + works with our collection of cards

import "@openzeppelin/contracts/access/Ownable.sol";

contract TestContract is ERC1155, Ownable {
    uint8 public constant NUM_CARDS = 22; 
    //23 cards in the collection + the RGB one, 8 bit - up to 255 cards, in case of future expansion, change it to uint16

    mapping(uint8 => string) public cardUri; //CardID to CardURI

    constructor(string memory uri_) ERC1155(uri_) Ownable(msg.sender) {
        setupUrisForTesting();
    }

    function setupUrisForTesting () private {
        //Must change this to be scalable and remove extra gas cost
        cardUri[0]  = "ipfs://bafkreifu7wfdmwaiazl4xzpjdmvyt3cijzv3uzgyzq7wwanzgqfcruuqf4";
    }
     //Override ERC-1155’s URI lookup to use mapping, we must use uint256 here, but the func is view only
    function uri(uint256 id) public view override returns (string memory) {
        require(id <= NUM_CARDS, "Invalid card ID");
        uint8 key = uint8(id); //Casting uint256 to uint8, for our mapping to require less space and gas cost
        return cardUri[key];
    }

    // Minting a single card, step by step reward
    function mint(address to, uint256 id, uint256 amount, bytes memory data) public onlyOwner {
        require(id >= 0 && id <= NUM_CARDS, "Invalid card ID"); //Cards from 0 - the fool - to 21
        _mint(to, id, amount, data);
    }

    // Minting a batch of cards, when the user logs in and has to be given all the rewards so far
    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }
}


