pragma solidity ^0.4.17;

contract Dice_Game{
    struct dice {
        uint target;
        bool isTargetSet;
        uint rollOutcome;
        uint gamePoint;
    }
    mapping(address => dice) public gameData;

    function createNewTarget( uint targetValue ) public {
        require(gameData[msg.sender].isTargetSet == false);
        gameData[msg.sender].target = targetValue;
        gameData[msg.sender].isTargetSet = true;
        gameData[msg.sender].gamePoint = 0;
    }

    modifier restricted(){
        require(gameData[msg.sender].isTargetSet == true);
        _;
    }

    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, gameData[msg.sender].target));
    } 

    function rollDice() public restricted {
        uint index = (random()%6)+1;
        gameData[msg.sender].rollOutcome = index;
        gameData[msg.sender].isTargetSet = false;
        if( gameData[msg.sender].target == gameData[msg.sender].rollOutcome )
          gameData[msg.sender].gamePoint = 1;
    }

    function viewResults( address player) public view returns( address, uint , uint , uint) {
        return( player, gameData[player].rollOutcome, gameData[player].target, gameData[player].gamePoint);
    }

}