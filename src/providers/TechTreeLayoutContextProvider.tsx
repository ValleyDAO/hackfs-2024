"use client";

import { useNodesAndEdges } from "@/providers/NodesAndEdgesProvider";
import { useTechTree } from "@/providers/TechTreeParentProvider";
import { NodeData, TechTreeAddType, TechTreeMode } from "@/typings";
import React, {
	ReactNode,
	createContext,
	useContext,
	useMemo,
	useEffect,
} from "react";

type TechTreeContextProps = {
	mode: TechTreeMode;
	setMode: (mode: TechTreeMode) => void;
	setActiveNode: (nodeId?: bigint) => void;
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

export function TechTreeLayoutContextProvider({
	children,
}: { children: ReactNode }) {
	const { activeTechTree } = useTechTree();
	const { nodes, hasUpdates } = useNodesAndEdges();
	const [mode, setMode] = React.useState<TechTreeMode>(
		hasUpdates ? "edit" : "move",
	);
	const [activeEditType, setActiveEditType] = React.useState<
		TechTreeAddType | undefined
	>();

	const [activeNode, setActiveNode] = React.useState<NodeData>();

	useEffect(() => {
		if (!activeTechTree && activeNode) {
			setActiveNode(undefined);
			setMode("move");
			setActiveEditType(undefined);
		}
	}, [activeTechTree, activeNode]);

	function handleSetMode(mode: TechTreeMode) {
		if (mode === "edit") {
			setActiveNode(undefined);
		}
		setMode(mode);
	}

	function handleSetActiveNode(nodeId?: bigint) {
		const node = nodes.find((n) => n.id === nodeId);
		setActiveNode(node);
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
		[mode, activeNode, activeEditType, nodes],
	);

	return (
		<TechTreeContext.Provider value={value}>
			{children}
		</TechTreeContext.Provider>
	);
}
