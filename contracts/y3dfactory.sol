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

    function create(address u) external {
        address y = address(new y3dToken(u, 'y3dtoken', 'y3dtoken'));
        emit y3dTokenCreated(y);
    }
}