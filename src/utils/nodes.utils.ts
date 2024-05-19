import { TechTreeEdge, TechTreeNode } from "@/typings";

const position = { x: 0, y: 0 };
const edgeType = "smoothstep";

export const initialNodes: TechTreeNode[] = [
	{
		id: "4",
		data: { label: "Synthetic Biology" },
		position,
	},
	{
		id: "5",
		data: { label: "Plant-based Meat" },
		position,
	},
	{
		id: "6",
		type: "output",
		data: { label: "Cell-Cultured Meat" },
		position,
	},
	{
		id: "7",
		type: "output",
		data: { label: "Fermentation-Derived Proteins" },
		position,
	},
];

export const initialEdges: TechTreeEdge[] = [
	{ id: "e45", source: "4", target: "5", type: edgeType, animated: true },
	{ id: "e56", source: "5", target: "6", type: edgeType, animated: true },
	{ id: "e57", source: "5", target: "7", type: edgeType, animated: true },
];
