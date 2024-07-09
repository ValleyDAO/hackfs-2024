"use client";

import { useTxEvents } from "@/providers/ContractEventsProvider";
import { useNodesAndEdges } from "@/providers/NodesAndEdgesProvider";
import { NodeData, TechTreeAddType } from "@/typings";
import React, {
	ReactNode,
	createContext,
	useContext,
	useMemo,
	useEffect,
} from "react";

type TechTreeContextProps = {
	setActiveNode: (nodeId?: string) => void;
	activeNode?: NodeData;
	activeEditType?: TechTreeAddType;
	objective?: NodeData;
	setActiveEditType: (type?: TechTreeAddType) => void;
};

export const TechTreeContext = createContext<TechTreeContextProps>({
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
	techTreeId,
}: { children: ReactNode; techTreeId: bigint }) {
	const { events } = useTxEvents();
	const { nodes, hasUpdates } = useNodesAndEdges();
	const [activeEditType, setActiveEditType] = React.useState<
		TechTreeAddType | undefined
	>();

	const [activeNode, setActiveNode] = React.useState<NodeData>();

	useEffect(() => {
		const event = events.find(
			(event) =>
				event.eventName === "TechTreeUpdated" &&
				event.args.techTreeId === techTreeId,
		);
		if (event) {
			setActiveNode(undefined);
			setActiveEditType(undefined);
		}
	}, [events, techTreeId]);

	function handleSetActiveNode(nodeId?: string) {
		const node = nodes.find((n) => n.id === nodeId);
		setActiveNode(node?.type !== "ultimate-objective" ? node : undefined);
	}

	const value = useMemo(
		() => ({
			setActiveNode: handleSetActiveNode,
			activeNode,
			activeEditType,
			setActiveEditType,
			objective: nodes.find((node) => node.type === "ultimate-objective"),
		}),
		[activeNode, activeEditType, nodes],
	);

	return (
		<TechTreeContext.Provider value={value}>
			{children}
		</TechTreeContext.Provider>
	);
}
