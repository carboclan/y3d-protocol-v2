// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "./interfaces/Iy_3dToken.sol";
import "./libraries/ERC20.sol";

/**
 * @dev Implementation of the {Iy_3dToken} interface.
 */
contract y_3dToken is ERC20, Iy_3dToken {
    address _u; // underlying token address
    address _y; // yToken address

    constructor (address underlying_token, string memory name, string memory symbol) ERC20(name, symbol) public {
        _u = underlying_token;
    }
}