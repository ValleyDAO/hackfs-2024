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

function transformEdgeDataToLayoutEdge(data: EdgeData): TechTreeLayoutEdge {
	return {
		...data,
		type: edgeType,
	};
}

export const nodesData: NodeData[] = [
	{
		id: "33xkw",
		title: "Synthetic Biology",
	},
	{
		id: "ofxk0l",
		title: "Foundational Knowledge",
	},
	{
		id: "l1lwtv",
		title: "Genetic Engineering",
	},
	{
		id: "ah9ojp",
		title: "Molecular Biology",
	},
	{
		id: "22u5p7",
		title: "Core Techniques",
	},
	{
		id: "9dcbeg",
		title: "DNA Assembly",
	},
	{
		id: "gvomav",
		title: "Protein Engineering",
	},
	{
		id: "iz0ese",
		title: "Enabling Technologies",
	},
	{
		id: "g70yat",
		title: "Bioinformatics",
	},
	{
		id: "gthqe",
		title: "Microfluidics",
	},
	{
		id: "mp1z3o",
		title: "Directed Evolution",
	},
	{
		id: "lun1re",
		title: "Rational Design",
	},
	{
		id: "n2uv9i",
		title: "Protein Folding",
	},
	{
		id: "fwb3dl9",
		title: "Protein Screening",
	},
	{
		id: "9i7mjw",
		title: "Chaperone Proteins",
	},
	{
		id: "ku8zk8",
		title: "Folding Pathways",
	},
	{
		id: "szlku",
		title: "Misfolding and Aggregation",
	},
];

export const initialNodes: TechTreeLayoutNode[] = nodesData?.map(
	transformTechTreeDataToNode,
);

export const initialEdges: EdgeData[] = [
	// Layer 1
	{
		id: "e1",
		source: initialNodes[0].id,
		target: initialNodes[1].id,
	},
	{
		id: "e2",
		source: initialNodes[0].id,
		target: initialNodes[4].id,
	},
	{
		id: "e3",
		source: initialNodes[0].id,
		target: initialNodes[7].id,
	},

	// Layer 2
	{
		id: "e4",
		source: initialNodes[1].id,
		target: initialNodes[2].id,
	},
	{
		id: "e5",
		source: initialNodes[1].id,
		target: initialNodes[3].id,
	},
	{
		id: "e6",
		source: initialNodes[4].id,
		target: initialNodes[5].id,
	},
	{
		id: "e7",
		source: initialNodes[4].id,
		target: initialNodes[6].id,
	},
	{
		id: "e8",
		source: initialNodes[7].id,
		target: initialNodes[8].id,
	},
	{
		id: "e9",
		source: initialNodes[7].id,
		target: initialNodes[9].id,
	},

	// New Layer for Protein Engineering
	{
		id: "e10",
		source: initialNodes[6].id,
		target: initialNodes[10].id,
	},
	{
		id: "e11",
		source: initialNodes[6].id,
		target: initialNodes[11].id,
	},

	// Additional Layer for Directed Evolution
	{
		id: "e12",
		source: initialNodes[10].id,
		target: initialNodes[12].id,
	},
	{
		id: "e13",
		source: initialNodes[10].id,
		target: initialNodes[13].id,
	},
	{
		id: "e14",
		source: initialNodes[12].id,
		target: initialNodes[14].id,
	},
	{
		id: "e15",
		source: initialNodes[12].id,
		target: initialNodes[15].id,
	},
	{
		id: "e16",
		source: initialNodes[12].id,
		target: initialNodes[16].id,
	},
];

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
