"use client";

import { useOnChainTechTree } from "@/hooks/useOnChainTechTree";
import { contributionContract } from "@/lib/constants";
import { EdgeData, NodeData } from "@/typings";
import { areAllNodesConnected, generateId } from "@/utils/nodes.utils";
import deepEqual from "deep-equal";
import React, {
	ReactNode,
	createContext,
	useContext,
	useMemo,
	useState,
	useEffect,
} from "react";
import toast from "react-hot-toast";
import { prepareContractCall } from "thirdweb";
import { useReadContract, useSendTransaction } from "thirdweb/react";

type PublishMode = "reset" | "publish";

type TechTreeDataContextProps = {
	nodes: NodeData[];
	edges: EdgeData[];
	addNewNode(data: NodeData): void;
	handleEdgeUpdate: (source: string | null, target: string | null) => void;
	removeNode(nodeId: string): void;
	hasUpdates: boolean;
	handleNodeUpdate(nodeId: string, data: Partial<NodeData>): void;
	handlePublish(mode: PublishMode): void;
	isPublishing: boolean;
	isLoading: boolean;
};

export const TechTreeContext = createContext<TechTreeDataContextProps>({
	handleEdgeUpdate: () => {},
	removeNode: () => {},
	hasUpdates: false,
	nodes: [],
	edges: [],
	addNewNode: () => {},
	handleNodeUpdate: () => {},
	handlePublish: () => {},
	isPublishing: false,
	isLoading: false,
});

export const useTechTreeData = (): TechTreeDataContextProps => {
	const context = useContext(TechTreeContext);
	if (!context) {
		throw new Error("useTechTree must be used within a TechTreeProvider");
	}
	return context;
};

export function TechTreeDataProvider({ children }: { children: ReactNode }) {
	const { nodes, edges, isLoadingOnChain } = useOnChainTechTree();

	const [updatedNodes, setUpdatedNodes] = useState<NodeData[]>([]);
	const [updatedEdges, setUpdatedEdges] = useState<EdgeData[]>([]);
	const { mutate, isPending, isSuccess } = useSendTransaction();

	useEffect(() => {
		if (isSuccess) {
			toast.success("Tech tree updated successfully");
		}
	}, [isSuccess]);

	const nodesWithUpdates = useMemo(() => {
		return [...nodes, ...updatedNodes];
	}, [nodes, updatedNodes]);

	const edgesWithUpdates = useMemo(() => {
		return [...edges, ...updatedEdges];
	}, [edges, updatedEdges]);

	function handleEdgeUpdate(source: string | null, target: string | null) {
		if (!source || !target) return;
		setUpdatedEdges([
			...edgesWithUpdates,
			{
				id: generateId(),
				source,
				target,
			},
		]);
	}

	function removeNode(nodeId: string) {
		// can't node if its a node with target nodes
		const isMiddleNode =
			(updatedEdges || []).filter((edge) => edge.source === nodeId)?.length > 0;

		if (isMiddleNode) {
			toast.error("Can't remove a node that has dependencies");
			return;
		}

		const newNodes = updatedNodes.filter((node) => node.id !== nodeId);
		const newEdges = updatedEdges.filter((edge) => edge.target !== nodeId);
		setUpdatedNodes(newNodes);
		setUpdatedEdges(newEdges);
	}

	function handleNodeUpdate(nodeId: string, data: Partial<NodeData>) {
		const updatedNode = updatedNodes.find((node) => node.id === nodeId);
		if (!updatedNode) return;

		const updatedNodesCopy = updatedNodes.map((node) =>
			node.id === nodeId ? { ...node, ...data } : node,
		);
		setUpdatedNodes(updatedNodesCopy);
	}

	function handlePublish(mode: PublishMode) {
		if (mode === "reset") {
			setUpdatedNodes([]);
			setUpdatedEdges([]);
			return;
		}

		if (!areAllNodesConnected(nodesWithUpdates, edgesWithUpdates)) {
			toast.error("All nodes need to be connected");
			return;
		}

		try {
			const transaction = prepareContractCall({
				contract: contributionContract,
				method: "updateTechTree",
				params: [
					updatedNodes.map((node) => ({
						title: node.title || "",
						type: node.type?.toLowerCase(),
						ipfsHash: "node.ipfsHash,",
					})),
					updatedEdges.map((edge) => ({
						source: edge.source,
						target: edge.target,
					})),
				],
			});
			// @ts-ignore
			mutate(transaction);
		} catch (error) {
			console.log(error);
		}
	}

	const value = useMemo<TechTreeDataContextProps>(
		() => ({
			nodes: nodesWithUpdates,
			edges: edgesWithUpdates,
			addNewNode: (node) => setUpdatedNodes((prev) => [...(prev || []), node]),
			handleEdgeUpdate,
			removeNode,
			handleNodeUpdate,
			hasUpdates:
				!deepEqual(nodes, nodesWithUpdates) ||
				!deepEqual(edges, edgesWithUpdates),
			handlePublish,
			isPublishing: isPending,
			isLoading: isLoadingOnChain,
		}),
		[nodesWithUpdates, edgesWithUpdates, isLoadingOnChain],
	);

	return (
		<TechTreeContext.Provider value={value}>
			{children}
		</TechTreeContext.Provider>
	);
}
