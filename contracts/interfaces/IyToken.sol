pragma solidity ^0.6.0;

interface IyToken {
    function balanceOf(address account) external view returns (uint256);    
    function deposit(uint) external;
    function withdraw(uint) external;  
}