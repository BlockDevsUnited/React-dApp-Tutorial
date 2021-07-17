// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BDUToken is ERC20("BlockDevsUnited", "BDU") {
    uint256 constant _initial_supply = 2100000000;

    constructor() {
        _mint(msg.sender, _initial_supply);
    }
}
