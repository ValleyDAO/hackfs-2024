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
		data: { label: "Foundational Knowledge" },
		position: defaultPosition,
	},
	{
		id: getNodeId(),
		type: "tech-tree",
		data: { label: "Genetic Engineering" },
		position: defaultPosition,
	},
	{
		id: getNodeId(),
		type: "tech-tree",
		data: { label: "Molecular Biology" },
		position: defaultPosition,
	},
	{
		id: getNodeId(),
		type: "tech-tree",
		data: { label: "Core Techniques" },
		position: defaultPosition,
	},
	{
		id: getNodeId(),
		type: "tech-tree",
		data: { label: "DNA Assembly" },
		position: defaultPosition,
	},
	{
		id: getNodeId(),
		type: "tech-tree",
		data: { label: "Protein Engineering" },
		position: defaultPosition,
	},
	{
		id: getNodeId(),
		type: "tech-tree",
		data: { label: "Enabling Technologies" },
		position: defaultPosition,
	},
	{
		id: getNodeId(),
		type: "tech-tree",
		data: { label: "Bioinformatics" },
		position: defaultPosition,
	},
	{
		id: getNodeId(),
		type: "tech-tree",
		data: { label: "Microfluidics" },
		position: defaultPosition,
	},
	{
		id: getNodeId(),
		type: "tech-tree",
		data: { label: "Directed Evolution" },
		position: defaultPosition,
	},
	{
		id: getNodeId(),
		type: "tech-tree",
		data: { label: "Rational Design" },
		position: defaultPosition,
	},
	{
		id: getNodeId(),
		type: "tech-tree",
		data: { label: "Protein Folding" },
		position: defaultPosition,
	},
	{
		id: getNodeId(),
		type: "tech-tree",
		data: { label: "Protein Screening" },
		position: defaultPosition,
	},
	{
		id: getNodeId(),
		type: "tech-tree",
		data: { label: "Chaperone Proteins" },
		position: defaultPosition,
	},
	{
		id: getNodeId(),
		type: "tech-tree",
		data: { label: "Folding Pathways" },
		position: defaultPosition,
	},
	{
		id: getNodeId(),
		type: "tech-tree",
		data: { label: "Misfolding and Aggregation" },
		position: defaultPosition,
	},
];

export const initialEdges: TechTreeEdge[] = [
	// Layer 1
	{
		id: "e1",
		source: initialNodes[0].id,
		target: initialNodes[1].id,
		type: edgeType,
	},
	{
		id: "e2",
		source: initialNodes[0].id,
		target: initialNodes[4].id,
		type: edgeType,
	},
	{
		id: "e3",
		source: initialNodes[0].id,
		target: initialNodes[7].id,
		type: edgeType,
	},

	// Layer 2
	{
		id: "e4",
		source: initialNodes[1].id,
		target: initialNodes[2].id,
		type: edgeType,
	},
	{
		id: "e5",
		source: initialNodes[1].id,
		target: initialNodes[3].id,
		type: edgeType,
	},
	{
		id: "e6",
		source: initialNodes[4].id,
		target: initialNodes[5].id,
		type: edgeType,
	},
	{
		id: "e7",
		source: initialNodes[4].id,
		target: initialNodes[6].id,
		type: edgeType,
	},
	{
		id: "e8",
		source: initialNodes[7].id,
		target: initialNodes[8].id,
		type: edgeType,
	},
	{
		id: "e9",
		source: initialNodes[7].id,
		target: initialNodes[9].id,
		type: edgeType,
	},

	// New Layer for Protein Engineering
	{
		id: "e10",
		source: initialNodes[6].id,
		target: initialNodes[10].id,
		type: edgeType,
	},
	{
		id: "e11",
		source: initialNodes[6].id,
		target: initialNodes[11].id,
		type: edgeType,
	},

	// Additional Layer for Directed Evolution
	{
		id: "e12",
		source: initialNodes[10].id,
		target: initialNodes[12].id,
		type: edgeType,
	},
	{
		id: "e13",
		source: initialNodes[10].id,
		target: initialNodes[13].id,
		type: edgeType,
	},
	{
		id: "e14",
		source: initialNodes[12].id,
		target: initialNodes[14].id,
		type: edgeType,
	},
	{
		id: "e15",
		source: initialNodes[12].id,
		target: initialNodes[15].id,
		type: edgeType,
	},
	{
		id: "e16",
		source: initialNodes[12].id,
		target: initialNodes[16].id,
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
