import { Edge, Node, Position } from "reactflow";

export type TechTreeNode = Node & {
	targetPosition?: Position;
	sourcePosition?: Position;
};

export type TechTreeEdge = Edge;

export type TechTreeData = { nodes: TechTreeNode[]; edges: TechTreeEdge[] };
