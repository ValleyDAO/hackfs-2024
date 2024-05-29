// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Contribution {
    struct RFP {
        address rfp;
        string ipfsHash;
    }

    struct Funder {
        address funder;
        uint256 amount;
        string ipfsHash;
    }

    struct ContributionDetail {
        address contributor;
        string ipfsHash;
    }

    struct Node {
        string title;
        ContributionDetail[] contributions;
        uint256 points;
        address fundingAddress;
        uint256 fundingPool;
        uint256 creationTime;
        bool isFunded;
        bool isFinished;
        Funder funder;
        RFP rfp;
        mapping(address => uint256) lastDripBlock;
    }

    struct Edge {
        string source;
        string target;
        address creator;
        uint256 creationTime;
    }

    struct NodeLite {
        string title;
        ContributionDetail[] contributions;
        uint256 points;
        address fundingAddress;
        uint256 fundingPool;
        uint256 creationTime;
        bool isFunded;
        bool isFinished;
    }

    struct NodeInput {
        string title;
        string ipfsHash;
    }

    struct EdgeInput {
        string source;
        string target;
    }

    Node[] public nodes;
    Edge[] public edges;
    mapping(address => mapping(uint256 => uint256)) public userNodePoints;

    event NodeAdded(uint256 indexed nodeId, string title, uint256 points);
    event EdgeAdded(uint256 indexed edgeId, string source, string target);
    event ContributionAdded(address indexed user, uint256 nodeIndex, string ipfsHash, uint256 points);
    event FundsAdded(uint256 indexed nodeIndex, uint256 amount);
    event NodeFinished(uint256 indexed nodeId);

    function addNode(string memory _title, string memory _ipfsHash) public {
        Node storage newNode = nodes.push();
        newNode.title = _title;
        newNode.points = 10; // Fixed points for adding a node
        newNode.fundingPool = 0;
        newNode.creationTime = block.timestamp;
        newNode.isFinished = false;
        newNode.isFunded = false;
        newNode.rfp = RFP({rfp: msg.sender, ipfsHash: _ipfsHash});

        uint256 nodeId = nodes.length - 1;
        newNode.lastDripBlock[msg.sender] = block.number;

        emit NodeAdded(nodeId, _title, newNode.points);
    }

    function addEdge(string memory _source, string memory _target) public {
        Edge storage newEdge = edges.push();
        newEdge.source = _source;
        newEdge.target = _target;

        newEdge.creationTime = block.timestamp;
        newEdge.creator = msg.sender;

        uint256 edgeId = edges.length - 1;

        emit EdgeAdded(edgeId, _source, _target);
    }

    function updateTechTree(NodeInput[] memory _nodes, EdgeInput[] memory _edges) public {
        for (uint i = 0; i < _nodes.length; i++) {
            addNode(_nodes[i].title, _nodes[i].ipfsHash);
        }
        for (uint i = 0; i < _edges.length; i++) {
            addEdge(_edges[i].source, _edges[i].target);
        }
    }

    function addContribution(uint256 nodeIndex, string memory _ipfsHash) public {
        require(nodeIndex < nodes.length, "Node does not exist");

        Node storage node = nodes[nodeIndex];
        node.contributions.push(ContributionDetail({contributor: msg.sender, ipfsHash: _ipfsHash}));

        uint256 contributionPoints = 5; // Fixed points for adding a contribution
        node.points += contributionPoints;
        userNodePoints[msg.sender][nodeIndex] += contributionPoints;
        node.lastDripBlock[msg.sender] = block.number;

        emit ContributionAdded(msg.sender, nodeIndex, _ipfsHash, contributionPoints);
    }

    function addFunds(uint256 nodeIndex, string memory _ipfsHash) public payable {
        require(nodeIndex < nodes.length, "Node does not exist");
        require(msg.value > 0, "Must send some ether to fund the node");

        Node storage node = nodes[nodeIndex];
        require(node.fundingAddress == address(0) || node.fundingAddress == msg.sender, "Only the funder can add more funds");

        if (node.fundingAddress == address(0)) {
            node.fundingAddress = msg.sender;
        }

        node.fundingPool += msg.value;
        node.isFunded = true;
        node.funder = Funder({funder: msg.sender, amount: msg.value, ipfsHash: _ipfsHash});

        emit FundsAdded(nodeIndex, msg.value);
    }

    function finishNode(uint256 nodeIndex) public {
        require(nodeIndex < nodes.length, "Node does not exist");

        Node storage node = nodes[nodeIndex];
        require(node.funder.funder == msg.sender, "Only the funder can finish the node");
        node.isFinished = true;

        emit NodeFinished(nodeIndex);
    }

    function getNodesLite() external view returns (NodeLite[] memory) {
        NodeLite[] memory nodesLite = new NodeLite[](nodes.length);
        for (uint i = 0; i < nodes.length; i++) {
            Node storage node = nodes[i];
            nodesLite[i] = NodeLite({
                title: node.title,
                contributions: node.contributions,
                points: node.points,
                fundingAddress: node.fundingAddress,
                fundingPool: node.fundingPool,
                creationTime: node.creationTime,
                isFunded: node.isFunded,
                isFinished: node.isFinished
            });
        }
        return nodesLite;
    }

    function getNode(uint256 nodeIndex) external view returns (NodeLite memory) {
        Node storage node = nodes[nodeIndex];
        NodeLite memory nodeLite = NodeLite({
            title: node.title,
            contributions: node.contributions,
            points: node.points,
            fundingAddress: node.fundingAddress,
            fundingPool: node.fundingPool,
            creationTime: node.creationTime,
            isFunded: node.isFunded,
            isFinished: node.isFinished
        });
        return nodeLite;
    }

    function getEdges() external view returns (Edge[] memory) {
        return edges;
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
