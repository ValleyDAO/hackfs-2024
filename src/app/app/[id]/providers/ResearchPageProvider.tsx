"use client";

import { ProjectMenu } from "@/app/app/[id]/components/ProjectMenu";
import { StatusTag } from "@/components/StatusTag";
import { useFetchTechTreeNode } from "@/hooks/useFetchTechTreeNode";
import { NodeData, NodeStatus } from "@/typings";
import React, { ReactNode, createContext, useContext, useEffect } from "react";

type ResearchContextProps = Partial<NodeData> & {
	handleStatusChange?: (status: NodeStatus) => void;
};

export const ResearchPageContext = createContext<ResearchContextProps>({});

export const useResearchPage = (): ResearchContextProps => {
	const context = useContext(ResearchPageContext);
	if (!context) {
		throw new Error(
			"useResearchPage must be used within a ResearchPageProvider",
		);
	}
	return context;
};

export function ResearchPageProvider({
	children,
	id,
}: { children: ReactNode; id: string }) {
	const { node } = useFetchTechTreeNode(id);
	const [localNode, setLocalNode] = React.useState<NodeData>();

	useEffect(() => {}, []);

	useEffect(() => {
		if (node) {
			setLocalNode(node);
		}
	}, [node]);

	function handleStatusChange(status: NodeStatus) {
		setLocalNode((prevState) => prevState && { ...prevState, status });
	}

	return (
		<ResearchPageContext.Provider value={{ ...localNode, handleStatusChange }}>
			{children}
		</ResearchPageContext.Provider>
	);
}
