"use client";

import { useTechTreeData } from "@/providers/TechTreeDataProvider";
import { NodeData, TechTreeAddType, TechTreeMode } from "@/typings";
import React, { ReactNode, createContext, useContext, useMemo } from "react";

type TechTreeContextProps = {
	mode: TechTreeMode;
	setMode: (mode: TechTreeMode) => void;
	setActiveNode: (nodeId?: string) => void;
	activeNode?: NodeData;
	activeEditType?: TechTreeAddType;
	setActiveEditType: (type?: TechTreeAddType) => void;
};

export const TechTreeContext = createContext<TechTreeContextProps>({
	mode: "move",
	setMode: () => {},
	setActiveNode: () => {},
	setActiveEditType: () => {},
});

export const useTechTreeContext = (): TechTreeContextProps => {
	const context = useContext(TechTreeContext);
	if (!context) {
		throw new Error("useTechTree must be used within a TechTreeProvider");
	}
	return context;
};

export function TechTreeContextProvider({ children }: { children: ReactNode }) {
	const { nodes } = useTechTreeData();
	const [mode, setMode] = React.useState<TechTreeMode>("move");
	const [activeEditType, setActiveEditType] = React.useState<
		TechTreeAddType | undefined
	>("node");

	const [activeNode, setActiveNode] = React.useState<NodeData>();

	function handleSetMode(mode: TechTreeMode) {
		if (mode === "edit") {
			setActiveEditType("node");
			setActiveNode(undefined);
		}
		setMode(mode);
	}

	function handleSetActiveNode(nodeId?: string) {
		const node = nodes.find((n) => n.id === nodeId);
		if (node) {
			setActiveNode(node);
		}
	}

	const value = useMemo(
		() => ({
			mode,
			setMode: handleSetMode,
			setActiveNode: handleSetActiveNode,
			activeNode,
			activeEditType,
			setActiveEditType,
		}),
		[mode, activeNode, activeEditType],
	);

	return (
		<TechTreeContext.Provider value={value}>
			{children}
		</TechTreeContext.Provider>
	);
}
