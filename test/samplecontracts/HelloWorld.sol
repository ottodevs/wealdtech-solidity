pragma solidity ^0.4.11;


// Simple hello world contract
contract HelloWorld {
    uint256 HELLO_WORLD = 0x4e110;
    function hello() public constant returns (uint256) {
        return HELLO_WORLD;
    }
}
