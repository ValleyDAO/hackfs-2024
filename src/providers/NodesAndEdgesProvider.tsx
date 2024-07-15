"use client";

import { contributionAbi, contributionContractAddress } from "@/lib/constants";
import {
	EdgeData,
	NodeData,
	TechTreeData,
} from "@/typings";
import deepEqual from "deep-equal";
import React, {
	ReactNode,
	createContext,
	useContext,
	useMemo,
	useState,
} from "react";
import {useWatchContractEvent, useWriteContract} from "wagmi";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

type PublishMode = "reset" | "publish";

type NodesAndEdgesProps = {
	nodes: NodeData[];
	edges: EdgeData[];
	updateAll(roadmap: TechTreeData, removeNodeIds?: string[]): void;
	hasUpdates: boolean;
	handlePublish(mode: PublishMode): void;
	isPublishing: boolean;
	isLoading: boolean;
};

export const NodesAndEdgesContext = createContext<NodesAndEdgesProps>({
	updateAll: () => {},
	hasUpdates: false,
	nodes: [],
	edges: [],
	handlePublish: () => {},
	isPublishing: false,
	isLoading: false,
});

export const useNodesAndEdges = (): NodesAndEdgesProps => {
	const context = useContext(NodesAndEdgesContext);
	if (!context) {
		throw new Error(
			"useNodesAndEdges must be used within a NodesAndEdgesProvider",
		);
	}
	return context;
};

interface NodesAndEdgesProviderProps {
	children: ReactNode;
	techTreeId: bigint;
	nodes?: NodeData[];
	edges?: EdgeData[];
}

export function NodesAndEdgesProvider({
	children,
	techTreeId,
	nodes = [],
	edges = []
}: NodesAndEdgesProviderProps) {

	const router = useRouter();
	const [isPublishing, setIsPublishing] = useState(false);
	const { writeContract, data: hash } = useWriteContract();
	const [roadmap, setRoadmap] = useState<TechTreeData>({
		edges,
		nodes,
	});

	useWatchContractEvent({
		address: contributionContractAddress,
		abi: contributionAbi,
		eventName: "TechTreeUpdated",

		onLogs(logs) {
			logs.forEach((log) => {
				if (log.transactionHash === hash) {
					toast.success("Roadmap has been published successfully");
					setIsPublishing(false);
					router.refresh();
				}
			});
		},
	});

	function updateAll(
		{ nodes, edges }: TechTreeData,
		removeNodeIds: string[] = [],
	) {
		const nodesWithoutRemoved = nodes.filter(
			(node) => !removeNodeIds.includes(node.id),
		);
		const uniqueNodes = new Map(
			nodesWithoutRemoved
				.filter((item) => item.type !== "ultimate-objective")
				.map((node) => [node.id, node]),
		);

		const uniqueEdges = new Map(edges.map((edge) => [edge.id, edge]));

		const roadmapNodes = roadmap?.nodes?.filter(
			(node) => !removeNodeIds.includes(node.id),
		);
		roadmapNodes?.forEach((node) => uniqueNodes.set(node.id, node));
		roadmap?.edges?.forEach((edge) => uniqueEdges.set(edge.id, edge));

		setRoadmap({
			nodes: Array.from(uniqueNodes.values()),
			edges: Array.from(uniqueEdges.values()),
		});
	}

	async function handlePublish() {
		try {
			setIsPublishing(true);
			writeContract({
				abi: contributionAbi,
				address: contributionContractAddress,
				functionName: "updateTechTree",
				args: [
					techTreeId,
					roadmap?.nodes.map((node) => ({
						id: node.id,
						title: node.title || "",
						nodeType: node.type,
					})),
					roadmap?.edges.map((edge) => ({
						source: edge.source,
						target: edge.target,
					})),
				],
			});
		} catch (error) {
			console.log(error);
		}
	}

	const value = useMemo<NodesAndEdgesProps>(
		() => ({
			nodes: roadmap?.nodes,
			edges: roadmap?.edges,
			updateAll,
			hasUpdates: !deepEqual(nodes, roadmap?.nodes),
			handlePublish,
			isPublishing,
			isLoading: false,
		}),
		[roadmap, isPublishing],
	);

	return (
		<NodesAndEdgesContext.Provider value={value}>
			{children}
		</NodesAndEdgesContext.Provider>
	);
}
