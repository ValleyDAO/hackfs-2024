import {
	NodeData,
	TechTreeData,
	TechTreeEdge,
	TechTreeLayoutNode,
} from "@/typings";
import dagre from "dagre";

export const defaultPosition = { x: 0, y: 0 };
export const edgeType = "smoothstep";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 225;
const nodeHeight = 50;

function transformTechTreeDataToNode({
	id,
	...data
}: NodeData): TechTreeLayoutNode {
	return {
		id: id || "",
		type: "tech-tree",
		data: data,
		position: defaultPosition,
	};
}

export const nodesData: NodeData[] = [
	{
		id: "33xkw",
		label: "Synthetic Biology",
	},
	{
		id: "ofxk0l",
		label: "Foundational Knowledge",
	},
	{
		id: "l1lwtv",
		label: "Genetic Engineering",
	},
	{
		id: "ah9ojp",
		label: "Molecular Biology",
	},
	{
		id: "22u5p7",
		label: "Core Techniques",
	},
	{
		id: "9dcbeg",
		label: "DNA Assembly",
	},
	{
		id: "gvomav",
		label: "Protein Engineering",
	},
	{
		id: "iz0ese",
		label: "Enabling Technologies",
	},
	{
		id: "g70yat",
		label: "Bioinformatics",
	},
	{
		id: "gthqe",
		label: "Microfluidics",
	},
	{
		id: "mp1z3o",
		label: "Directed Evolution",
	},
	{
		id: "lun1re",
		label: "Rational Design",
	},
	{
		id: "n2uv9i",
		label: "Protein Folding",
	},
	{
		id: "fwb3dl9",
		label: "Protein Screening",
	},
	{
		id: "9i7mjw",
		label: "Chaperone Proteins",
	},
	{
		id: "ku8zk8",
		label: "Folding Pathways",
	},
	{
		id: "szlku",
		label: "Misfolding and Aggregation",
	},
];

export const initialNodes: TechTreeLayoutNode[] = nodesData?.map(
	transformTechTreeDataToNode,
);

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
	nodes: NodeData[] = [],
	edges: TechTreeEdge[] = [],
): { nodes: TechTreeLayoutNode[]; edges: TechTreeEdge[] } {
	const initialNodes = nodes.map(transformTechTreeDataToNode);

	dagreGraph.setGraph({ rankdir: "LR" });

	initialNodes.forEach((node) => {
		dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
	});

	edges.forEach((edge) => {
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

	return { nodes: initialNodes, edges };
}
