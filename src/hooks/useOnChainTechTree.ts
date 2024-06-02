"use client";

import { techTreeContract } from "@/lib/constants";
import { useTechTree } from "@/providers/TechTreeParentProvider";
import { EdgeData, NodeData, NodeType } from "@/typings";
import { useMemo } from "react";
import { useReadContract } from "thirdweb/react";

interface useOnChainTechTreeProps {
	isLoadingOnChain: boolean;
	nodes: NodeData[];
	edges: EdgeData[];
}

export function useOnChainTechTree(): useOnChainTechTreeProps {
	const { activeTechTree } = useTechTree();
	const { data, isLoading, refetch } = useReadContract({
		contract: techTreeContract,
		method: "getNodesAndEdgesFromTechTreeId",
		params: [activeTechTree?.id as bigint],
		queryOptions: {
			enabled: !!activeTechTree?.id,
		},
	});

	const [nodes, edges] = useMemo<[NodeData[], EdgeData[]]>(() => {
		return [
			data?.[0]
				?.filter((item) => item.createdAt !== BigInt(0))
				.map((node, idx) => ({
					id: BigInt(idx),
					title: node.title,
					type: node.nodeType as NodeType,
					origin: "on-chain",
				})) || [],
			data?.[1]?.map((edge, idx) => ({
				id: `${idx}`,
				source: `${Number(edge.source) - 1}`,
				target: `${Number(edge.target) - 1}`,
				origin: "on-chain",
			})) || [],
		];
	}, [data]);

	return useMemo(
		() => ({
			nodes,
			edges,
			isLoadingOnChain: isLoading,
		}),
		[nodes, edges, isLoading],
	);
}
