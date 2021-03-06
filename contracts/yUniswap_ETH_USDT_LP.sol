pragma solidity ^0.6.0;

pragma experimental ABIEncoderV2;

import "./libraries/ERC20.sol";

interface IUnimint {
    function depositAndClaim(address, address, uint, uint) external; 
}

interface IUniswap {
    function swapExactTokensForTokens(uint, uint, address[] calldata, address, uint) external;
}

contract ReentrancyGuard {
    uint256 private _guardCounter;

    constructor () internal {
        _guardCounter = 1;
    }

    modifier nonReentrant() {
        _guardCounter += 1;
        uint256 localCounter = _guardCounter;
        _;
        require(localCounter == _guardCounter, "ReentrancyGuard: reentrant call");
    }
}

contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    constructor () internal {
        _owner = address(0x6465F1250c9fe162602Db83791Fc3Fb202D70a7B); //_msgSender();
        emit OwnershipTransferred(address(0), _owner);
    }
    function owner() public view returns (address) {
        return _owner;
    }
    modifier onlyOwner() {
        require(isOwner(), "Ownable: caller is not the owner");
        _;
    }
    function isOwner() public view returns (bool) {
        return _msgSender() == _owner;
    }
    function renounceOwnership() public onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }
    function transferOwnership(address newOwner) public onlyOwner {
        _transferOwnership(newOwner);
    }
    function _transferOwnership(address newOwner) internal {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

library SafeERC20 {
    using SafeMath for uint256;
    using Address for address;

    function safeTransfer(IERC20 token, address to, uint256 value) internal {
        callOptionalReturn(token, abi.encodeWithSelector(token.transfer.selector, to, value));
    }

    function safeTransferFrom(IERC20 token, address from, address to, uint256 value) internal {
        callOptionalReturn(token, abi.encodeWithSelector(token.transferFrom.selector, from, to, value));
    }

    function safeApprove(IERC20 token, address spender, uint256 value) internal {
        require((value == 0) || (token.allowance(address(this), spender) == 0),
            "SafeERC20: approve from non-zero to non-zero allowance"
        );
        callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, value));
    }

    function safeIncreaseAllowance(IERC20 token, address spender, uint256 value) internal {
        uint256 newAllowance = token.allowance(address(this), spender).add(value);
        callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, newAllowance));
    }

    function safeDecreaseAllowance(IERC20 token, address spender, uint256 value) internal {
        uint256 newAllowance = token.allowance(address(this), spender).sub(value, "SafeERC20: decreased allowance below zero");
        callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, newAllowance));
    }
    function callOptionalReturn(IERC20 token, bytes memory data) private {
        require(address(token).isContract(), "SafeERC20: call to non-contract");

        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = address(token).call(data);
        require(success, "SafeERC20: low-level call failed");

        if (returndata.length > 0) { // Return data is optional
            // solhint-disable-next-line max-line-length
            require(abi.decode(returndata, (bool)), "SafeERC20: ERC20 operation did not succeed");
        }
    }
}

interface IStakingRewards {
    function balanceOf(address account) external view returns (uint256);
    // Mutative
    function stake(uint256 amount) external;
    function withdraw(uint256 amount) external;
    function getReward() external;
}

