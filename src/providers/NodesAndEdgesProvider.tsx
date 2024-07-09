"use client";

import { useOnChainTechTree } from "@/hooks/useOnChainTechTree";
import { contributionAbi, contributionContractAddress } from "@/lib/constants";
import { EdgeData, NodeData, TechTree, TechTreeData } from "@/typings";
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
	updateAll(roadmap: TechTreeData, removeNodeIds?: string[]): void;
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

export function NodesAndEdgesProvider({
	children,
	techTree,
}: { children: ReactNode; techTree: TechTree }) {
	const { onChainRoadmap, isLoadingOnChain } = useOnChainTechTree({
		techTreeId: techTree.id,
	});

	const { writeContract, isPending } = useWriteContract();
	const [roadmap, setRoadmap] = useState<TechTreeData>({
		edges: [],
		nodes: [],
	});

	useEffect(() => {
		setRoadmap(onChainRoadmap);
	}, [onChainRoadmap]);

	/*	function handleEdgeUpdate(source: string | null, target: string | null) {
		if (!source || !target) return;
		setUpdatedEdges([
			...updatedEdges,
			{
				id: `${roadmap?.edges?.length || 0}`,
				source,
				target,
			},
		]);
	}*/

	function updateAll(
		{ nodes, edges }: TechTreeData,
		removeNodeIds: string[] = [],
	) {
		const nodesWithoutRemoved = nodes.filter(
			(node) => !removeNodeIds.includes(node.id),
		);
		const uniqueNodes = new Map(
			nodesWithoutRemoved
				.filter((item) => item.type !== "ultimate-objective")
				.map((node) => [node.id, node]),
		);

		const uniqueEdges = new Map(edges.map((edge) => [edge.id, edge]));

		const roadmapNodes = roadmap?.nodes?.filter(
			(node) => !removeNodeIds.includes(node.id),
		);
		roadmapNodes?.forEach((node) => uniqueNodes.set(node.id, node));
		roadmap?.edges?.forEach((edge) => uniqueEdges.set(edge.id, edge));

		setRoadmap({
			nodes: Array.from(uniqueNodes.values()),
			edges: Array.from(uniqueEdges.values()),
		});
	}

	/*function handleNodeUpdate(nodeId: string, data: Partial<NodeData>) {
		const updatedNode = updatedNodes.find((node) => node.id === nodeId);
		if (!updatedNode) return;

		const updatedNodesCopy = updatedNodes.map((node) =>
			node.id === nodeId ? { ...node, ...data } : node,
		);
		setUpdatedNodes(updatedNodesCopy);
	}*/

	async function handlePublish() {
		try {
			writeContract({
				abi: contributionAbi,
				address: contributionContractAddress,
				functionName: "updateTechTree",
				args: [
					techTree.id,
					roadmap?.nodes.map((node) => ({
						id: node.id,
						title: node.title || "",
						nodeType: node.type,
					})),
					roadmap?.edges.map((edge) => ({
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
			nodes: roadmap?.nodes || [],
			edges: roadmap?.edges || [],
			addNewNode: (node) => "",
			//addNewNode: (node) => setUpdatedNodes((prev) => [...(prev || []), node]),
			updateAll,
			handleEdgeUpdate: () => "",
			handleNodeUpdate: () => "",
			hasUpdates: !deepEqual(roadmap, onChainRoadmap),
			handlePublish,
			isPublishing: isPending,
			isLoading: isLoadingOnChain,
		}),
		[roadmap, isPending, isLoadingOnChain],
	);

	return (
		<NodesAndEdgesContext.Provider value={value}>
			{children}
		</NodesAndEdgesContext.Provider>
	);
}
