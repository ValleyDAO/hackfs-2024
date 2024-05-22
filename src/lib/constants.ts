"use client";

import { createThirdwebClient, defineChain, getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { SmartWalletOptions, createWallet } from "thirdweb/wallets";
import { inAppWallet } from "thirdweb/wallets/embedded";

const clientId = process.env.NEXT_PUBLIC_THIRD_WEB_KEY || "";

if (!clientId) {
	throw new Error("No client ID provided");
}

export const techTreeAddress = "0xc43e4688c9d9cd9099536e60837361985408538e";
export const chain = defineChain(314159);
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

export const techTreeContract = getContract({
	address: techTreeAddress,
	chain,
	client: web3Client,
	abi: [
		{
			type: "event",
			name: "EdgeAdded",
			inputs: [
				{
					type: "uint256",
					name: "id",
					indexed: true,
					internalType: "uint256",
				},
				{
					type: "uint256",
					name: "startNodeID",
					indexed: false,
					internalType: "uint256",
				},
				{
					type: "uint256",
					name: "endNodeID",
					indexed: false,
					internalType: "uint256",
				},
				{
					type: "address",
					name: "creator",
					indexed: true,
					internalType: "address",
				},
			],
			outputs: [],
			anonymous: false,
		},
		{
			type: "event",
			name: "NodeAdded",
			inputs: [
				{
					type: "uint256",
					name: "id",
					indexed: true,
					internalType: "uint256",
				},
				{
					type: "string",
					name: "title",
					indexed: false,
					internalType: "string",
				},
				{
					type: "address",
					name: "creator",
					indexed: true,
					internalType: "address",
				},
			],
			outputs: [],
			anonymous: false,
		},
		{
			type: "function",
			name: "addEdge",
			inputs: [
				{
					type: "uint256",
					name: "_startNodeID",
					internalType: "uint256",
				},
				{
					type: "uint256",
					name: "_endNodeID",
					internalType: "uint256",
				},
			],
			outputs: [],
			stateMutability: "nonpayable",
		},
		{
			type: "function",
			name: "addNode",
			inputs: [
				{
					type: "string",
					name: "_title",
					internalType: "string",
				},
			],
			outputs: [],
			stateMutability: "nonpayable",
		},
		{
			type: "function",
			name: "edges",
			inputs: [
				{
					type: "uint256",
					name: "",
					internalType: "uint256",
				},
			],
			outputs: [
				{
					type: "uint256",
					name: "id",
					internalType: "uint256",
				},
				{
					type: "uint256",
					name: "startNodeID",
					internalType: "uint256",
				},
				{
					type: "uint256",
					name: "endNodeID",
					internalType: "uint256",
				},
				{
					type: "address",
					name: "creator",
					internalType: "address",
				},
				{
					type: "uint256",
					name: "creationTimestamp",
					internalType: "uint256",
				},
			],
			stateMutability: "view",
		},
		{
			type: "function",
			name: "getEdge",
			inputs: [
				{
					type: "uint256",
					name: "_id",
					internalType: "uint256",
				},
			],
			outputs: [
				{
					type: "tuple",
					name: "",
					components: [
						{
							type: "uint256",
							name: "id",
							internalType: "uint256",
						},
						{
							type: "uint256",
							name: "startNodeID",
							internalType: "uint256",
						},
						{
							type: "uint256",
							name: "endNodeID",
							internalType: "uint256",
						},
						{
							type: "address",
							name: "creator",
							internalType: "address",
						},
						{
							type: "uint256",
							name: "creationTimestamp",
							internalType: "uint256",
						},
					],
					internalType: "struct TechTree.Edge",
				},
			],
			stateMutability: "view",
		},
		{
			type: "function",
			name: "getNode",
			inputs: [
				{
					type: "uint256",
					name: "_id",
					internalType: "uint256",
				},
			],
			outputs: [
				{
					type: "tuple",
					name: "",
					components: [
						{
							type: "uint256",
							name: "id",
							internalType: "uint256",
						},
						{
							type: "string",
							name: "title",
							internalType: "string",
						},
						{
							type: "address",
							name: "creator",
							internalType: "address",
						},
						{
							type: "uint256",
							name: "creationTimestamp",
							internalType: "uint256",
						},
					],
					internalType: "struct TechTree.Node",
				},
			],
			stateMutability: "view",
		},
		{
			type: "function",
			name: "nodes",
			inputs: [
				{
					type: "uint256",
					name: "",
					internalType: "uint256",
				},
			],
			outputs: [
				{
					type: "uint256",
					name: "id",
					internalType: "uint256",
				},
				{
					type: "string",
					name: "title",
					internalType: "string",
				},
				{
					type: "address",
					name: "creator",
					internalType: "address",
				},
				{
					type: "uint256",
					name: "creationTimestamp",
					internalType: "uint256",
				},
			],
			stateMutability: "view",
		},
	],
});

export const accountAbstraction: SmartWalletOptions = {
	chain,
	sponsorGas: true,
	factoryAddress: "0x742BEF7713B22Af6c6f7627EF33Ab3A896a93443",
};
