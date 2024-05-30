import { edgeType } from "@/utils/nodes.utils";
import { Edge, Node, Position } from "reactflow";

export interface FundingState {
	fundingRaised: number;
	fundingRequest: number;
	funders: number;
}

export type NodeStatus = "finished" | "in-progress" | "rfp" | "idle";

export interface NodeData {
	id?: string;
	title: string;
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
}

export type TechTreeLayoutNode = Node<NodeData> & {
	targetPosition?: Position;
	sourcePosition?: Position;
};

export type TechTreeLayoutEdge = EdgeData & {
	type?: typeof edgeType;
};

export type TechTreeData = { nodes: NodeData[]; edges: EdgeData[] };

export interface Contributor {
	address: string;
	ensName?: string;
}

export type TechTreeMode = "move" | "edit";
export type TechTreeAddType = "node" | "edge";
