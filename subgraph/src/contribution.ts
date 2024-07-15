import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
	ContributionAdded as ContributionAddedEvent,
	EdgeAdded as EdgeAddedEvent,
	NodeAdded as NodeAddedEvent,
	NodeFinished as NodeFinishedEvent,
	RfpAdded as RfpAddedEvent,
	TechTreeAdded as TechTreeAddedEvent,
	TechTreeUpdated as TechTreeUpdatedEvent,
	TreasuryAdded as TreasuryAddedEvent,
} from "../generated/Contribution/Contribution";
import {
	ContributionAdded,
	Edge,
	Node,
	NodeFinished,
	RfpAdded,
	TechTree,
	TechTreeAdded,
	TechTreeUpdated,
	TreasuryAdded,
} from "../generated/schema";

export function handleContributionAdded(event: ContributionAddedEvent): void {
	let entity = new ContributionAdded(
		event.transaction.hash.concatI32(event.logIndex.toI32()),
	);
	entity.user = event.params.user;
	entity.nodeId = event.params.nodeId;
	entity.ipfsHash = event.params.ipfsHash;

	entity.blockNumber = event.block.number;
	entity.blockTimestamp = event.block.timestamp;
	entity.transactionHash = event.transaction.hash;

	entity.save();
}

export function handleEdgeAdded(event: EdgeAddedEvent): void {
	let edge = new Edge(`${event.params.id}`);
	edge.source = event.params.source;
	edge.source = event.params.source;
	edge.target = event.params.target;
	edge.techTree = event.params.techTreeId.toString();
	edge.blockNumber = event.block.number;
	edge.blockTimestamp = event.block.timestamp;
	edge.transactionHash = event.transaction.hash;
	edge.save();

	updateTechTree(
		event.params.techTreeId.toString(),
		event.block.number,
		event.block.timestamp,
		event.transaction.hash,
	);
}

export function handleNodeAdded(event: NodeAddedEvent): void {
	let node = new Node(event.params.id);
	node.title = event.params.title;
	node.nodeType = event.params.nodeType;
	node.techTree = event.params.techTreeId.toString();
	node.blockNumber = event.block.number;
	node.blockTimestamp = event.block.timestamp;
	node.transactionHash = event.transaction.hash;
	node.save();

	updateTechTree(
		event.params.techTreeId.toString(),
		event.block.number,
		event.block.timestamp,
		event.transaction.hash,
	);
}

function updateTechTree(
	techTreeId: string,
	blockNumber: BigInt,
	blockTimestamp: BigInt,
	transactionHash: Bytes,
): void {
	let techTree = TechTree.load(techTreeId);
	if (techTree) {
		techTree.lastUpdatedBlockNumber = blockNumber;
		techTree.lastUpdatedBlockTimestamp = blockTimestamp;
		techTree.lastUpdatedTransactionHash = transactionHash;
		techTree.save();
	}
}

export function handleNodeFinished(event: NodeFinishedEvent): void {
	let entity = new NodeFinished(
		event.transaction.hash.concatI32(event.logIndex.toI32()),
	);
	entity.nodeId = event.params.nodeId;

	entity.blockNumber = event.block.number;
	entity.blockTimestamp = event.block.timestamp;
	entity.transactionHash = event.transaction.hash;

	entity.save();
}

export function handleRfpAdded(event: RfpAddedEvent): void {
	let entity = new RfpAdded(
		event.transaction.hash.concatI32(event.logIndex.toI32()),
	);
	entity.nodeId = event.params.nodeId;
	entity._ipfsHash = event.params._ipfsHash;

	entity.blockNumber = event.block.number;
	entity.blockTimestamp = event.block.timestamp;
	entity.transactionHash = event.transaction.hash;

	entity.save();
}

export function handleTechTreeAdded(event: TechTreeAddedEvent): void {
	let entity = new TechTreeAdded(
		event.transaction.hash.concatI32(event.logIndex.toI32()),
	);
	entity.techTreeId = event.params.techTreeId;
	entity.title = event.params.title;
	entity.blockNumber = event.block.number;
	entity.blockTimestamp = event.block.timestamp;
	entity.transactionHash = event.transaction.hash;
	entity.save();

	let techTree = new TechTree(event.params.techTreeId.toString());
	techTree.techTreeId = event.params.techTreeId;
	techTree.title = event.params.title;
	techTree.lastUpdatedBlockNumber = event.block.number;
	techTree.lastUpdatedBlockTimestamp = event.block.timestamp;
	techTree.lastUpdatedTransactionHash = event.transaction.hash;
	techTree.save();
}

export function handleTechTreeUpdated(event: TechTreeUpdatedEvent): void {
	let entity = new TechTreeUpdated(
		event.transaction.hash.concatI32(event.logIndex.toI32()),
	);
	entity.techTreeId = event.params.techTreeId;
	entity.blockNumber = event.block.number;
	entity.blockTimestamp = event.block.timestamp;
	entity.transactionHash = event.transaction.hash;
	entity.save();

	let techTree = TechTree.load(event.params.techTreeId.toString());
	if (techTree) {
		techTree.lastUpdatedBlockNumber = event.block.number;
		techTree.lastUpdatedBlockTimestamp = event.block.timestamp;
		techTree.lastUpdatedTransactionHash = event.transaction.hash;
		techTree.save();
	}
}

export function handleTreasuryAdded(event: TreasuryAddedEvent): void {
	let entity = new TreasuryAdded(
		event.transaction.hash.concatI32(event.logIndex.toI32()),
	);
	entity.nodeId = event.params.nodeId;
	entity.amount = event.params.amount;

	entity.blockNumber = event.block.number;
	entity.blockTimestamp = event.block.timestamp;
	entity.transactionHash = event.transaction.hash;

	entity.save();
}
