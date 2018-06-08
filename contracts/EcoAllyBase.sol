pragma solidity ^0.4.21;

import "./EcoAllyAccessControl.sol";

/// @title A non-fungible token expressing the EcoAlly
/// @dev EcoAllyBase contains the base contract which holds structs, events, and base variables
contract EcoAllyBase is EcoAllyAccessControl {
    /// @dev Creation event is fired whenever a new Ally comes into creation
    event Creation(address owner, uint256 ecoAllyId, uint256 ecoAllyDNA);

    /// @dev Transfer event as defined in ERC721 spec. Emitted every time an Ally ownership is assigned, including creation
    event Transfer(address from, address to, uint256 tokenId);
    
    /// @dev Used to generate unique DNA
    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;

    /// @dev The main Eco Ally struct, every Ally is represented by a copy of this structure
    struct EcoAlly{
        // This is supposed to be the secret part
        uint256 dna;
        string name;
    }
    

    /// @dev all EcoAllies in existence. The ID of each ally is actually an index into this array
    /// ID 0 is invalid
    EcoAlly[] ecoAllies;

    /// @dev maps the ally IDs to addresses of the owners
    mapping (uint256 => address) public ecoAllyIndexToOwner;
    /// @dev a mapping from the owner address to the count of tokens they have
    mapping (address => uint256) ownershipTokenCount;
    /// @dev a mapping from the EcoAllyIds to an address that has been approved to call transferFrom()
    /// zero vakue means no approval at this time
    mapping (uint256 => address) public ecoAllyIndexToApproved;

    
    /// @dev Generates Unique DNA
    function _generateRandomDna(string _str) internal view returns (uint) {
        uint rand = uint(keccak256(_str, msg.sender));
        return rand % dnaModulus;
    }

    /// @dev Assign ownership of a specific EcoAlly to a new address
    function _transfer(address _from, address _to, uint256 _tokenId) internal {
        // EcoAlly Token Count - can't go beyond 2^256 or this breaks
        ownershipTokenCount[_to]++;
        // Transfer Ownership
        ecoAllyIndexToOwner[_tokenId] = _to;

        // When creating a new EcoAlly, _from is 0x0, but we can't account for this address
        if(_from != address(0)) {
            ownershipTokenCount[_from]--;
            // Clear previous approved ownership exchange
            delete ecoAllyIndexToApproved[_tokenId];
        }

        // Emit the transfer event
        emit Transfer(_from, _to, _tokenId);
    }

    /// @dev an internal method that creates a new eco ally and stores it
    /// Doesn't do any checking, and should only be called when the input data is known to be accurate.
    /// Will Generate both the birth and transfer events
    function _createEcoAlly(string _name) internal returns (address owner) {
        uint _dna = _generateRandomDna(_name);
        uint256 newEcoAllyId = ecoAllies.push(EcoAlly(_dna, _name)) - 1;
        //ecoAllyIndexToOwner[newEcoAllyId] = msg.sender;
        /// @dev emit the creation event
        emit Creation(msg.sender, newEcoAllyId, _dna);

        // This will assign ownership, and also the Transfer event as per ERC721 draft
        _transfer(0, msg.sender, newEcoAllyId);

        return ecoAllyIndexToOwner[newEcoAllyId];
    }

}