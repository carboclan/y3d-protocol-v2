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
import "./y_3dtoken.sol";

contract y_3dFactory {

    event y_3dTokenCreated(address indexed from, address indexed underlying_token, address yToken);

    function y_3d(string memory _) internal pure returns (string memory) {
        return string(abi.encodePacked('y', bytes(_), '3d'));
    }

    function create(address u, address yToken) external {
        address y = address(
            new y_3dToken(
                u, yToken,
                y_3d(IERC20(u).name()), y_3d(IERC20(u).symbol()),
                msg.sender
            )
        );
        emit y_3dTokenCreated(msg.sender, u, y);
    }
}