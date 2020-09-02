// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "./libraries/ERC20.sol";

/**
 * @dev Implementation of the {Iy3dToken} interface.
 */
contract y3dToken is ERC20 {
    address _u; // underlying token address

    constructor (address underlying_token, string memory name, string memory symbol) ERC20(name, symbol) public {
        _u = underlying_token;
    }
}