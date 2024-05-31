import {
	EdgeData,
	NodeData,
	TechTreeLayoutEdge,
	TechTreeLayoutNode,
} from "@/typings";
import dagre from "dagre";

export const generateId = () => Math.random().toString(36).substring(2, 9);
export const defaultPosition = { x: 0, y: 0 };
export const edgeType = "smoothstep";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 350;
const nodeHeight = 50;

export function transformTechTreeDataToNode({
	id,
	...data
}: NodeData): TechTreeLayoutNode {
	return {
		id: `${id}` || "",
		type: "tech-tree",
		data: data,
		position: defaultPosition,
	};
}

export function transformEdgeDataToLayoutEdge(
	data: EdgeData,
): TechTreeLayoutEdge {
	return {
		...data,
		type: edgeType,
	};
}

export function getLayoutElements(
	nodes: NodeData[] = [],
	edges: EdgeData[] = [],
): { nodes: TechTreeLayoutNode[]; edges: TechTreeLayoutEdge[] } {
	const initialNodes = nodes.map(transformTechTreeDataToNode);
	const initialEdges = edges.map(transformEdgeDataToLayoutEdge);

	dagreGraph.setGraph({ rankdir: "LR" });

	initialNodes.forEach((node) => {
		dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
	});

	initialEdges.forEach((edge) => {
		dagreGraph.setEdge(edge.source, edge.target);
	});

	dagre.layout(dagreGraph);

	initialNodes.forEach((node) => {
		const nodeWithPosition = dagreGraph.node(node.id);
		// @ts-ignore
		node.targetPosition = "left";
		// @ts-ignore
		node.sourcePosition = "right";

		// We are shifting the dagre node position (anchor=center center) to the top left
		// so it matches the React Flow node anchor point (top left).
		node.position = {
			x: nodeWithPosition.x - nodeWidth / 2,
			y: nodeWithPosition.y - nodeHeight / 2,
		};

		return node;
	});

	return { nodes: initialNodes, edges: initialEdges };
}

export function areAllNodesConnected(
	nodes: NodeData[],
	edges: EdgeData[],
): boolean {
	if (nodes.length === 0) return true; // An empty graph is trivially connected

	const adjList: { [key: string]: string[] } = {};

	// Initialize adjacency list
	nodes.forEach((node) => {
		if (!node.id) return;
		adjList[`${node.id}`] = [];
	});

	// Populate adjacency list
	edges.forEach((edge) => {
		adjList[edge.source].push(edge.target);
		adjList[edge.target].push(edge.source); // Assuming undirected graph for bidirectional connection
	});

	// Function to perform DFS
	const dfs = (nodeId: string, visited: Set<string>) => {
		visited.add(nodeId);
		adjList[nodeId].forEach((neighbor) => {
			if (!visited.has(neighbor)) {
				dfs(neighbor, visited);
			}
		});
	};

	// Perform DFS from the first node
	const visited = new Set<string>();
	if (nodes[0]?.id) dfs(`${nodes[0]?.id}`, visited);

	// Check if all nodes were visited
	return nodes.length === visited.size;
}
