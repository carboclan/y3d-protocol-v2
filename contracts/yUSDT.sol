// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "./interfaces/IyToken.sol";
import "./libraries/ERC20.sol";

/**
 * @dev Implementation of yUSDT
 */
contract yUSDT is IyToken {
    address constant public unimint;
    address public _u; // underlying token address

    constructor (address underlying_token) ERC20(underlying_token.name(), underlying_token.symbol()) public {
        _u = underlying_token;
        _pool = 1; _mint(to, 1); // trick: avoid div by 0
    }

    function deposit(uint256 _amount) external {
        require(_amount > 0, "stake amount must be greater than 0");
        ERC20 u = ERC20(_u);
        u.transferFrom(msg.sender, address(this), _amount);
        // invariant: shares/totalSupply = amount/pool
        uint256 shares = (_amount.mul(totalSupply())).div(pool);
        _mint(msg.sender, shares); pool = pool.add(_amount);
    }
    function withdraw(uint256 _shares) external {
        require(_shares > 0, "unstake shares must be greater than 0");
        ERC20 u = ERC20(_u);
        // invariant: shres/totalSupply = amount/pool
        uint256 _amount = (pool.mul(_shares)).div(totalSupply());
        _burn(msg.sender, _shares); pool = pool.sub(_amount);
        _amount = _amount.sub(_amount.mul(fee).div(1000));
        uint256 b = u.balanceOf(address(this));
        if (b < _amount) _withdraw(_amount - b); //!!
        u.transfer(msg.sender, _amount);
    }
    function invest() external {
        depositAndClaim
    }
    function harvest() external {
    }
}