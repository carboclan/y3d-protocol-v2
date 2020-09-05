// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "./interfaces/IyToken.sol";
import "./interfaces/Iy_3dToken.sol";
import "./libraries/ERC20.sol";

/**
 * @dev Implementation of the {Iy_3dToken} interface.
 */
contract y_3dToken is ERC20, Iy_3dToken {
    address public _u; // underlying token address
    address public _y; // yToken address
    uint public pool;
    address public owner;

    constructor (address underlying_token, address y_token, string memory name, string memory symbol, address to) ERC20(name, symbol) public {
        _u = underlying_token;
        _y = y_token;
        pool = 1;
        _mint(to, 1); // trick: avoid div by 0
        owner = to;
    }

    function stake(uint256 _amount) external {
        require(_amount > 0, "stake amount must be greater than 0");
        ERC20 u = ERC20(_u);
        u.transferFrom(msg.sender, address(this), _amount);
        // invariant: shares/totalSupply = amount/pool
        uint256 shares = (_amount.mul(totalSupply())).div(pool);
        _mint(msg.sender, shares); pool = pool.add(_amount);
    }
    function unstake(uint256 _shares) external {
        require(_shares > 0, "unstake shares must be greater than 0");
        ERC20 u = ERC20(_u);
        // invariant: shres/totalSupply = amount/pool
        uint256 _amount = (pool.mul(_shares)).div(totalSupply());
        _burn(msg.sender, _shares); pool = pool.sub(_amount);
//        _amount = _amount.sub(_amount.mul(fee(msg.sender)).div(1000));
        uint256 b = u.balanceOf(address(this));
        if (b < _amount) _withdraw(_amount - b); //!!
        u.transfer(msg.sender, _amount);
    }

    function _deposit(uint a) internal {
        require(a > 0, "deposit amount must be greater than 0");
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
        require(s > 0, "withdraw amount must be greater than 0");
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