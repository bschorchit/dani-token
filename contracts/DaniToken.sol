pragma solidity ^0.6.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DaniToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("DaniCohen", "DANI") public {
        _mint(msg.sender, initialSupply);
    }
}