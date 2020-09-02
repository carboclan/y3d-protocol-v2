// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "./interfaces/IyToken.sol";
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

    function _deposit(uint a) internal {
        IyToken y = IyToken(_y);
        y.deposit(a);
    }
    function deposit(uint a) external {
        _deposit(a);
    }
    function depositAll() external {
        ERC20 u = ERC20(_u);
        _deposit(u.balanceOf(address(this)));
    }
    function _withdraw(uint s) internal {
        IyToken y = IyToken(_y);
        y.withdraw(s);
    }
    function withdraw(uint s) external {
        _withdraw(s);
    }
    function withdrawAll() external {
        IyToken y = IyToken(_y);        
        _withdraw(y.balanceOf(address(this)));
    }
}