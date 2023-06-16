// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


// Note that these are not soulbound by design. POAP itself is the soulbound NFT.
// owner is the DAO contract
contract MemoryToken is ERC1155, ERC1155Supply, Ownable {

    // id is the POAP NFT (ERC721 address)
    // limitation: 
    //   only supports one network, ERC721 with uint256 id only

    // mapping of token Id to price
    mapping(uint256 => uint256) public prices;

    // mapping of POAP address to token Id
    // 0 - read
    // 1 - write
    mapping(uint256 => mapping(address => uint256)) public memories;
    mapping(uint256 => address) public poaps;

    uint256 public totalMemoryRegistered = 0;

    // mapping of token Id to a list of contributors
    mapping(uint256 => address[]) public contributors;

    // mapping of address to payout
    mapping(address => uint256) public payouts;

    // mapping of used poap proofs
    // TODO make it more efficient
    mapping(address => mapping(uint256 => bool)) public used;

    constructor() ERC1155("") {
    }

    function claimPayout(address to) public {
        require(payouts[to] > 0, "zero payout");
        payouts[to] = 0;
        payable(to).transfer(payouts[to]);
    }

    function addContributors(address poap, address contributor) public onlyOwner {
        // TODO validate contributor
        contributors[memories[0][poap]].push(contributor);
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function setPrice(address poap, uint256 newPrice) public onlyOwner {
        prices[memories[0][poap]] = newPrice;
    }

    function _registerMemory(address poap) internal {
        require(memories[0][poap] == 0, "already registered");
        memories[0][poap] = totalMemoryRegistered + 1;
        memories[1][poap] = totalMemoryRegistered + 2;
        totalMemoryRegistered = totalMemoryRegistered + 2; 
    }

    function grantReadAccess(address account, address poap, uint256 amount, bytes memory data)
        public
        payable
    {
        require(msg.value == prices[memories[0][poap]] * amount, "invalid payment");

        if (memories[0][poap] == 0) {
            _registerMemory(poap);
        }

        // accumulate payouts
        uint256 thanks = prices[memories[0][poap]] * amount / contributors[memories[0][poap]].length;
        for (uint i = 0; i < contributors[memories[0][poap]].length; i++) {
            payouts[account] += thanks;
        }
        // need to pay thanks to data contributors
        _mint(account, memories[0][poap], amount, data);
    }

    function grantWriteAccess(address account, address poap, uint256 poapTokenId, bytes memory data)
        public
    {
        require(ERC721(poap).ownerOf(poapTokenId) == account, "invalid proof");
        require(used[poap][poapTokenId] == false, "proof used");

        if (memories[1][poap] == 0) {
            _registerMemory(poap);
        }

        // free
        _mint(account, memories[1][poap], 1, data);
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function canWrite(address writer, address poap) public view returns (bool) {
        // if they have a MEMORY write token
        return balanceOf(writer, memories[1][poap]) > 0;
    }

    function canRead(address reader, address poap) public view returns (bool) {
        // if they have a MEMORY read token
        // TODO consider implementing expiry on READ access
        return balanceOf(reader, memories[0][poap]) > 0 || balanceOf(reader, memories[1][poap]) > 0;
    }
}