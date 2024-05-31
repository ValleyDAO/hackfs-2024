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

export enum NodeType2 {
	OPTIMISATION = "optimisation",
	DEVELOPMENT = "development",
	RESEARCH = "research",
	END_GOAL = "end-goal",
}

export interface NodeData {
	id?: string;
	title?: string;
	origin?: NodeOrigin;
	type: NodeType;
	fundingState?: FundingState;
	rfp?: {
		compensation: number;
		content: string;
	};
	content?: string;
	status?: NodeStatus;
	contributors?: Contributor[];
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
