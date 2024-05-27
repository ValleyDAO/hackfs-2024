// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Contribution {
    struct Node {
        string title;
        string[] descriptions;
        uint256 points;
        mapping(address => uint256) lastDripBlock;
        uint256 fundingPool;
        uint256 creationTime;
        bool isFinished;
    }

    Node[] public nodes;
    mapping(address => mapping(uint256 => uint256)) public userNodePoints;

    event NodeAdded(uint256 indexed nodeId, string title, uint256 points);
    event DescriptionAdded(address indexed user, uint256 nodeIndex, string description, uint256 points);
    event FundsAdded(uint256 indexed nodeIndex, uint256 amount);
    event NodeFinished(uint256 indexed nodeId);

    function addNode(string memory _title, string[] memory _descriptions) public {
        Node storage newNode = nodes.push();
        newNode.title = _title;
        newNode.descriptions = _descriptions;
        newNode.points = 10; // Fixed points for adding a node
        newNode.fundingPool = 0;
        newNode.creationTime = block.timestamp;
        newNode.isFinished = false;

        uint256 nodeId = nodes.length - 1;
        newNode.lastDripBlock[msg.sender] = block.number;

        emit NodeAdded(nodeId, _title, newNode.points);
    }

    function addDescription(uint256 nodeIndex, string memory _description) public {
        require(nodeIndex < nodes.length, "Node does not exist");

        Node storage node = nodes[nodeIndex];
        node.descriptions.push(_description);

        uint256 descriptionPoints = 5; // Fixed points for adding a description
        node.points += descriptionPoints;
        userNodePoints[msg.sender][nodeIndex] += descriptionPoints;
        node.lastDripBlock[msg.sender] = block.number;

        emit DescriptionAdded(msg.sender, nodeIndex, _description, descriptionPoints);
    }

    function addFunds(uint256 nodeIndex) public payable {
        require(nodeIndex < nodes.length, "Node does not exist");
        require(msg.value > 0, "Must send some ether to fund the node");

        Node storage node = nodes[nodeIndex];
        node.fundingPool += msg.value;

        emit FundsAdded(nodeIndex, msg.value);
    }

    function finishNode(uint256 nodeIndex) public {
        require(nodeIndex < nodes.length, "Node does not exist");

        Node storage node = nodes[nodeIndex];
        node.isFinished = true;

        emit NodeFinished(nodeIndex);
    }

    function getNodes() external view returns (Node[] memory) {
        return nodes;
    }

    function getUserNodePoints(address _user, uint256 nodeIndex) external view returns (uint256) {
        return userNodePoints[_user][nodeIndex];
    }

    function getLastDripBlock(address _user, uint256 nodeIndex) external view returns (uint256) {
        Node storage node = nodes[nodeIndex];
        return node.lastDripBlock[_user];
    }

    function updateLastDripBlock(address _user, uint256 nodeIndex) external {
        Node storage node = nodes[nodeIndex];
        node.lastDripBlock[_user] = block.number;
    }
}
