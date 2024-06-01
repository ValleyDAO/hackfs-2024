"use client";

import { useOnChainTechTree } from "@/hooks/useOnChainTechTree";
import { useTransaction } from "@/hooks/useTransaction";
import { techTreeContract } from "@/lib/constants";
import { useTechTree } from "@/providers/TechTreeParentProvider";
import { EdgeData, NodeData, TechTree } from "@/typings";
import { areAllNodesConnected } from "@/utils/nodes.utils";
import { isInvalidNumber } from "@/utils/number.utils";
import deepEqual from "deep-equal";
import React, {
	ReactNode,
	createContext,
	useContext,
	useMemo,
	useState,
} from "react";
import toast from "react-hot-toast";
import { PreparedTransaction, prepareContractCall } from "thirdweb";

type PublishMode = "reset" | "publish";

type NodesAndEdgesProps = {
	nodes: NodeData[];
	edges: EdgeData[];
	addNewNode(data: NodeData): void;
	handleEdgeUpdate: (source: string | null, target: string | null) => void;
	hasUpdates: boolean;
	handleNodeUpdate(nodeId: bigint, data: Partial<NodeData>): void;
	handlePublish(mode: PublishMode): void;
	isPublishing: boolean;
	isLoading: boolean;
};

export const NodesAndEdgesContext = createContext<NodesAndEdgesProps>({
	handleEdgeUpdate: () => {},
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

	const { nodes, edges, isLoadingOnChain } = useOnChainTechTree();
	const { send, loading: hasTxInTransit, isSuccess } = useTransaction();
	const [updatedNodes, setUpdatedNodes] = useState<NodeData[]>([
		/*{
			id: BigInt(1),
			title: "Improve Basic Solar Cell Efficiency",
			type: "research",
		},
		{
			id: BigInt(2),
			title: "Develop Multi-Junction Solar Cells",
			type: "development",
		},
		{
			id: BigInt(3),
			title: "Research Perovskite Solar Cells",
			type: "research",
		},
		{
			id: BigInt(4),
			title: "Combine Perovskite with Silicon",
			type: "development",
		},
		{
			id: BigInt(5),
			title: "Develop Flexible and Lightweight Substrates",
			type: "development",
		},
		{
			id: BigInt(6),
			title: "Integrate Advanced Energy Storage",
			type: "optimisation",
		},
		{
			id: BigInt(7),
			title: "Omni Solar Panels",
			type: "end-goal",
		},*/
	]);
	const [updatedEdges, setUpdatedEdges] = useState<EdgeData[]>([
		/*{
			id: "1",
			source: "1",
			target: "2",
		},
		{
			id: "2",
			source: "2",
			target: "5",
		},
		{ id: "3", source: "1", target: "3" },
		{ id: "4", source: "3", target: "4" },
		{ id: "5", source: "4", target: "5" },
		{ id: "6", source: "5", target: "6" },
		{ id: "7", source: "6", target: "7" },*/
	]);

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

	function handleNodeUpdate(nodeId: bigint, data: Partial<NodeData>) {
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

		if (!areAllNodesConnected(nodesWithUpdates, edgesWithUpdates)) {
			toast.error("All nodes need to be connected");
			return;
		}

		if (!activeTechTree || isInvalidNumber(activeTechTree?.id)) return;

		try {
			const transaction = prepareContractCall({
				contract: techTreeContract,
				method: "updateTechTree",
				params: [
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
			}) as PreparedTransaction;
			await send(transaction);
		} catch (error) {
			console.log(error);
		}
	}

	const value = useMemo<NodesAndEdgesProps>(
		() => ({
			nodes: nodesWithUpdates,
			edges: edgesWithUpdates,
			addNewNode: (node) => setUpdatedNodes((prev) => [...(prev || []), node]),
			handleEdgeUpdate,
			handleNodeUpdate,
			hasUpdates:
				!deepEqual(nodes, nodesWithUpdates) ||
				!deepEqual(edges, edgesWithUpdates),
			handlePublish,
			isPublishing: hasTxInTransit,
			isLoading: isLoadingOnChain,
		}),
		[nodesWithUpdates, edgesWithUpdates, hasTxInTransit, isLoadingOnChain],
	);

	return (
		<NodesAndEdgesContext.Provider value={value}>
			{children}
		</NodesAndEdgesContext.Provider>
	);
}
