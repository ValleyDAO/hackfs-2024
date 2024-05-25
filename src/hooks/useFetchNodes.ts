"use client";

import { NodeData, TechTreeData, TechTreeEdge, TechTreeNode } from "@/typings";
import { initialEdges, initialNodes } from "@/utils/nodes.utils";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

interface useFetchTechTreeNodeProps {
	isLoading: boolean;
	techTree?: TechTreeData;
	setTechTree: (techTree: TechTreeData) => void;
}

export function useFetchNodes(): useFetchTechTreeNodeProps {
	const [techTree, setTechTree] = useState<TechTreeData>();
	const [isLoading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		fetchNodes();
	}, []);

	function fetchNodes() {
		setTechTree({
			nodes: initialNodes,
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
