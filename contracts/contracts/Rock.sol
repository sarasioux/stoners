// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/*
Randomness:
    9 Backgrounds
    4 Hair
    5 Arms
    12 Rocks
    9 Hair Accessories
    9 Eyes
    10 Mouths
    7 Noses

*/

contract StonersRock is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    bool public saleIsActive = false;

    uint256 public constant rockPrice = 80000000000000000; //0.08 ETH
    uint public constant maxRockPurchase = 20;
    uint public constant maxRockSupply = 10000;

    uint private constant maxRockImageId = 5670;

    constructor() ERC721("Stoner", "ROCK") {
        // Reserve some stoners for us
        uint i;
        for (i = 0; i < 30; i++) {
            _safeMint(msg.sender, _tokenIdCounter.current());
            _tokenIdCounter.increment();
        }
    }

    /*
    * Pay me, baby.
    */
    function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        msg.sender.transfer(balance);
    }

    /*
    * Pause sale if active, make active if paused.
    */
    function flipSaleState() public onlyOwner {
        saleIsActive = !saleIsActive;
    }

    /**
    * Mints Stoners.
    */
    function mintStoner(uint numberOfTokens) public payable {
        require(saleIsActive, "Sale must be active to mint Stoner");
        require(numberOfTokens <= maxRockPurchase, "Can only mint 20 tokens at a time");
        require(totalSupply().add(numberOfTokens) <= maxRockSupply, "Purchase would exceed max supply of Rocks");
        require(rockPrice.mul(numberOfTokens) <= msg.value, "Ether value sent is not correct");

        for(uint i = 0; i < numberOfTokens; i++) {
            _safeMint(to, _tokenIdCounter.current());
            _tokenIdCounter.increment();
        }

        // Request randomness to get our URL


    }

    function safeMint(address to) public onlyOwner {
        _safeMint(to, _tokenIdCounter.current());
        _tokenIdCounter.increment();
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
