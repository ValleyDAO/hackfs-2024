import { Edge, Node, Position } from "reactflow";

export interface FundingState {
	fundingRaised: number;
	fundingRequest: number;
	funders: number;
}

export interface NodeData {
	id?: string;
	label: string;
	fundingState?: FundingState;
}

export type TechTreeNode = Node<NodeData> & {
	targetPosition?: Position;
	sourcePosition?: Position;
};

export type TechTreeEdge = Edge;

export type TechTreeData = { nodes: TechTreeNode[]; edges: TechTreeEdge[] };
