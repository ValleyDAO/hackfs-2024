// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TechTree {
    // Structure for the nodes
    struct Node {
        uint256 id;
        string nodeTitle;
        string nodeDescription;
        NodeType nodeType;
        address creator;
        uint256 creationTimestamp;
        string keywords;
        uint256 parentNodeID;  // Simplified for single parent. 0 indicates no parent.
        string CID;  // Content Identifier for IPFS, assuming dummy for now
    }

    // Structure for the edges
    struct Edge {
        uint256 id;
        uint256 startNodeID;
        uint256 endNodeID;
        string edgeDescription;
        address creator;
        uint256 creationTimestamp;
    }

    // Enum for the node types
    enum NodeType {
        ScienceSubcategory,
        Proposal,
        ProposalResults,
        Technology,
        Product,
        Services,
        Research,
        ResearchResults,
        ResearchPaper
    }

    // State variables
    Node[] public nodes;
    Edge[] public edges;

    // Event declarations
    event NodeAdded(uint256 indexed id, string title, NodeType nodeType, address indexed creator);
    event EdgeAdded(uint256 indexed id, uint256 startNodeID, uint256 endNodeID, address indexed creator);
    
    // Constructor to initialize the base node
    constructor() {
        addNode(
            "Synthetic Biology",
            "A discipline bridging biology and engineering, aiming to design and construct new biological parts, devices, and systems.",
            NodeType.ScienceSubcategory,
            "biology, engineering, synthetic",
            0,  // No parent node ID for the base node
            "",  // No edge description as there is no parent
            "dummyCID"
        );
    }

    // Function to add a new node
    function addNode(
        string memory _nodeTitle,
        string memory _nodeDescription,
        NodeType _nodeType,
        string memory _keywords,
        uint256 _parentNodeID,
        string memory _edgeDescription,
        string memory _CID
    ) public {
        uint256 nodeId = nodes.length;  // Unique ID based on the current array length
        nodes.push(Node({
            id: nodeId,
            nodeTitle: _nodeTitle,
            nodeDescription: _nodeDescription,
            nodeType: _nodeType,
            creator: msg.sender,
            creationTimestamp: block.timestamp,
            keywords: _keywords,
            parentNodeID: _parentNodeID,
            CID: _CID
        }));

        emit NodeAdded(nodeId, _nodeTitle, _nodeType, msg.sender);


        uint256 edgeId = edges.length;  // Unique ID based on the current array length
        edges.push(Edge({
            id: edgeId,
            startNodeID: _parentNodeID,
            endNodeID: nodeId,
            creator: msg.sender,
            creationTimestamp: block.timestamp,
            edgeDescription: _edgeDescription
        }));

        emit EdgeAdded(edgeId, _parentNodeID, nodeId, msg.sender);
    }

    // Function to add a new edge
    function addEdge(
        uint256 _startNodeID,
        uint256 _endNodeID,
        string memory _edgeDescription
    ) public {
        uint256 edgeId = edges.length;  // Unique ID based on the current array length
        edges.push(Edge({
            id: edgeId,
            startNodeID: _startNodeID,
            endNodeID: _endNodeID,
            creator: msg.sender,
            creationTimestamp: block.timestamp,
            edgeDescription: _edgeDescription
        }));

        emit EdgeAdded(edgeId, _startNodeID, _endNodeID, msg.sender);
    }

    // Function to get a node by ID
    function getNode(uint256 _id) public view returns (Node memory) {
        return nodes[_id];
    }

    // Function to get an edge by ID
    function getEdge(uint256 _id) public view returns (Edge memory) {
        return edges[_id];
    }
}