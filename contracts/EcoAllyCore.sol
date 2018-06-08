pragma solidity ^0.4.21;

import "./EcoAllyOwnership.sol";

/// @title EcoAllies: Collectable Environmental super heroes  on the Ethereum blockchain.
/// @author Bryson Kruk Design and Development
/// @dev The main EcoAllies Contract, keeps track of all allies.
contract EcoAllyCore is EcoAllyOwnership {
// We break the core contract into multiple files using inheritence, one for each major
    // facet of functionality of EcoAllies. This allows us to keep related code bundled together while still
    // avoiding a single giant file with everything in it. The breakdown is as follows:
    //
    //      - EcoAllyBase: This is where we define the most fundamental code shared throughout the core
    //             functionality. This includes our main data storage, constants and data types, plus
    //             internal functions for managing these items.
    //
    //      - EcoAllyAccessControl: This contract manages the various addresses and constraints for operations
    //             that can be executed only by the CEO.
    //
    //      - EcoAllyOwnership: This provides the methods required for basic non-fungible token
    //             transactions, following the draft ERC-721 spec (https://github.com/ethereum/EIPs/issues/721).

    // Set in case the core contract is broken and an upgrade is required
    address public newContractAddress;

    /// @notice Creates the main EcoAllies smart contract instance.
    constructor() public {
        // Starts Paused.
        paused = true;

        // The Creator of the contract is the initial CEO
        ceoAddress = msg.sender;
    }

    /// @dev Used to mark the smart contract as upgraded, in case there is a serious breaking bug.
    /// This method does nothing but keep track of the new contract and emit a message indicating
    /// that the new address is set. It's up to the clients of the contract to update to the new contract
    /// address in that case. (This contract will be paused indefinitely if such an upgrade takes place.)
    /// @param _v2Address new address
    function setNewAddress(address _v2Address) external onlyCEO whenPaused {
        newContractAddress = _v2Address;
        emit ContractUpgrade(_v2Address);
    }

    /// @notice No tipping!
    /// @dev Reject all Ether from being sent here, hopefully preventing user accidents
    // function() external payable {
     
    // }

    /// @notice Returns all the relevant information about a specific EcoAlly.
    function getEcoAlly(uint256 _id) external view returns(uint256 dna, string name ) {
        EcoAlly storage ally = ecoAllies[_id];
        dna = ally.dna;
        name = ally.name;
    }

    /// @dev Override unpause so it requires all external contract addresses
    ///  to be set before contract can be unpaused. Also, we can't have
    ///  newContractAddress set either, because then the contract was upgraded.
    /// @notice This is public rather than external so we can call super.unpause
    ///  without using an expensive CALL.
    function unpause() public onlyCEO whenPaused {
        require(newContractAddress == address(0));

        // Unpause contract
        super.unpause();
    }

    function testInteraction(uint8 num) external pure returns (uint8 square) {
        square = num * num;
        return square;
    }

    function addAlly(string _name) external returns(address owner) {
        return _createEcoAlly(_name);
    }

    function numAllies() external view returns(uint count) {
        return ecoAllies.length;
    }

    function randNum(uint str) external view returns (uint) {
        return uint(keccak256(str, msg.sender));
    }
    function randDna(string _str) external view returns (uint){
        return _generateRandomDna(_str);
    }

}