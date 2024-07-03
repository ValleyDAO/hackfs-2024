"use client";

import { useContributionContract } from "@/hooks/useContributionContract";
import { useTxEvents } from "@/providers/ContractEventsProvider";
import { useTechTree } from "@/providers/TechTreeParentProvider";
import { EdgeData, NodeData, NodeType } from "@/typings";
import { isInvalidNumber } from "@/utils/number.utils";
import { useEffect, useMemo } from "react";

interface useOnChainTechTreeProps {
	isLoadingOnChain: boolean;
	nodes: NodeData[];
	edges: EdgeData[];
}

export function useOnChainTechTree(): useOnChainTechTreeProps {
	const { activeTechTree } = useTechTree();
	const { events } = useTxEvents();
	const { data, isLoading, refetch } = useContributionContract<
		[NodeData[], EdgeData[]]
	>({
		functionName: "getNodesAndEdgesFromTechTreeId",
		args: [activeTechTree?.id as bigint],
		enabled: !isInvalidNumber(activeTechTree?.id),
	});

	useEffect(() => {
		const event = events.find(
			(event) =>
				event.eventName === "TechTreeUpdated" &&
				event.args.techTreeId === activeTechTree?.id,
		);
		if (event) {
			refetch();
		}
	}, [events, activeTechTree?.id]);

	const [nodes, edges] = useMemo<[NodeData[], EdgeData[]]>(() => {
		return [
			data?.[0].map((node, idx) => ({
				id: (node as any)?.id,
				title: node.title,
				type: (node as any).nodeType as NodeType,
				origin: "on-chain",
			})) || [],
			data?.[1]?.map((edge, idx) => ({
				id: (edge as any)?.id,
				source: `${Number(edge.source)}`,
				target: `${Number(edge.target)}`,
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
