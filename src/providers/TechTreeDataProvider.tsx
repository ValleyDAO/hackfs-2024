"use client";

import { contributionContract } from "@/lib/constants";
import { EdgeData, NodeData, TechTreeData } from "@/typings";
import { generateId } from "@/utils/nodes.utils";
import deepEqual from "deep-equal";
import React, {
	ReactNode,
	createContext,
	useContext,
	useMemo,
	useState,
} from "react";
import toast from "react-hot-toast";
import { prepareContractCall } from "thirdweb";
import { useReadContract, useSendTransaction } from "thirdweb/react";

type TechTreeDataContextProps = {
	nodes: NodeData[];
	edges: EdgeData[];
	addNewNode(data: NodeData): void;
	handleEdgeUpdate: (source: string | null, target: string | null) => void;
	removeNode(nodeId: string): void;
	hasUpdates: boolean;
};

export const TechTreeContext = createContext<TechTreeDataContextProps>({
	handleEdgeUpdate: () => {},
	removeNode: () => {},
	hasUpdates: false,
	nodes: [],
	edges: [],
	addNewNode: () => {},
});

export const useTechTreeData = (): TechTreeDataContextProps => {
	const context = useContext(TechTreeContext);
	if (!context) {
		throw new Error("useTechTree must be used within a TechTreeProvider");
	}
	return context;
};

export function TechTreeDataProvider({ children }: { children: ReactNode }) {
	const { data: onChainNodes, isLoading } = useReadContract({
		contract: contributionContract,
		method: "getNodesLite",
	});

	// TODO: update to onChainEdges
	const onChainEdges: EdgeData[] = [];

	const nodes = useMemo(() => {
		return (
			onChainNodes?.map(
				(node, idx) =>
					({
						id: `${idx}`,
						title: node.title,
					}) as NodeData,
			) || []
		);
	}, [onChainNodes]);

	const [updatedNodes, setUpdatedNodes] = useState<NodeData[]>([]);
	const [updatedEdges, setUpdatedEdges] = useState<EdgeData[]>([]);
	const { mutate } = useSendTransaction();

	async function onAdd() {
		try {
			const transaction = prepareContractCall({
				contract: contributionContract,
				method: "addNode",
				params: ["Added node", "dsfsdf"],
			});
			// @ts-ignore
			const tx = mutate(transaction);
		} catch (error) {
			console.error(error);
		}
	}

	function handleEdgeUpdate(source: string | null, target: string | null) {
		if (!source || !target) return;
		setUpdatedEdges([
			...updatedEdges,
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

	function handleNewNode(data: NodeData) {
		setUpdatedNodes([...(updatedNodes || []), data]);
	}

	const nodesWithUpdates = [...(nodes || []), ...(updatedNodes || [])];
	const edgesWithUpdates = [...(onChainEdges || []), ...(updatedEdges || [])];

	const value = useMemo<TechTreeDataContextProps>(
		() => ({
			nodes: nodesWithUpdates,
			edges: updatedEdges,
			addNewNode: handleNewNode,
			handleEdgeUpdate,
			removeNode,
			hasUpdates: !deepEqual(nodes, nodesWithUpdates),
		}),
		[nodesWithUpdates, nodes],
	);

	return (
		<TechTreeContext.Provider value={value}>
			{children}
		</TechTreeContext.Provider>
	);
}
