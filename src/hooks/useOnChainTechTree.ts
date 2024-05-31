"use client";

import { contributionContract } from "@/lib/constants";
import { EdgeData, NodeData } from "@/typings";
import { useMemo } from "react";
import { useReadContract } from "thirdweb/react";

interface useOnChainTechTreeProps {
	isLoadingOnChain: boolean;
	nodes: NodeData[];
	edges: EdgeData[];
}

export function useOnChainTechTree(): useOnChainTechTreeProps {
	const { data: onChainNodes, isLoading: isLoadingNodes } = useReadContract({
		contract: contributionContract,
		method: "getNodesLite",
	});
	const { data: onChainEdges, isLoading: isLoadingEdges } = useReadContract({
		contract: contributionContract,
		method: "getEdges",
	});

	const nodes = useMemo<NodeData[]>(
		() =>
			onChainNodes?.map((node, idx) => ({
				id: `${idx}`,
				title: node.title,
				origin: "on-chain",
			})) || [],
		[onChainNodes],
	);

	const edges = useMemo<EdgeData[]>(
		() =>
			onChainEdges?.map((edge, idx) => ({
				id: `${idx}`,
				source: edge.source,
				target: edge.target,
				origin: "on-chain",
			})) || [],
		[onChainEdges],
	);

	return useMemo(
		() => ({
			nodes,
			edges,
			isLoadingOnChain: isLoadingNodes || isLoadingEdges,
		}),
		[nodes, edges, isLoadingNodes, isLoadingEdges],
	);
}
