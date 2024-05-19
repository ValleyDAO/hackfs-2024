import { TechTreeEdge, TechTreeNode } from "@/typings";
import dagre from "dagre";

export const defaultPosition = { x: 0, y: 0 };
export const edgeType = "smoothstep";
// generate random number between 1 and 1000000
export const getNodeId = () => Math.random().toString(36).substring(7);
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 225;
const nodeHeight = 50;

export const initialNodes: TechTreeNode[] = [
	{
		id: getNodeId(),
		type: "tech-tree",
		data: { label: "Synthetic Biology" },
		position: defaultPosition,
	},
	{
		id: getNodeId(),
		type: "tech-tree",
		data: { label: "Plant-based Meat" },
		position: defaultPosition,
	},
	{
		id: getNodeId(),
		type: "tech-tree",
		data: { label: "Cell-Cultured Meat" },
		position: defaultPosition,
	},
	{
		id: getNodeId(),
		type: "tech-tree",
		data: { label: "Fermentation-Derived Proteins" },
		position: defaultPosition,
	},
];

export const initialEdges: TechTreeEdge[] = [
	{
		id: "e45",
		source: initialNodes[0].id,
		target: initialNodes[1].id,
		type: edgeType,
	},
	{
		id: "e56",
		source: initialNodes[1].id,
		target: initialNodes[2].id,
		type: edgeType,
	},
	{
		id: "e57",
		source: initialNodes[1].id,
		target: initialNodes[3].id,
		type: edgeType,
	},
];

export function getLayoutElements(
	nodes: TechTreeNode[],
	edges: TechTreeEdge[],
) {
	dagreGraph.setGraph({ rankdir: "LR" });

	nodes.forEach((node) => {
		dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
	});

	edges.forEach((edge) => {
		dagreGraph.setEdge(edge.source, edge.target);
	});

	dagre.layout(dagreGraph);

	nodes.forEach((node) => {
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

	return { nodes, edges };
}
