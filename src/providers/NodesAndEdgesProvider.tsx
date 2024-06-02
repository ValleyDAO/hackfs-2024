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
	updateFromGaladriel(data: NodeData[], edges: EdgeData[]): void;
	handleEdgeUpdate: (source: string | null, target: string | null) => void;
	hasUpdates: boolean;
	handleNodeUpdate(nodeId: bigint, data: Partial<NodeData>): void;
	handlePublish(mode: PublishMode): void;
	isPublishing: boolean;
	isLoading: boolean;
};

export const NodesAndEdgesContext = createContext<NodesAndEdgesProps>({
	handleEdgeUpdate: () => {},
	updateFromGaladriel: () => {},
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
	const [updatedNodes, setUpdatedNodes] = useState<NodeData[]>([]);
	const [updatedEdges, setUpdatedEdges] = useState<EdgeData[]>([]);

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

	function updateFromGaladriel(nodes: NodeData[], edges: EdgeData[]) {
		console.log(nodes);
		console.log(edges);
		setUpdatedNodes(nodes);
		setUpdatedEdges(edges);
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
			updateFromGaladriel,
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
