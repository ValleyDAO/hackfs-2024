// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Contribution.sol";

contract FundingDripContract {
    Contribution public contributionContract;
    mapping(address => uint256) public userLastWithdrawalBlock;

    uint256 public dripRatePerBlock = 1; // Amount to drip per block

    event Drip(address indexed user, uint256 amount);

    constructor(address _contributionContract) {
        contributionContract = Contribution(_contributionContract);
    }

    function calculateDrip(address _user) public view returns (uint256) {
        uint256 totalDripAmount = 0;
        Contribution.Node[] memory nodes = contributionContract.getUserNodes(_user);

        for (uint256 i = 0; i < nodes.length; i++) {
            uint256 blocksPassed = block.number - nodes[i].lastDripBlock;
            uint256 dripAmount = blocksPassed * dripRatePerBlock * nodes[i].points;
            totalDripAmount += dripAmount;
        }

        return totalDripAmount;
    }

    function getBalance(address _user) public view returns (uint256) {
        uint256 lastWithdrawalBlock = userLastWithdrawalBlock[_user];
        uint256 totalDripAmount = 0;

        if (lastWithdrawalBlock > 0) {
            Contribution.Node[] memory nodes = contributionContract.getUserNodes(_user);

            for (uint256 i = 0; i < nodes.length; i++) {
                uint256 blocksPassed = block.number - nodes[i].lastDripBlock;
                uint256 dripAmount = blocksPassed * dripRatePerBlock * nodes[i].points;
                totalDripAmount += dripAmount;
            }
        }

        return totalDripAmount;
    }

    function withdraw() public {
        uint256 dripAmount = calculateDrip(msg.sender);
        uint256 amount = dripAmount;
        require(amount > 0, "No balance to withdraw");

        userLastWithdrawalBlock[msg.sender] = block.number;
        payable(msg.sender).transfer(amount);

        emit Drip(msg.sender, amount);
    }

    // Fallback function to receive Ether
    receive() external payable {}
}
