pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
//Using 1155 instead of 721, it can be later expanded + can work with batches + works with our collection of cards

import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";


interface CardsContract {
    error CardsDoesntExist(uint cardId);
    error Failed(uint cardId);
    event CardMinted(uint cardId);
    event BatchCardsMinted(uint[] cardIds);
    event CardAssigned(uint cardId, address to);

}

contract YourContract is ERC1155, CardsContract, Ownable {
    uint8 public constant NUM_CARDS = 22; 
    address public tokenReceiver = 0xc34460FF8B643aF6904fe2C54D2A934287d13BD3;
    //23 cards in the collection + the RGB one, 8 bit - up to 255 cards, in case of future expansion, change it to uint16

    //The address whose private key you use to sign approvals
    address public immutable signer;

    mapping(uint8 => string) public cardUri; //CardID to CardURI

    constructor(string memory uri_)
     ERC1155(uri_)
     Ownable(msg.sender) 
    {
        setupUrisForTesting();
        createCard(0); //Minting the BW card as the first one
    }

    function setTokenReceiver(address _tokenReceiver) public onlyOwner {
        tokenReceiver = _tokenReceiver;
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
    // track per‐user per‐card redemption
    mapping(address => mapping(uint256 => bool)) public hasClaimed;

    //Minting a single card, step by step reward
    using ECDSA for bytes32;
    function mint(bytes calldata signature, uint256 id) external {
        require(id <= NUM_CARDS, "Invalid card ID");
        require(!hasClaimed[msg.sender][id], "Already claimed");

        bytes32 payload = keccak256(
            abi.encodePacked(
                address(this),             // this contract
                block.chainid,             // network ID
                msg.sender,                // who’s claiming
                id                         // which card
            )
        );

         bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19Ethereum Signed Message:\n32",
                payload
            )
        );
        address recovered = ECDSA.recover(digest, signature);
        require(recovered == signer, "Bad signature");

        hasClaimed[msg.sender][id] = true;
        _mint(msg.sender, id, 1, "");
        emit CardMinted(id);
    }

    function oldMint(address to, uint256 id, uint256 amount, bytes memory data) public onlyOwner{
        require(id >= 0 && id <= NUM_CARDS, "Invalid card ID"); //Cards from 0 - the fool - to 21
        _mint(to, id, amount, data);
        emit CardMinted(id);
    }

    // Minting a batch of cards, when the user logs in and has to be given all the rewards so far
    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public onlyOwner{
        _mintBatch(to, ids, amounts, data);
        emit BatchCardsMinted(ids);
    }

    function createCard(uint8 cardId) public onlyOwner {
        require(cardId >= 0 && cardId <= NUM_CARDS, "Invalid card ID");
        //mint(tokenReceiver, cardId, 1, "");
        emit CardAssigned(cardId, tokenReceiver);
    }

     /**
     * Function that allows the contract to receive ETH
     */
    receive() external payable { }
}


