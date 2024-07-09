"use client";

import { useContributionContract } from "@/hooks/useContributionContract";
import { useTxEvents } from "@/providers/ContractEventsProvider";
import { EdgeData, NodeData, NodeType, TechTreeData } from "@/typings";
import { useEffect, useMemo } from "react";

interface useOnChainTechTreeProps {
	isLoadingOnChain: boolean;
	onChainRoadmap: TechTreeData;
}

interface useOnChainTechTreeArgs {
	techTreeId: bigint;
}

export function useOnChainTechTree({
	techTreeId,
}: useOnChainTechTreeArgs): useOnChainTechTreeProps {
	const { events } = useTxEvents();
	const { data, isLoading, refetch } = useContributionContract<
		[NodeData[], EdgeData[]]
	>({
		functionName: "getNodesAndEdgesFromTechTreeId",
		args: [techTreeId],
	});

	useEffect(() => {
		const event = events.find(
			(event) =>
				event.eventName === "TechTreeUpdated" &&
				event.args.techTreeId === techTreeId,
		);
		if (event) {
			refetch();
		}
	}, [events, techTreeId]);

	const treeAsArray = useMemo<[NodeData[], EdgeData[]]>(() => {
		return [
			data?.[0].map((node, idx) => ({
				id: (node as any)?.id,
				title: node.title,
				type: (node as any).nodeType as NodeType,
				origin: "on-chain",
			})) || [],
			data?.[1]?.map((edge, idx) => ({
				id: `${idx}`,
				source: edge.source,
				target: edge.target,
				origin: "on-chain",
			})) || [],
		];
	}, [data]);

	return useMemo(
		() => ({
			onChainRoadmap: { nodes: treeAsArray?.[0], edges: treeAsArray?.[1] },
			isLoadingOnChain: isLoading,
		}),
		[treeAsArray, isLoading],
	);
}
