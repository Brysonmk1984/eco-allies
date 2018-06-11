pragma solidity ^0.4.21;

import "./EcoAllyBase.sol";
import "./Ownable.sol";
import "./ERC721.sol";

contract EcoAllyOwnership is EcoAllyBase, ERC721 {
    /// @notice Name and symbol of the non fungible token, as defined in ERC721
    ///string public constant name = "EcoAllies";
    ///string public constant symbol = "CK";

    function _owns(address _claimant, uint256 _tokenId) internal view returns (bool) {
        return ecoAllyIndexToOwner[_tokenId] == _claimant;
    }

    
    function _approvedFor(address _claimant, uint256 _tokenId) internal view returns (bool) {
        return ecoAllyIndexToOwner[_tokenId] == _claimant;
    }

    function _approve(uint256 _tokenId, address _approved) internal {
        ecoAllyIndexToApproved[_tokenId] = _approved;
    }

    /// @notice returns the number of EcoAllies currently assigned to a specified address
    /// @dev Required for ERC-721 compliance
    function balanceOf(address _owner) public view returns (uint256 count) {
        return ownershipTokenCount[_owner];
    }

    /// @notice Returns the address currently assigned to this token ID
    /// @dev Required for ERC-721 compliance
    function ownerOf(uint256 _tokenId) external view returns (address owner) {
        owner = ecoAllyIndexToOwner[_tokenId];
        require(owner != address(0));
        return owner;
    }

    /// @notice Transfer an EcoAlly to another address. Make sure it's the correct address or it could be lost forever.
    /// @dev Required for ERC-721 compliance
    function transfer(address _to, uint256 _tokenId) external whenNotPaused {
        // Safety check to prevent against an unexpected 0x0 default.
        require(_to != address(0));
        // Disallow transfers to this contract to prevent accidental misuse.
        require(_to != address(this));
        // You can only send your own EcoAlly
        require(_owns(msg.sender, _tokenId));

        // Reassign ownership, clear pending approvals, emit Transfer event.
        _transfer(msg.sender, _to, _tokenId);
    }

    /// @notice Grants another address the right to transfer a specific EcoAlly via transferFrom(). This is the prefered flow for transfering NFTs to contracts.
    /// @dev Required for ERC-721 comliance
    function approve(address _to, uint256 _tokenId) external whenNotPaused {
        // Only an owner can grant transfer approval
        require(_owns(msg.sender, _tokenId));

        // Register the approval (replacing any previous approval).
        _approve(_tokenId, _to);

        // Emit the Approval event.
        emit Approval(msg.sender, _to, _tokenId);
    }

    /// @notice Transfer an EcoAlly to another address, for which the calling address
    /// has previously been granted transfer approval by the owner.
    /// @dev Required for ERC-721 compliance
    function transferFrom(address _from, address _to, uint256 _tokenId) external whenNotPaused {
        // Safety check to prevent against an unexpected 0x0 default.
        require(_to != address(0));
        // Disallow transfers to this contract to prevent accidental misuse.
        require(_to != address(this));
        // Check for approval and valid ownership
        require(_approvedFor(msg.sender, _tokenId));
        require(_owns(_from, _tokenId));

        // Reassign ownership (also clears pending approvals and emits Transfer events).
        _transfer(_from, _to, _tokenId);
    }

    /// @notice Returns the total number of EcoAllies currently in existence.
    /// @dev Required for ERC-721 compliance.
    function totalSupply() public view returns (uint) {
        return ecoAllies.length - 1;
    }


    /// @notice Returns a list of all EcoAlly IDs assigned to an address.
    /// @param _owner The owner whose EcoAllies we are interested in.
    /// @dev This method MUST NEVER be called by smart contract code. First, it's fairly
    ///  expensive (it walks the entire EcoAlly array looking for cats belonging to owner),
    ///  but it also returns a dynamic array, which is only supported for web3 calls, and
    ///  not contract-to-contract calls.
    function tokensOfOwner(address _owner) external view returns(uint256[] ownerTokens) {
        uint256 tokenCount = balanceOf(_owner);

        if(tokenCount == 0){
            // return an empty array
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](tokenCount);
            uint256 totalEcoAllies = totalSupply();
            uint256 resultIndex = 0;

            // We count on the fact that all allies have IDs starting at 1 and increasing to the
            // totalEcoAllies count.
            uint256 ecoAllyId;

            for(ecoAllyId = 1; ecoAllyId <= totalEcoAllies; ecoAllyId++) {
                if(ecoAllyIndexToOwner[ecoAllyId] == _owner) {
                    result[resultIndex] = ecoAllyId;
                    resultIndex++;
                }
            }

            return result;
        }
    }

}