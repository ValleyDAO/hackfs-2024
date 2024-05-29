"use client";

import { useFetchNodes } from "@/hooks/useFetchNodes";
import { contributionContract } from "@/lib/constants";
import {
	NodeData,
	TechTreeAddType,
	TechTreeData,
	TechTreeLayoutNode,
	TechTreeMode,
} from "@/typings";
import { defaultPosition } from "@/utils/nodes.utils";
import React, {
	ReactNode,
	createContext,
	useContext,
	MouseEvent,
	useMemo,
} from "react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

type TechTreeContextProps = {
	mode: TechTreeMode;
	setMode: (mode: TechTreeMode) => void;
	techTree?: TechTreeData;
	setTechTree?: (data: TechTreeData) => void;
	onPossibleNodeAdd(ev: MouseEvent<HTMLDivElement>): void;
	setActiveNode: (node?: TechTreeLayoutNode) => void;
	activeNode?: TechTreeLayoutNode;
	activeEditType?: TechTreeAddType;
	setActiveEditType: (type?: TechTreeAddType) => void;
};

export const TechTreeContext = createContext<TechTreeContextProps>({
	mode: "move",
	setMode: () => {},
	onPossibleNodeAdd: () => {},
	setActiveNode: () => {},
	setActiveEditType: () => {},
});

export const useTechTree = (): TechTreeContextProps => {
	const context = useContext(TechTreeContext);
	if (!context) {
		throw new Error("useTechTree must be used within a TechTreeProvider");
	}
	return context;
};

export function TechTreeProvider({ children }: { children: ReactNode }) {
	const [mode, setMode] = React.useState<TechTreeMode>("move");
	const [activeEditType, setActiveEditType] = React.useState<
		TechTreeAddType | undefined
	>("node");

	// TODO: Merge with on-chain data
	const { techTree, setTechTree } = useFetchNodes();
	const [activeNode, setActiveNode] = React.useState<TechTreeLayoutNode>();

	const { mutate, isPending, status, error } = useSendTransaction();

	async function onAdd() {
		/*const newNode = {
			id: getNodeId(),
			type: "tech-tree",
			data: { label: "Added node" },
			position: defaultPosition,
		};
		const newEdge = {
			id: getNodeId(),
			source: data.nodes[data.nodes?.length - 1].id,
			target: newNode.id,
			type: edgeType,
		};
		const parsedData = getLayoutElements(
			[...data.nodes, newNode],
			[...data.edges, newEdge],
		);
		setData(parsedData);*/

		try {
			const transaction = prepareContractCall({
				contract: contributionContract,
				method: "addNode",
				params: ["Added node", "dsfsdf"],
			});
			// @ts-ignore
			const tx = mutate(transaction);
		} catch (error) {
			console.error(error);
		}
	}

	function onPossibleNodeAdd(ev: MouseEvent<HTMLDivElement>) {
		if (mode === "edit" && activeEditType === "node") {
			ev.preventDefault();
			const newNode: NodeData = {
				id: `${(techTree?.nodes || []).length + 1}`,
				label: "Added node",
			};
			setTechTree?.({
				edges: techTree?.edges || [],
				nodes: [...(techTree?.nodes || []), newNode],
			});
			setActiveEditType(undefined);
			//setActiveNode(newNode);
		}
	}

	function handleSetMode(mode: TechTreeMode) {
		if (mode === "edit") {
			setActiveEditType("node");
		}
		setMode(mode);
	}

	const value = useMemo(
		() => ({
			mode,
			setMode: handleSetMode,
			techTree,
			setTechTree,
			onPossibleNodeAdd,
			setActiveNode,
			activeNode,
			activeEditType,
			setActiveEditType,
		}),
		[mode, techTree, activeNode, activeEditType],
	);

	return (
		<TechTreeContext.Provider value={value}>
			{children}
		</TechTreeContext.Provider>
	);
}
