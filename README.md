# HackFS-2024: Decentralized Technology Tree
Decentralized Technology Trees (DTT) is an innovative platform designed to map the evolution of technologies through a collaborative, community-driven approach. By leveraging blockchain technology and a decentralized storage system, DTT offers a transparent, secure, and immutable record of technological progress. Our interactive graph interface allows users to explore, contribute, and connect various technologies and sub-fields, enriching our collective understanding of technological advancements.

## Contribution Contract
The Contribution contract is central to managing the technology tree's structure and collaborative interactions. It handles the creation and maintenance of nodes and edges within the technology trees. Each node represents a technology or sub-field and contains details such as title, creator, type, and contributions from users stored as IPFS hashes. Contributions can be tracked and incentivized through a points system managed by the contract.

This contract also handles RFPs (Requests for Proposals) for new content or features, enabling decentralized decision-making. Funding mechanisms are incorporated into nodes through the Treasury struct, allowing funders to finance specific nodes, with transactions timestamped and recorded transparently.

Events are emitted for significant actions like adding nodes, edges, contributions, and funding, providing a comprehensive audit trail for all changes made within the platform.

## FundingDrip Contract
The FundingDrip contract works in conjunction with the Contribution contract to manage financial incentives through a mechanism known as "dripping". This contract calculates the drip amount for users based on their contributions and the duration since the last payout. The calculation is based on a fixed rate per block, modulated by the user's points in specific nodes.

This contract also ensures that payouts are only made when appropriate, preventing fund depletion from unfinished or insufficiently supported nodes. It enables users to withdraw their earned rewards, directly linking the decentralized financial incentives to their contributions in developing the technology tree.

## Overall Functionality
Together, these contracts form a robust framework for a decentralized, collaborative platform where contributors can add value and receive incentives in a transparent and secure manner. The integration of blockchain technology ensures that all interactions within the technology tree are immutable and traceable, fostering trust and encouraging active participation from the community.

This system not only facilitates technological documentation and innovation but also aligns contributor incentives with the platform's growth and success, ensuring sustained engagement and development.

## Key Features
## Decentralized Collaboration
DTT leverages blockchain technology to ensure all contributions to the technology trees are transparent, secure, and immutable. This approach ensures that each modification is traceable and verifiable, promoting trust and reliability within the community.

### Technology Tree Interface
An interactive graph interface is at the core of DTT, allowing users to add nodes representing technologies or sub-fields, link them, and detail their interdependencies and development stages. This interface serves as a dynamic canvas for mapping out the evolution of various technologies.

### Community Incentives
DTT implements a token-based reward system that incentivizes community members to contribute to the technology trees. Contributors earn tokens for valuable inputs, which can be used to vote on crucial platform decisions or exchanged for other benefits, enhancing user engagement and platform growth.

### AI Integration with Galadriel AI
The platform integrates "Galadriel AI", an AI system designed to assist in generating new ideas for nodes, validating the connections between them, and summarizing existing technology descriptions. This AI helps maintain the quality and relevance of the information, ensuring that the technology trees are comprehensive and up-to-date.

### Storage on IPFS
All data related to the graph and contributions are stored on the InterPlanetary File System (IPFS), ensuring decentralization and resistance to censorship. IPFS provides a robust and scalable solution for managing the platform's data needs.

### Web3 and Smart Contract Utilization
DTT uses smart contracts for essential operations such as managing tree node additions, edits, and the distribution of rewards. These contracts also facilitate decentralized identity verification to maintain contributor authenticity and manage reputations within the platform.

### Scalability and User Engagement
Despite being a complex and data-intensive platform, DTT is designed to handle a large number of users and interactions efficiently. The platform also focuses on maintaining high levels of user engagement through effective incentive structures and a user-friendly interface.

These features combine to create a versatile and powerful platform that not only documents technological evolution but also drives innovation and learning across various sectors.

## Tech Specific READMEs
### GALADRIEL AI
You can find the deploying and interaction with out galadriel contract here`./playground/galadriel/README.md`