"use client";

import { useContributionContract } from "@/hooks/useContributionContract";
import { TechTree } from "@/typings";
import React, {
	ReactNode,
	createContext,
	useContext,
	useMemo,
	useState,
} from "react";

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
	const { data, isLoading } = useContributionContract<TechTree[]>({
		functionName: "getTechTrees",
	});

	const value = useMemo<TechTreeProps>(
		() => ({
			activeTechTree,
			isLoading,
			techTrees: data,
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
