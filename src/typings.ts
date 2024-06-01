import { edgeType } from "@/utils/nodes.utils";
import { Node, Position } from "reactflow";

export interface FundingState {
	fundingRaised: number;
	fundingRequest: number;
	funders: number;
}

export type NodeStatus = "finished" | "in-progress" | "rfp" | "idle";
export type NodeOrigin = "on-chain" | "off-chain";

export type NodeType = "optimisation" | "development" | "research" | "end-goal";
export const NodeTypeValues: NodeType[] = [
	"optimisation",
	"development",
	"research",
	"end-goal",
];

export interface ResearchContribution {
	contributor: string;
	createdAt: Date;
	ipfsHash: string;
}

export interface RequestForProposal {
	writer?: string;
	createdAt: Date;
	ipfsHash: string;
}

export interface ResearchTreasury {
	amount: bigint;
	funder: string;
	fundedAt: Date;
}

export interface TechTree {
	title: string;
	id: bigint;
}

export interface NodeData {
	id?: bigint;
	title?: string;
	createdBy?: string;
	createdAt?: Date;
	origin?: NodeOrigin;
	type: NodeType;
	fundingState?: FundingState;
	rfp?: RequestForProposal;
	contributions?: ResearchContribution[];
	status?: NodeStatus;
	contributors?: Contributor[];
	treasury?: ResearchTreasury;
	isFinished?: boolean;
}

export interface EdgeData {
	id: string;
	source: string;
	target: string;
	origin?: NodeOrigin;
}

export type TechTreeLayoutNode = Node<NodeData> & {
	targetPosition?: Position;
	sourcePosition?: Position;
};

export type TechTreeLayoutEdge = EdgeData & {
	type?: typeof edgeType;
};

export interface Contributor {
	address: string;
	ensName?: string;
}

export type TechTreeMode = "move" | "edit";
export type TechTreeAddType = "node" | "edge";

export interface SelectOptionItem {
	label: string;
	value: string;
}
