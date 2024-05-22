// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Contribution {
    struct Node {
        string title;
        string[] descriptions;
        uint256 points;
        uint256 lastDripBlock;
    }

    mapping(address => Node[]) public userNodes;
    mapping(address => uint256) public userPoints;

    event NodeAdded(address indexed user, string title, uint256 points);
    event DescriptionAdded(address indexed user, uint256 nodeIndex, string description, uint256 points);

    function addNode(string memory _title) public {
        Node memory newNode = Node({
            title: _title,
            descriptions: new string[],
            points: 10, // Fixed points for adding a node
            lastDripBlock: block.number
        });

        userNodes[msg.sender].push(newNode);
        userPoints[msg.sender] += newNode.points;

        emit NodeAdded(msg.sender, _title, newNode.points);
    }

    // This is a simplified version to demonstrate how contents in a node can also receive funding
    function addDescription(uint256 nodeIndex, string memory _description) public {
        require(nodeIndex < userNodes[msg.sender].length, "Node does not exist");

        Node storage node = userNodes[msg.sender][nodeIndex];
        node.descriptions.push(_description);

        uint256 descriptionPoints = 5; // Fixed points for adding a description
        node.points += descriptionPoints;
        userPoints[msg.sender] += descriptionPoints;

        emit DescriptionAdded(msg.sender, nodeIndex, _description, descriptionPoints);
    }

    function getUserNodes(address _user) external view returns (Node[] memory) {
        return userNodes[_user];
    }

    function getUserPoints(address _user) external view returns (uint256) {
        return userPoints[_user];
    }
}
