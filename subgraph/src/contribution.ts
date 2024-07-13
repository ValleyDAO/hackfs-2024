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
	EdgeAdded,
	NodeAdded,
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
	let entity = new EdgeAdded(
		event.transaction.hash.concatI32(event.logIndex.toI32()),
	);
	entity.techTreeId = event.params.techTreeId;
	entity.source = event.params.source;
	entity.target = event.params.target;

	entity.blockNumber = event.block.number;
	entity.blockTimestamp = event.block.timestamp;
	entity.transactionHash = event.transaction.hash;

	entity.save();
}

export function handleNodeAdded(event: NodeAddedEvent): void {
	let entity = new NodeAdded(
		event.transaction.hash.concatI32(event.logIndex.toI32()),
	);
	entity.nodeId = event.params.nodeId;
	entity.techTreeId = event.params.techTreeId;
	entity.title = event.params.title;
	entity.nodeType = event.params.nodeType;

	entity.blockNumber = event.block.number;
	entity.blockTimestamp = event.block.timestamp;
	entity.transactionHash = event.transaction.hash;

	entity.save();
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
