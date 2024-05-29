import { Edge, Node, Position } from "reactflow";

export interface FundingState {
	fundingRaised: number;
	fundingRequest: number;
	funders: number;
}

export type NodeStatus = "finished" | "in-progress" | "rfp";

export interface NodeData {
	id?: string;
	label: string;
	fundingState?: FundingState;
	rfp?: {
		compensation: number;
		content: string;
	};
	content?: string;
	status?: NodeStatus;
	contributors?: Contributor[];
}

export type TechTreeLayoutNode = Node<NodeData> & {
	targetPosition?: Position;
	sourcePosition?: Position;
};

export type TechTreeEdge = Edge;

export type TechTreeData = { nodes: NodeData[]; edges: TechTreeEdge[] };

export interface Contributor {
	address: string;
	ensName?: string;
}

export type TechTreeMode = "move" | "edit";
export type TechTreeAddType = "node" | "edge";
