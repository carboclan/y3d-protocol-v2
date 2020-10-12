// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;
import "./interfaces/IyToken.sol";
import "./interfaces/Iy_3dToken.sol";
import "./libraries/ERC20.sol";

contract Ownable {

    address public _owner;
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(_owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

/**
 * @dev Implementation of the {Iy_3dToken} interface.
 */
contract y_3dToken is ERC20, Iy_3dToken, Ownable {
    address public _u; // underlying token address
    address public _y; // yToken address
    uint public pool; // How many u token in the pool
    uint8 public _fee; // P3D exit fee

    constructor (address u_token, address y_token, uint8 fee, string memory name, string memory symbol, uint8 decimals, address to) ERC20(name, symbol, decimals) public {
        _u = u_token;
        if (y_token != address(0)) {
            _y = y_token;
            approveUtoY();
        }
        pool = 1; _mint(to, 1); // trick: avoid div by 0
        _fee = fee; _owner = to;
    }

    function stake(uint256 _amount) external {
        require(_amount > 0, "stake amount must be greater than 0");
        ERC20 u = ERC20(_u);
        u.transferFrom(msg.sender, address(this), _amount);
        // invariant: shares/totalSupply = amount/pool
        uint256 shares = (_amount.mul(totalSupply())).div(pool);
        _mint(msg.sender, shares); pool = pool.add(_amount);
    }

    function unstake(uint256 _shares) public {
        require(_shares > 0, "unstake shares must be greater than 0");
        ERC20 u = ERC20(_u);
        // invariant: shres/totalSupply = amount/pool
        uint256 _amount = (pool.mul(_shares)).div(totalSupply());
        _burn(msg.sender, _shares); pool = pool.sub(_amount);
        _amount = _amount.sub(_amount.mul(_fee).div(1000));
        uint256 b = u.balanceOf(address(this));
        if (b < _amount) _withdraw(_amount - b);
        u.transfer(msg.sender, _amount);
    }

    function profit(uint256 _amount) internal {
        require(_amount > 0, "deposit must be greater than 0");
        pool = pool.add(_amount);
    }
    
    function recycle() public {
        profit(ERC20(_u).balanceOf(address(this)).add(1).sub(pool));
    }

    function sync() public {
        _withdrawAll(); recycle(); depositAll();
    }

    function syncAndUnstake(uint256 _shares) external {
        sync(); unstake(_shares);
    }

    function setFee(uint8 fee) external onlyOwner() {
        _fee = fee;
    }

    function setY(address y) public onlyOwner() {
        unApproveUtoY(); _y = y; approveUtoY();
    }

    function unApproveUtoY() internal {
        ERC20(_u).approve(_y, 0);
    }

    function approveUtoY() internal {
        ERC20(_u).approve(_y, uint(-1));
    }    

    function deposit(uint a) public {
        require(a > 0, "deposit amount must be greater than 0");
        IyToken y = IyToken(_y);
        y.deposit(a);
    }
    function depositAll() public {
        ERC20 u = ERC20(_u);
        deposit(u.balanceOf(address(this)));
    }
    function _withdraw(uint s) internal {
        require(s > 0, "withdraw amount must be greater than 0");
        IyToken y = IyToken(_y);
        y.withdraw(s);
    }
    function _withdrawAll() internal {
        IyToken y = IyToken(_y);
        _withdraw(y.balanceOf(address(this)));
    }
    function withdraw(uint s) external onlyOwner() {
        _withdraw(s);
    }    
    function withdrawAll() external onlyOwner() {
        _withdrawAll();
    }
}