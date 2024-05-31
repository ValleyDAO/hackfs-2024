"use client";

import { ProjectMenu } from "@/app/app/[id]/components/ProjectMenu";
import { StatusTag } from "@/components/StatusTag";
import { Button } from "@/components/button";
import { LoadingOutlined } from "@/components/icons/LoadingOutlined";
import { useFetchTechTreeNode } from "@/hooks/useFetchTechTreeNode";
import { NodeData, NodeStatus } from "@/typings";
import Link from "next/link";
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
	const { node, isLoading } = useFetchTechTreeNode(BigInt(id));
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
			{isLoading ? (
				<div className="pt-10 layout">
					<LoadingOutlined />
				</div>
			) : node && !isLoading ? (
				children
			) : (
				<div className="pt-10 layout">
					<h1 className="font-semibold text-2xl mb-6">Node not found</h1>
					<Link href="/app">
						<Button variant="primary">Go Back</Button>
					</Link>
				</div>
			)}
		</ResearchPageContext.Provider>
	);
}
