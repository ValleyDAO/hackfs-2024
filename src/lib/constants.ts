"use client";

import { createThirdwebClient, defineChain, getContract } from "thirdweb";
import { createWallet } from "thirdweb/wallets";
import { inAppWallet } from "thirdweb/wallets/embedded";

const clientId = process.env.NEXT_PUBLIC_THIRD_WEB_KEY || "";

if (!clientId) {
	throw new Error("No client ID provided");
}

export const devnet = defineChain({
	id: 1337,
	rpc: "http://localhost:8545",
});

export const testnet = defineChain({
	id: 314159,
});

export const web3Client = createThirdwebClient({
	clientId,
});

export const thirdWebWallets = [
	createWallet("io.metamask"),
	inAppWallet({
		auth: {
			options: ["email", "google", "apple", "facebook"],
		},
	}),
];

const activeNetwork = !!process.env.NEXT_PUBLIC_IS_LOCAL ? devnet : testnet;

export const techTreeContract = getContract({
	address:
		activeNetwork?.id === 1337
			? "0x5FbDB2315678afecb367f032d93F642f64180aa3"
			: "0xEe7b3E7925f6E95528780B67D550152ff988bE7e",
	chain: activeNetwork,
	client: web3Client,
	abi: [
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "user",
					type: "address",
				},
				{
					indexed: false,
					internalType: "uint256",
					name: "nodeIndex",
					type: "uint256",
				},
				{
					indexed: false,
					internalType: "string",
					name: "ipfsHash",
					type: "string",
				},
			],
			name: "ContributionAdded",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "uint256",
					name: "edgeId",
					type: "uint256",
				},
				{
					indexed: false,
					internalType: "uint256",
					name: "techTreeId",
					type: "uint256",
				},
				{
					indexed: false,
					internalType: "string",
					name: "source",
					type: "string",
				},
				{
					indexed: false,
					internalType: "string",
					name: "target",
					type: "string",
				},
			],
			name: "EdgeAdded",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "uint256",
					name: "nodeId",
					type: "uint256",
				},
				{
					indexed: false,
					internalType: "uint256",
					name: "techTreeId",
					type: "uint256",
				},
				{
					indexed: false,
					internalType: "string",
					name: "title",
					type: "string",
				},
				{
					indexed: false,
					internalType: "string",
					name: "nodeType",
					type: "string",
				},
			],
			name: "NodeAdded",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "uint256",
					name: "nodeId",
					type: "uint256",
				},
			],
			name: "NodeFinished",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "uint256",
					name: "nodeIndex",
					type: "uint256",
				},
				{
					indexed: false,
					internalType: "string",
					name: "_ipfsHash",
					type: "string",
				},
			],
			name: "RfpAdded",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "uint256",
					name: "techTreeId",
					type: "uint256",
				},
				{
					indexed: false,
					internalType: "string",
					name: "title",
					type: "string",
				},
			],
			name: "TechTreeAdded",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "uint256",
					name: "techTreeId",
					type: "uint256",
				},
			],
			name: "TechTreeUpdated",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "uint256",
					name: "nodeIndex",
					type: "uint256",
				},
				{
					indexed: false,
					internalType: "uint256",
					name: "amount",
					type: "uint256",
				},
			],
			name: "TreasuryAdded",
			type: "event",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "techTreeId",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "nodeIndex",
					type: "uint256",
				},
				{
					internalType: "string",
					name: "_ipfsHash",
					type: "string",
				},
			],
			name: "addContribution",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "techTreeId",
					type: "uint256",
				},
				{
					internalType: "string",
					name: "_source",
					type: "string",
				},
				{
					internalType: "string",
					name: "_target",
					type: "string",
				},
			],
			name: "addEdge",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "techTreeId",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "nodeIndex",
					type: "uint256",
				},
			],
			name: "addFunds",
			outputs: [],
			stateMutability: "payable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "techTreeId",
					type: "uint256",
				},
				{
					internalType: "string",
					name: "_title",
					type: "string",
				},
				{
					internalType: "string",
					name: "_nodeType",
					type: "string",
				},
			],
			name: "addNode",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "techTreeId",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "nodeIndex",
					type: "uint256",
				},
				{
					internalType: "string",
					name: "_ipfsHash",
					type: "string",
				},
			],
			name: "addRfp",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "string",
					name: "_title",
					type: "string",
				},
			],
			name: "addTechTree",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			name: "edges",
			outputs: [
				{
					internalType: "string",
					name: "source",
					type: "string",
				},
				{
					internalType: "string",
					name: "target",
					type: "string",
				},
				{
					internalType: "uint256",
					name: "techTreeId",
					type: "uint256",
				},
				{
					internalType: "address",
					name: "creator",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "creationTime",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "techTreeId",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "nodeIndex",
					type: "uint256",
				},
			],
			name: "finishNode",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "techTreeId",
					type: "uint256",
				},
			],
			name: "getEdgesByTechTreeId",
			outputs: [
				{
					components: [
						{
							internalType: "string",
							name: "source",
							type: "string",
						},
						{
							internalType: "string",
							name: "target",
							type: "string",
						},
						{
							internalType: "uint256",
							name: "techTreeId",
							type: "uint256",
						},
						{
							internalType: "address",
							name: "creator",
							type: "address",
						},
						{
							internalType: "uint256",
							name: "creationTime",
							type: "uint256",
						},
					],
					internalType: "struct Contribution.Edge[]",
					name: "",
					type: "tuple[]",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "techTreeId",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "nodeIndex",
					type: "uint256",
				},
			],
			name: "getNode",
			outputs: [
				{
					components: [
						{
							internalType: "string",
							name: "title",
							type: "string",
						},
						{
							internalType: "string",
							name: "nodeType",
							type: "string",
						},
						{
							components: [
								{
									internalType: "address",
									name: "contributor",
									type: "address",
								},
								{
									internalType: "string",
									name: "ipfsHash",
									type: "string",
								},
								{
									internalType: "uint256",
									name: "createdAt",
									type: "uint256",
								},
							],
							internalType: "struct Contribution.ContributionDetail[]",
							name: "contributions",
							type: "tuple[]",
						},
						{
							internalType: "uint256",
							name: "createdAt",
							type: "uint256",
						},
						{
							internalType: "address",
							name: "createdBy",
							type: "address",
						},
						{
							internalType: "bool",
							name: "isFinished",
							type: "bool",
						},
						{
							internalType: "uint256",
							name: "techTreeId",
							type: "uint256",
						},
						{
							components: [
								{
									internalType: "address",
									name: "funder",
									type: "address",
								},
								{
									internalType: "uint256",
									name: "amount",
									type: "uint256",
								},
								{
									internalType: "uint256",
									name: "fundedAt",
									type: "uint256",
								},
							],
							internalType: "struct Contribution.Treasury",
							name: "treasury",
							type: "tuple",
						},
						{
							components: [
								{
									internalType: "address",
									name: "writer",
									type: "address",
								},
								{
									internalType: "uint256",
									name: "createdAt",
									type: "uint256",
								},
								{
									internalType: "string",
									name: "ipfsHash",
									type: "string",
								},
							],
							internalType: "struct Contribution.RFP",
							name: "rfp",
							type: "tuple",
						},
					],
					internalType: "struct Contribution.NodeLite",
					name: "",
					type: "tuple",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "techTreeId",
					type: "uint256",
				},
			],
			name: "getNodesAndEdgesFromTechTreeId",
			outputs: [
				{
					components: [
						{
							internalType: "string",
							name: "title",
							type: "string",
						},
						{
							internalType: "string",
							name: "nodeType",
							type: "string",
						},
						{
							components: [
								{
									internalType: "address",
									name: "contributor",
									type: "address",
								},
								{
									internalType: "string",
									name: "ipfsHash",
									type: "string",
								},
								{
									internalType: "uint256",
									name: "createdAt",
									type: "uint256",
								},
							],
							internalType: "struct Contribution.ContributionDetail[]",
							name: "contributions",
							type: "tuple[]",
						},
						{
							internalType: "uint256",
							name: "createdAt",
							type: "uint256",
						},
						{
							internalType: "address",
							name: "createdBy",
							type: "address",
						},
						{
							internalType: "bool",
							name: "isFinished",
							type: "bool",
						},
						{
							internalType: "uint256",
							name: "techTreeId",
							type: "uint256",
						},
						{
							components: [
								{
									internalType: "address",
									name: "funder",
									type: "address",
								},
								{
									internalType: "uint256",
									name: "amount",
									type: "uint256",
								},
								{
									internalType: "uint256",
									name: "fundedAt",
									type: "uint256",
								},
							],
							internalType: "struct Contribution.Treasury",
							name: "treasury",
							type: "tuple",
						},
						{
							components: [
								{
									internalType: "address",
									name: "writer",
									type: "address",
								},
								{
									internalType: "uint256",
									name: "createdAt",
									type: "uint256",
								},
								{
									internalType: "string",
									name: "ipfsHash",
									type: "string",
								},
							],
							internalType: "struct Contribution.RFP",
							name: "rfp",
							type: "tuple",
						},
					],
					internalType: "struct Contribution.NodeLite[]",
					name: "",
					type: "tuple[]",
				},
				{
					components: [
						{
							internalType: "string",
							name: "source",
							type: "string",
						},
						{
							internalType: "string",
							name: "target",
							type: "string",
						},
						{
							internalType: "uint256",
							name: "techTreeId",
							type: "uint256",
						},
						{
							internalType: "address",
							name: "creator",
							type: "address",
						},
						{
							internalType: "uint256",
							name: "creationTime",
							type: "uint256",
						},
					],
					internalType: "struct Contribution.Edge[]",
					name: "",
					type: "tuple[]",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "techTreeId",
					type: "uint256",
				},
			],
			name: "getNodesByTechTreeId",
			outputs: [
				{
					components: [
						{
							internalType: "string",
							name: "title",
							type: "string",
						},
						{
							internalType: "string",
							name: "nodeType",
							type: "string",
						},
						{
							components: [
								{
									internalType: "address",
									name: "contributor",
									type: "address",
								},
								{
									internalType: "string",
									name: "ipfsHash",
									type: "string",
								},
								{
									internalType: "uint256",
									name: "createdAt",
									type: "uint256",
								},
							],
							internalType: "struct Contribution.ContributionDetail[]",
							name: "contributions",
							type: "tuple[]",
						},
						{
							internalType: "uint256",
							name: "createdAt",
							type: "uint256",
						},
						{
							internalType: "address",
							name: "createdBy",
							type: "address",
						},
						{
							internalType: "bool",
							name: "isFinished",
							type: "bool",
						},
						{
							internalType: "uint256",
							name: "techTreeId",
							type: "uint256",
						},
						{
							components: [
								{
									internalType: "address",
									name: "funder",
									type: "address",
								},
								{
									internalType: "uint256",
									name: "amount",
									type: "uint256",
								},
								{
									internalType: "uint256",
									name: "fundedAt",
									type: "uint256",
								},
							],
							internalType: "struct Contribution.Treasury",
							name: "treasury",
							type: "tuple",
						},
						{
							components: [
								{
									internalType: "address",
									name: "writer",
									type: "address",
								},
								{
									internalType: "uint256",
									name: "createdAt",
									type: "uint256",
								},
								{
									internalType: "string",
									name: "ipfsHash",
									type: "string",
								},
							],
							internalType: "struct Contribution.RFP",
							name: "rfp",
							type: "tuple",
						},
					],
					internalType: "struct Contribution.NodeLite[]",
					name: "",
					type: "tuple[]",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "getTechTrees",
			outputs: [
				{
					components: [
						{
							internalType: "string",
							name: "title",
							type: "string",
						},
						{
							internalType: "uint256",
							name: "id",
							type: "uint256",
						},
					],
					internalType: "struct Contribution.TechTree[]",
					name: "",
					type: "tuple[]",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "_user",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "nodeIndex",
					type: "uint256",
				},
			],
			name: "getUserNodePoints",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "techTreeId",
					type: "uint256",
				},
				{
					internalType: "address",
					name: "_user",
					type: "address",
				},
			],
			name: "getUserParticipatedNodes",
			outputs: [
				{
					components: [
						{
							internalType: "uint256",
							name: "points",
							type: "uint256",
						},
						{
							components: [
								{
									internalType: "string",
									name: "title",
									type: "string",
								},
								{
									internalType: "string",
									name: "nodeType",
									type: "string",
								},
								{
									components: [
										{
											internalType: "address",
											name: "contributor",
											type: "address",
										},
										{
											internalType: "string",
											name: "ipfsHash",
											type: "string",
										},
										{
											internalType: "uint256",
											name: "createdAt",
											type: "uint256",
										},
									],
									internalType: "struct Contribution.ContributionDetail[]",
									name: "contributions",
									type: "tuple[]",
								},
								{
									internalType: "uint256",
									name: "createdAt",
									type: "uint256",
								},
								{
									internalType: "address",
									name: "createdBy",
									type: "address",
								},
								{
									internalType: "bool",
									name: "isFinished",
									type: "bool",
								},
								{
									internalType: "uint256",
									name: "techTreeId",
									type: "uint256",
								},
								{
									components: [
										{
											internalType: "address",
											name: "funder",
											type: "address",
										},
										{
											internalType: "uint256",
											name: "amount",
											type: "uint256",
										},
										{
											internalType: "uint256",
											name: "fundedAt",
											type: "uint256",
										},
									],
									internalType: "struct Contribution.Treasury",
									name: "treasury",
									type: "tuple",
								},
								{
									components: [
										{
											internalType: "address",
											name: "writer",
											type: "address",
										},
										{
											internalType: "uint256",
											name: "createdAt",
											type: "uint256",
										},
										{
											internalType: "string",
											name: "ipfsHash",
											type: "string",
										},
									],
									internalType: "struct Contribution.RFP",
									name: "rfp",
									type: "tuple",
								},
							],
							internalType: "struct Contribution.NodeLite",
							name: "node",
							type: "tuple",
						},
					],
					internalType: "struct Contribution.UserNodePoints[]",
					name: "",
					type: "tuple[]",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			name: "nodes",
			outputs: [
				{
					internalType: "string",
					name: "title",
					type: "string",
				},
				{
					internalType: "string",
					name: "nodeType",
					type: "string",
				},
				{
					internalType: "uint256",
					name: "createdAt",
					type: "uint256",
				},
				{
					internalType: "address",
					name: "creator",
					type: "address",
				},
				{
					internalType: "bool",
					name: "isFinished",
					type: "bool",
				},
				{
					components: [
						{
							internalType: "address",
							name: "funder",
							type: "address",
						},
						{
							internalType: "uint256",
							name: "amount",
							type: "uint256",
						},
						{
							internalType: "uint256",
							name: "fundedAt",
							type: "uint256",
						},
					],
					internalType: "struct Contribution.Treasury",
					name: "treasury",
					type: "tuple",
				},
				{
					internalType: "uint256",
					name: "techTreeId",
					type: "uint256",
				},
				{
					components: [
						{
							internalType: "address",
							name: "writer",
							type: "address",
						},
						{
							internalType: "uint256",
							name: "createdAt",
							type: "uint256",
						},
						{
							internalType: "string",
							name: "ipfsHash",
							type: "string",
						},
					],
					internalType: "struct Contribution.RFP",
					name: "rfp",
					type: "tuple",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			name: "techTrees",
			outputs: [
				{
					internalType: "string",
					name: "title",
					type: "string",
				},
				{
					internalType: "uint256",
					name: "id",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "techTreeId",
					type: "uint256",
				},
				{
					components: [
						{
							internalType: "string",
							name: "title",
							type: "string",
						},
						{
							internalType: "string",
							name: "nodeType",
							type: "string",
						},
					],
					internalType: "struct Contribution.NodeInput[]",
					name: "_nodes",
					type: "tuple[]",
				},
				{
					components: [
						{
							internalType: "string",
							name: "source",
							type: "string",
						},
						{
							internalType: "string",
							name: "target",
							type: "string",
						},
					],
					internalType: "struct Contribution.EdgeInput[]",
					name: "_edges",
					type: "tuple[]",
				},
			],
			name: "updateTechTree",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			name: "userNodePoints",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
	],
});
