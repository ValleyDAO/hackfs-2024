import {EdgeData, NodeData, NodeType, OnChainEdgeData, OnChainNodeData} from "@/typings";

export function parseOnChainNodeToNodeData(node: OnChainNodeData): NodeData {
	return {
		id: node.id,
		title: node.title,
		type: node.nodeType as NodeType,
		origin: "on-chain",
	} as NodeData;
}

export function parseOnChainEdgeToEdgeData(edge: OnChainEdgeData, idx: number): EdgeData {
	return {
		id: edge.id,
		source: edge.source,
		target: edge.target,
		origin: "on-chain",
	} as EdgeData;
}
