pragma solidity ^0.6.0;

/*
 ___    ___ ________  ________     
 |\  \  /  /|\_____  \|\   ___ \    
 \ \  \/  / \|____|\ /\ \  \_|\ \   
  \ \    / /      \|\  \ \  \ \\ \  
   \/  /  /      __\_\  \ \  \_\\ \ 
 __/  / /       |\_______\ \_______\
|\___/ /        \|_______|\|_______|
\|___|/                             
                                    */
import "./y3dtoken.sol";

contract y3dFactory {
    
    event y3dTokenCreated(address indexed y);

    function y_3d(string memory _) internal pure returns (string memory) {
        return string(abi.encodePacked('y', bytes(_), '3d'));
    }

    function create(address u) external {
        address y = address(new y3dToken(u, y_3d(IERC20(u).name()), y_3d(IERC20(u).symbol())));
        emit y3dTokenCreated(y);
    }
}