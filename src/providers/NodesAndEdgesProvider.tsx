"use client";

import { useOnChainTechTree } from "@/hooks/useOnChainTechTree";
import { contributionAbi, contributionContractAddress } from "@/lib/constants";
import { useTxEvents } from "@/providers/ContractEventsProvider";
import { useTechTree } from "@/providers/TechTreeParentProvider";
import { EdgeData, NodeData } from "@/typings";
import { isInvalidNumber } from "@/utils/number.utils";
import deepEqual from "deep-equal";
import React, {
	ReactNode,
	createContext,
	useContext,
	useMemo,
	useState,
	useEffect,
} from "react";
import { useWriteContract } from "wagmi";

type PublishMode = "reset" | "publish";

type NodesAndEdgesProps = {
	nodes: NodeData[];
	edges: EdgeData[];
	addNewNode(data: NodeData): void;
	updateAll(data: NodeData[], edges: EdgeData[]): void;
	handleEdgeUpdate: (source: string | null, target: string | null) => void;
	hasUpdates: boolean;
	handleNodeUpdate(nodeId: string, data: Partial<NodeData>): void;
	handlePublish(mode: PublishMode): void;
	isPublishing: boolean;
	isLoading: boolean;
};

export const NodesAndEdgesContext = createContext<NodesAndEdgesProps>({
	handleEdgeUpdate: () => {},
	updateAll: () => {},
	hasUpdates: false,
	nodes: [],
	edges: [],
	addNewNode: () => {},
	handleNodeUpdate: () => {},
	handlePublish: () => {},
	isPublishing: false,
	isLoading: false,
});

export const useNodesAndEdges = (): NodesAndEdgesProps => {
	const context = useContext(NodesAndEdgesContext);
	if (!context) {
		throw new Error(
			"useNodesAndEdges must be used within a NodesAndEdgesProvider",
		);
	}
	return context;
};

