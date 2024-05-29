"use client";

import { contributionContract } from "@/lib/constants";
import {
	NodeData,
	TechTreeData,
	TechTreeEdge,
	TechTreeLayoutNode,
} from "@/typings";
import { initialEdges, initialNodes, nodesData } from "@/utils/nodes.utils";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useReadContract } from "thirdweb/react";

interface useFetchTechTreeNodeProps {
	isLoading: boolean;
	techTree?: TechTreeData;
	setTechTree: (techTree: TechTreeData) => void;
}

export function useFetchNodes(): useFetchTechTreeNodeProps {
	const { data } = useReadContract({
		contract: contributionContract,
		method: "getNodesLite",
	});
	const [techTree, setTechTree] = useState<TechTreeData>();
	const [isLoading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		fetchNodes();
	}, []);

	function fetchNodes() {
		setTechTree({
			nodes: nodesData,
			edges: initialEdges,
		});
		setLoading(false);
	}

	return {
		techTree,
		setTechTree,
		isLoading,
	};
}
