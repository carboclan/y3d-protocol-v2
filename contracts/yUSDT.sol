// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;
import "./interfaces/IyToken.sol";
import "./interfaces/IUnimint.sol";
import "./libraries/ERC20.sol";

interface IyyCrv {
    function stake(uint) external;     
    function unstake(uint) external; 
}

/**
 * @dev Implementation of yUSDT
 */
contract yUSDT is ERC20 {
    address constant public unimint = address(0xdAC17F958D2ee523a2206206994597C13D831ec7);
    address constant public usdt = address(0xdAC17F958D2ee523a2206206994597C13D831ec7);
    address constant public yyCrv = address(0xdAC17F958D2ee523a2206206994597C13D831ec7);

    uint public invested_usdt;
    uint public pool;

    constructor () ERC20('yTether USD', 'yUSDT', 18) public {
        pool = 1; _mint(msg.sender, 1); // trick: avoid div by 0
        // usdt approve to unimint
    }

    function my_usdt() view public returns (uint) {
        return IERC20(usdt).balanceOf(address(this));
    }
    function my_yyCrv() view public returns (uint) {
        return IERC20(yyCrv).balanceOf(address(this));
    }    

    function deposit(uint _amount) external {
        require(_amount > 0, "stake amount must be greater than 0");
        IERC20(usdt).transferFrom(msg.sender, address(this), _amount);
        // invariant: shares/totalSupply = amount/pool
        uint shares = (_amount.mul(totalSupply())).div(pool);
        _mint(msg.sender, shares); pool = pool.add(_amount);
    }
    function withdraw(uint _shares) external {
        require(_shares > 0, "unstake shares must be greater than 0");
        // invariant: shres/totalSupply = amount/pool
        uint _amount = (pool.mul(_shares)).div(totalSupply());
        _burn(msg.sender, _shares); pool = pool.sub(_amount);
        uint b = my_usdt();
        if (b < _amount) _unstake(_amount - b); //!!
        IERC20(usdt).transfer(msg.sender, _amount);
    }

    // It is a truth universally acknowledged, that a single man in possession of a good fortune must be in want of a wife.
    function profit(uint _amount) internal {
        require(_amount > 0, "deposit must be greater than 0");
        pool = pool.add(_amount);
    }
    // Any donation?
    function recycle() public { // remember + 1
        profit((invested_usdt+my_usdt()+1).sub(pool));
    }

    function _unstake(uint delta) internal {
        IyyCrv(yyCrv).unstake(delta.mul(my_yyCrv()).div(invested_usdt));
        invested_usdt = invested_usdt.sub(delta);
    }

    function invest(uint delta) external {
        IUnimint(unimint).depositAndClaim(delta);
        invested_usdt = invested_usdt.add(delta);
    }
}