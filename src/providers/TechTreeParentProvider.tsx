"use client";

import { techTreeContract } from "@/lib/constants";
import { useTxEvents } from "@/providers/ContractEventsProvider";
import { TechTree } from "@/typings";
import React, {
	ReactNode,
	createContext,
	useContext,
	useMemo,
	useState,
} from "react";
import { useReadContract } from "wagmi";

type TechTreeProps = {
	activeTechTree?: TechTree;
	techTrees: TechTree[];
	isLoading: boolean;
	setActiveTechTree: (techTree?: TechTree) => void;
};

export const TechTreeContext = createContext<TechTreeProps>({
	activeTechTree: undefined,
	techTrees: [],
	isLoading: false,
	setActiveTechTree: () => {},
});

export const useTechTree = (): TechTreeProps => {
	const context = useContext(TechTreeContext);
	if (!context) {
		throw new Error("useTechTree must be used within a TechTreeProvider");
	}
	return context;
};

export function TechTreeProvider({ children }: { children: ReactNode }) {
	const [activeTechTree, setActiveTechTree] = useState<TechTree | undefined>();
	const { data, isLoading } = useReadContract({
		contract: techTreeContract,
		method: "getTechTrees",
	});

	const value = useMemo<TechTreeProps>(
		() => ({
			activeTechTree,
			isLoading,
			techTrees:
				data?.map(
					(techTree) =>
						({
							id: techTree.id,
							title: techTree.title,
						}) as TechTree,
				) || [],
			setActiveTechTree,
		}),
		[activeTechTree, data, isLoading],
	);

	return (
		<TechTreeContext.Provider value={value}>
			{children}
		</TechTreeContext.Provider>
	);
}
