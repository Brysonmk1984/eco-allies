pragma solidity ^0.4.21;

//// @dev EcoAllyAccessControl is intended for top level access to special functions only from the CEO
contract EcoAllyAccessControl {

    /// @dev Emited when contract is upgraded - See README.md for updgrade plan
    event ContractUpgrade(address newContract);
    
    // CEO address for privledged function calls
    address public ceoAddress;

    // Keep track of whether the game is paused or not
    bool public paused = false;

    modifier onlyCEO(){
        require(msg.sender == ceoAddress);
        _;
    }

    function setCEO(address _newCEO) external onlyCEO {
        require(_newCEO != address(0));
        ceoAddress = _newCEO;
    }

    modifier whenNotPaused(){
        require(!paused);
        _;
    }

    modifier whenPaused(){
        require(paused);
        _;
    }

    function pause() external onlyCEO whenNotPaused {
        paused = true;
    }

    function unpause() public onlyCEO whenPaused {
        paused = false;
    }
}