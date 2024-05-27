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
			<div className="techtree-title mb-6">
				<h1 className="font-black text-2xl">{localNode?.label}</h1>
				<div className="mt-1">
					<div className="flex items-center space-x-2">
						<div className="text-xs">Status:</div>
						<StatusTag status={localNode?.status} />
					</div>
				</div>
			</div>
			<ProjectMenu status={localNode?.status} id={id} />
			{children}
		</ResearchPageContext.Provider>
	);
}
