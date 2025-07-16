pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
//Using 1155 instead of 721, it can be later expanded + can work with batches + works with our collection of cards

import "@openzeppelin/contracts/access/Ownable.sol";

interface CardsContract {
    error CardsDoesntExist(uint cardId);
    error Failed(uint cardId);
    event CardMinted(uint cardId);
    event BatchCardsMinted(uint[] cardIds);
    event CardCreated(uint cardId);
    event CardAssigned(uint cardId, address to);
}

contract YourContract is ERC1155, CardsContract, Ownable {
    uint8 public constant NUM_CARDS = 22; //0 to 22 = 23 cards
    //23 cards in the collection + the RGB one, 8 bit - up to 255 cards, in case of future expansion, change it to uint16

    mapping(uint8 => string) public cardUri; //CardID to CardURI

    //Debug stuff
     address public tokenReceiver = 0xc34460FF8B643aF6904fe2C54D2A934287d13BD3;
    function setTokenReceiver(address _tokenReceiver) public onlyOwner {
        tokenReceiver = _tokenReceiver;
    }
    //End of debug stuff

    constructor(string memory uri_)
     ERC1155(uri_)
     Ownable(msg.sender) 
    {
        setupUrisForTesting();
        assignFirstCard(tokenReceiver); //Minting the BW card as the first one
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
    function mint(address to, uint256 id, uint256 amount, bytes memory data) public {
        require(id >= 0 && id <= NUM_CARDS, "Invalid card ID"); //Cards from 0 - the fool - to 21
        _mint(to, id, amount, data);
        emit CardMinted(id);
    }

    // Minting a batch of cards, when the user logs in and has to be given all the rewards so far
    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public {
        _mintBatch(to, ids, amounts, data);
        emit BatchCardsMinted(ids);
    }

    function assignFirstCard(address to) public {
        mint(to, 0, 1, "");
        emit CardAssigned(0, to);
    }

    function assignSpecificCard(uint8 cardId, address to) public {
        require(cardId >= 0 && cardId <= NUM_CARDS, "Invalid card ID");
        mint(to, cardId, 1, "");
        emit CardAssigned(cardId, to);
    }

    function assignCardRandomly(address to) public {
        uint8 randomNumber = generateRandomNumber();
        assignSpecificCard(randomNumber, to);
    }

    // Generate a random number between 1 and NUM_CARDS:
    function generateRandomNumber() public view returns (uint8) {
        uint randNonce = 0;
        uint random = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))) % NUM_CARDS;
        randNonce++;
        return uint8(random + 1);
    }
    //What this would do is take the timestamp of now, the msg.sender,
    // and an incrementing nonce (a number that is only ever used once, so we don't run 
    //the same hash function with the same input parameters twice).
}


