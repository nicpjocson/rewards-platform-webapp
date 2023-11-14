// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./HelloToken.sol";

contract RewardsExchange {
    mapping(address => uint256) private _rewards;
    address public owner;
    HelloToken public customToken;

    event TokensExchanged(address indexed user, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor(address _customToken) {
        owner = msg.sender;
        customToken = HelloToken(_customToken);
    }

    function exchangeTokens(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");

        // Transfer ERC-20 tokens from the user to this contract
        require(
            customToken.transferFrom(msg.sender, address(this), amount),
            "Token transfer failed"
        );

        //assuming token to reward points is 1:1
        _rewards[msg.sender] = amount;

        emit TokensExchanged(msg.sender, amount);
    }

    function rewards() public view virtual returns (uint256) {
        return _rewards[msg.sender];
    }
}
