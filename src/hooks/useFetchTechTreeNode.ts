"use client";

import { NodeData } from "@/typings";
import { initialNodes } from "@/utils/nodes.utils";
import { useQuery } from "react-query";

interface useFetchTechTreeNodeProps {
	isLoading: boolean;
	node?: NodeData;
}

export function useFetchTechTreeNode(id: string): useFetchTechTreeNodeProps {
	const { data, isLoading } = useQuery({
		queryKey: ["techTree", id],
		queryFn: () => fetchTechTreeNode(id),
	});

	async function fetchTechTreeNode(id: string): Promise<NodeData> {
		const node = initialNodes.find((node) => node.id === id)?.data;
		return {
			...node,
			fundingState: {
				fundingRequest: 500000,
				fundingRaised: 25750,
				funders: 25,
			},
		} as NodeData;
	}

	return {
		node: data,
		isLoading,
	};
}
