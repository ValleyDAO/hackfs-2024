"use client";

import { useTxEvents } from "@/providers/ContractEventsProvider";
import { useNodesAndEdges } from "@/providers/NodesAndEdgesProvider";
import { useTechTree } from "@/providers/TechTreeParentProvider";
import { EdgeData, NodeData, TechTreeAddType, TechTreeMode } from "@/typings";
import { fetchWrapper } from "@/utils/query.utils";
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
	setActiveNode: (nodeId?: string) => void;
	setActiveNodeRaw?: (node: NodeData) => void;
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
	const { events } = useTxEvents();
	const { nodes, hasUpdates } = useNodesAndEdges();
	const [mode, setMode] = React.useState<TechTreeMode>(
		hasUpdates || nodes?.length === 0 ? "edit" : "move",
	);
	const [activeEditType, setActiveEditType] = React.useState<
		TechTreeAddType | undefined
	>();

	const [activeNode, setActiveNode] = React.useState<NodeData>();

	useEffect(() => {
		const event = events.find(
			(event) =>
				event.eventName === "TechTreeUpdated" &&
				event.args.techTreeId === activeTechTree?.id,
		);
		if (event) {
			setActiveNode(undefined);
			setMode("move");
			setActiveEditType(undefined);
		}
	}, [events, activeTechTree?.id]);

	useEffect(() => {
		if (!activeTechTree && activeNode) {
			setActiveNode(undefined);
			setMode("move");
			setActiveEditType(undefined);
		} else if (activeTechTree && nodes?.length === 0) {
			setMode("edit");
		}
	}, [activeTechTree, activeNode]);

	function handleSetMode(mode: TechTreeMode) {
		if (mode === "edit") {
			setActiveNode(undefined);
		}
		setMode(mode);
	}

	function handleSetActiveNode(nodeId?: string) {
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
			setActiveNodeRaw: setActiveNode,
		}),
		[mode, activeNode, activeEditType, nodes],
	);

	return (
		<TechTreeContext.Provider value={value}>
			{children}
		</TechTreeContext.Provider>
	);
}