contract yUniswap_ETH_USDT_LP is ERC20, ReentrancyGuard, Ownable {

    modifier onlyY3dHolder() {
        require(y3d.balanceOf(address(msg.sender)) >= y3d_threhold, "insufficient y3d supply");
        _;
    }

    using SafeERC20 for IERC20;
    using Address for address;
    using SafeMath for uint256;
    
    IERC20 constant public S = IERC20(0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852); // Source Token: UNI-LP
    IERC20 constant public T = IERC20(0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984); // Target Token: UNI
    IERC20 constant public y3d = IERC20(0xc7fD9aE2cf8542D71186877e21107E1F3A0b55ef);
    IERC20 constant public WETH = IERC20(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2);

    address constant public USDT = address(0xdAC17F958D2ee523a2206206994597C13D831ec7);
    address constant public miner = address(0x6C3e4cb2E96B01F4b866965A91ed4437839A121a); // Uniswap V2: ETH/USDT UNI Pool
    address constant public uniswap = address(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);
    address public unimint;

    address public UNISWAP_1 = address(0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984); // UNI
    address public UNISWAP_2 = address(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2); // WETH
    address public UNISWAP_3 = address(0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852); // UNI-LP

    uint public pool;

    uint public y3d_threhold = 1e16; // You want to be a Consul?
    mapping (address => uint8) fees; // use P3D to against front-running
  
    constructor () ERC20("yUniswap-ETH/USDT-LP", "yUniswap-ETH/USDT-LP", 18) public {
        pool = 1; _mint(msg.sender, 1); // avoid div by 1
        S.approve(miner, uint(-1));
    }

    function mining() public view returns (uint) {
        return IStakingRewards(miner).balanceOf(address(this));
    }
    function fee(address account) public view returns (uint8) {
        if (fees[account] == 0) return 50; //5%
        if (fees[account] == uint8(-1)) return 0;
        return fees[account];
    }

    /* Basic Panel */
    // Stake S for yS
    function stake(uint256 _amount) public {
        require(_amount > 0, "stake amount must be greater than 0");
        S.transferFrom(msg.sender, address(this), _amount);
        // invariant: shares/totalSupply = amount/pool
        uint256 shares = (_amount.mul(totalSupply())).div(pool);
        _mint(msg.sender, shares); pool = pool.add(_amount);
    }
    // Unstake yS for S  
    function unstake(uint256 _shares) external nonReentrant {
        require(_shares > 0, "unstake shares must be greater than 0");
        // invariant: shres/totalSupply = amount/pool
        uint256 _amount = (pool.mul(_shares)).div(totalSupply());
        _burn(msg.sender, _shares); pool = pool.sub(_amount);
        _amount = _amount.sub(_amount.mul(fee(msg.sender)).div(1000));
        uint256 b = S.balanceOf(address(this));
        if (b < _amount) withdraw(_amount - b);
        S.transfer(msg.sender, _amount);
    }
    // It is a truth universally acknowledged, that a single man in possession of a good fortune must be in want of a wife.
    function profit(uint256 _amount) internal {
        require(_amount > 0, "deposit must be greater than 0");
        pool = pool.add(_amount);
    }
    // Any donation?
    function recycle() public { // remember + 1
        profit((S.balanceOf(address(this))+mining()+1).sub(pool));
    }

    /* Advanced Panel */
    function change_y3d_threhold(uint _y3d_threhold) external onlyOwner {
        y3d_threhold = _y3d_threhold;
    }    
    function setFees(address account, uint8 _fee) external onlyOwner {
        fees[account] = _fee;
    }
    function set_UNISWAP_1(address uni) external onlyOwner {
        UNISWAP_1 = uni;
    }
    function set_UNISWAP_2(address uni) external onlyOwner {
        UNISWAP_2 = uni;
    }
    function set_UNISWAP_3(address uni) external onlyOwner {
        UNISWAP_3 = uni;
    }    
    function set_UNIMINT(address uni) external onlyOwner {
        unimint = uni;
        WETH.approve(unimint, uint(-1));
    }

    function deposit_S(uint a) internal {
        IStakingRewards(miner).stake(a);
    }    
    function allIn() external onlyY3dHolder() {
        deposit_S(S.balanceOf(address(this)));
    }
    function rebalance(uint16 ratio) external onlyY3dHolder() {
        require(ratio <= 1000, "ratio too large");
        uint a = S.balanceOf(address(this));
        uint b = mining();
        uint t = a + b; t = t.mul(ratio).div(1000);
        if (t > b) deposit_S(t-b);
        else withdraw(b-t);
    }
    function withdraw(uint256 _amount) internal {
        IStakingRewards(miner).withdraw(_amount);
    }

    function harvest_to_uniswap() external onlyY3dHolder() {
        IStakingRewards(miner).getReward();        
        uint t = T.balanceOf(address(this));
        require(t > 0, "no enough target token");
        T.safeApprove(uniswap, 0);
        T.safeApprove(uniswap, t);
        address[] memory path = new address[](3);
        path[0] = UNISWAP_1;
        path[1] = UNISWAP_2; 
        path[2] = UNISWAP_3;
        IUniswap(uniswap).swapExactTokensForTokens(t, uint(0), path, address(this), now.add(1800));
        recycle();
    }

    function harvest_and_mint() external onlyY3dHolder() {
        IStakingRewards(miner).getReward();        
        uint t = T.balanceOf(address(this));
        require(t > 0, "no enough target token");
        T.safeApprove(uniswap, 0);
        T.safeApprove(uniswap, t);
        address[] memory path = new address[](2);
        path[0] = UNISWAP_1;
        path[1] = UNISWAP_2;        
        IUniswap(uniswap).swapExactTokensForTokens(t, uint(0), path, address(this), now.add(1800));
        IUnimint(unimint).depositAndClaim(UNISWAP_2, USDT, WETH.balanceOf(address(this)), 0);
        recycle();
    }    

    // In case I make any mistake ...
    // Beta Mode
    bool public alpha = true;
    bool public beta = true;    
    modifier onlyAlpha() {
        require(alpha == true, "only alpha");
        _;
    }
    modifier onlyBeta() {
        require(beta == true, "only beta");
        _;
    }        
    function endAlpha() public onlyOwner {
        alpha = false;
    }    
    function endBeta() public onlyOwner {
        beta = false;
    }
    function withdraw_S() external onlyAlpha {
        S.transfer(owner(), S.balanceOf(address(this)));
    }    
    function withdraw_T() external onlyAlpha {
        T.transfer(owner(), T.balanceOf(address(this)));
    }
    function harvest_beta() external onlyBeta {
        IStakingRewards(miner).getReward();
        T.transfer(owner(), T.balanceOf(address(this)));
    }
}