export function NodesAndEdgesProvider({ children }: { children: ReactNode }) {
	const { activeTechTree } = useTechTree();
	const { events } = useTxEvents();

	const { nodes, edges, isLoadingOnChain } = useOnChainTechTree();

	/*const isLoadingOnChain = false;
	const nodes: NodeData[] = [
		{
			id: "lfg3m2s",
			title: "Biochemistry Fundamentals",
			description:
				"Basic understanding of chemical processes in living organisms",
			type: "research",
		},
		{
			id: "k9p7x1r",
			title: "Microbial Fermentation",
			description: "Study of microorganisms for fermentation processes",
			type: "research",
		},
		{
			id: "h2j6n8t",
			title: "Biomass Feedstock Analysis",
			description:
				"Evaluation of various plant materials for biofuel production",
			type: "research",
		},
		{
			id: "w5f1c9q",
			title: "Enzymatic Hydrolysis",
			description: "Breakdown of complex carbohydrates into simple sugars",
			type: "development",
		},
		{
			id: "y7m3b6v",
			title: "Algae Cultivation Techniques",
			description: "Methods for growing algae for biofuel production",
			type: "development",
		},
		{
			id: "z4d8g1l",
			title: "Cellulosic Ethanol Production",
			description: "Converting cellulose-based biomass into ethanol",
			type: "development",
		},
		{
			id: "u6s2n9f",
			title: "Biodiesel Synthesis",
			description: "Production of biodiesel from vegetable oils or animal fats",
			type: "development",
		},
		{
			id: "a1x7p3e",
			title: "Biogas Generation",
			description: "Anaerobic digestion for biogas production",
			type: "development",
		},
		{
			id: "b9t5r7m",
			title: "Biofuel Refining Processes",
			description: "Techniques for purifying and upgrading biofuels",
			type: "optimization",
		},
		{
			id: "c3v8k2d",
			title: "Biofuel Engine Compatibility",
			description: "Adapting engines for efficient use of biofuels",
			type: "optimization",
		},
		{
			id: "e5j1h9g",
			title: "Sustainable Feedstock Management",
			description:
				"Practices for environmentally responsible biomass production",
			type: "optimization",
		},
		{
			id: "f7q4w2n",
			title: "Green Biofuels",
			description: "Environmentally friendly biofuels from sustainable sources",
			type: "end-goal",
		},
	];

	const edges: EdgeData[] = [
		{
			id: "lfg3m2s-k9p7x1r",
			source: "lfg3m2s",
			target: "k9p7x1r",
		},
		{
			id: "lfg3m2s-h2j6n8t",
			source: "lfg3m2s",
			target: "h2j6n8t",
		},
		{
			id: "k9p7x1r-w5f1c9q",
			source: "k9p7x1r",
			target: "w5f1c9q",
		},
		{
			id: "k9p7x1r-y7m3b6v",
			source: "k9p7x1r",
			target: "y7m3b6v",
		},
		{
			id: "h2j6n8t-w5f1c9q",
			source: "h2j6n8t",
			target: "w5f1c9q",
		},
		{
			id: "h2j6n8t-z4d8g1l",
			source: "h2j6n8t",
			target: "z4d8g1l",
		},
		{
			id: "w5f1c9q-z4d8g1l",
			source: "w5f1c9q",
			target: "z4d8g1l",
		},
		{
			id: "w5f1c9q-u6s2n9f",
			source: "y7m3b6v",
			target: "u6s2n9f",
		},
		{
			id: "y7m3b6v-a1x7p3e",
			source: "z4d8g1l",
			target: "b9t5r7m",
		},
		{
			id: "z4d8g1l-b9t5r7m",
			source: "u6s2n9f",
			target: "b9t5r7m",
		},
		{
			id: "u6s2n9f-a1x7p3e",
			source: "a1x7p3e",
			target: "b9t5r7m",
		},
		{
			id: "a1x7p3e-f7q4w2n",
			source: "b9t5r7m",
			target: "c3v8k2d",
		},
		{
			id: "b9t5r7m-f7q4w2n",
			source: "h2j6n8t",
			target: "e5j1h9g",
		},
		{
			id: "c3v8k2d-f7q4w2n",
			source: "y7m3b6v",
			target: "e5j1h9g",
		},
		{
			id: "e5j1h9g-f7q4w2n",
			source: "b9t5r7m",
			target: "f7q4w2n",
		},
		{
			id: "f7q4w2n-f7q4w2n",
			source: "c3v8k2d",
			target: "f7q4w2n",
		},
		{
			id: "f7q4w2n-f7q4w2n",
			source: "e5j1h9g",
			target: "f7q4w2n",
		},
	];*/

	const {
		data: hash,
		writeContract,
		isSuccess,
		isError,
		isPending,
	} = useWriteContract();
	const [updatedNodes, setUpdatedNodes] = useState<NodeData[]>([]);
	const [updatedEdges, setUpdatedEdges] = useState<EdgeData[]>([]);

	useEffect(() => {
		const event = events.find(
			(event) =>
				event.eventName === "TechTreeUpdated" &&
				event.args.techTreeId === activeTechTree?.id,
		);
		if (event) {
			setUpdatedNodes([]);
			setUpdatedEdges([]);
		}
	}, [events, activeTechTree?.id]);

	const nodesWithUpdates = useMemo(() => {
		return [...nodes, ...updatedNodes];
	}, [nodes, updatedNodes]);

	const edgesWithUpdates = useMemo(() => {
		return [...edges, ...updatedEdges];
	}, [edges, updatedEdges]);

	function handleEdgeUpdate(source: string | null, target: string | null) {
		if (!source || !target) return;
		setUpdatedEdges([
			...updatedEdges,
			{
				id: `${edgesWithUpdates?.length || 0}`,
				source,
				target,
			},
		]);
	}

	function updateFromGaladriel(newNodes: NodeData[], newEdges: EdgeData[]) {
		const uniqueNodes = new Map(newNodes.map((node) => [node.id, node]));
		const uniqueEdges = new Map(newEdges.map((edge) => [edge.id, edge]));

		updatedNodes.forEach((node) => uniqueNodes.set(node.id, node));
		updatedEdges.forEach((edge) => uniqueEdges.set(edge.id, edge));

		setUpdatedNodes(Array.from(uniqueNodes.values()));
		setUpdatedEdges(Array.from(uniqueEdges.values()));
	}

	function handleNodeUpdate(nodeId: string, data: Partial<NodeData>) {
		const updatedNode = updatedNodes.find((node) => node.id === nodeId);
		if (!updatedNode) return;

		const updatedNodesCopy = updatedNodes.map((node) =>
			node.id === nodeId ? { ...node, ...data } : node,
		);
		setUpdatedNodes(updatedNodesCopy);
	}

	async function handlePublish(mode: PublishMode) {
		if (mode === "reset") {
			setUpdatedNodes([]);
			setUpdatedEdges([]);
			return;
		}

		if (!activeTechTree || isInvalidNumber(activeTechTree?.id)) return;

		try {
			writeContract({
				abi: contributionAbi,
				address: contributionContractAddress,
				functionName: "updateTechTree",
				args: [
					activeTechTree.id,
					updatedNodes.map((node) => ({
						title: node.title || "",
						nodeType: node.type?.toLowerCase(),
					})),
					updatedEdges.map((edge) => ({
						source: edge.source,
						target: edge.target,
					})),
				],
			});
		} catch (error) {
			console.log(error);
		}
	}

	const value = useMemo<NodesAndEdgesProps>(
		() => ({
			nodes: nodesWithUpdates,
			edges: edgesWithUpdates,
			addNewNode: (node) => setUpdatedNodes((prev) => [...(prev || []), node]),
			updateAll: updateFromGaladriel,
			handleEdgeUpdate,
			handleNodeUpdate,
			hasUpdates:
				!deepEqual(nodes, nodesWithUpdates) ||
				!deepEqual(edges, edgesWithUpdates),
			handlePublish,
			isPublishing: isPending,
			isLoading: isLoadingOnChain,
		}),
		[nodesWithUpdates, edgesWithUpdates, isPending, isLoadingOnChain],
	);

	return (
		<NodesAndEdgesContext.Provider value={value}>
			{children}
		</NodesAndEdgesContext.Provider>
	);
}
