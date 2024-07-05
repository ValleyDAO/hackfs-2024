import { AddFilled } from "@/components/icons/AddFilled";
import { CursorFilled } from "@/components/icons/CursorFilled";
import { EnhanceOutlined } from "@/components/icons/EnhanceOutlined";
import { EditTechTreeMenu } from "@/components/techTree/menu/EditTechTreeMenu";
import { useNodesAndEdges } from "@/providers/NodesAndEdgesProvider";
import { useTechTreeContext } from "@/providers/TechTreeLayoutContextProvider";
import { EdgeData, NodeData, TechTreeMode } from "@/typings";
import { fetchWrapper } from "@/utils/query.utils";
import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface RelatedNodesAndEdges {
	parents?: NodeData[];
	edges?: EdgeData[];
	subject?: NodeData;
	children?: NodeData[];
}

const MAX_ITERATIONS = 20;

function ModeSelectionItem({
	icon,
	mode,
	label,
}: { icon: React.ReactNode; mode: TechTreeMode; label: string }) {
	const { mode: activeMode, setMode } = useTechTreeContext();
	const isActive = activeMode === mode;
	const { updateAll, nodes, edges } = useNodesAndEdges();
	const { activeNode } = useTechTreeContext();
	const [isEnhancing, setIsEnhancing] = useState(true);
	const [iterationCount, setIterationCount] = useState(0);
	const [enhancementQueue, setEnhancementQueue] = useState<string[]>([]);

	const getRelatedNodesAndEdges = useCallback(
		(nodeId: string): RelatedNodesAndEdges => {
			const subject = nodes.find((node) => node.id === nodeId);
			if (!subject) return {};

			const childEdges = edges.filter((edge) => edge.target === nodeId);
			const parentEdges = edges.filter((edge) => edge.source === nodeId);

			const parentIds = parentEdges?.map((item) => item.target);
			const childIds = childEdges?.map((item) => item.source);

			const children = nodes.filter((node) => childIds?.includes(node.id));
			const parents = nodes.filter((node) => parentIds?.includes(node.id));

			return {
				parents,
				children,
				edges: [...childEdges, ...parentEdges],
				subject,
			};
		},
		[edges, nodes],
	);

	const enhanceSubtree = useCallback(
		async (
			subtree: RelatedNodesAndEdges,
		): Promise<{
			nodes: NodeData[];
			edges: EdgeData[];
			expanded: boolean;
		}> => {
			return fetchWrapper<{
				nodes: NodeData[];
				edges: EdgeData[];
				expanded: boolean;
			}>("/enhance-subtree", {
				method: "POST",
				body: JSON.stringify(subtree),
			});
		},
		[],
	);

	const mergeEnhancedData = useCallback(
		(
			original: { nodes: NodeData[]; edges: EdgeData[] },
			enhanced: { nodes: NodeData[]; edges: EdgeData[] },
		): { nodes: NodeData[]; edges: EdgeData[] } => {
			const mergedNodes = [...original.nodes];
			const mergedEdges = [...original.edges];

			enhanced.nodes.forEach((enhancedNode) => {
				const index = mergedNodes.findIndex((n) => n.id === enhancedNode.id);
				if (index !== -1) {
					mergedNodes[index] = enhancedNode;
				} else {
					mergedNodes.push(enhancedNode);
				}
			});

			enhanced.edges.forEach((enhancedEdge) => {
				if (!mergedEdges.some((e) => e.id === enhancedEdge.id)) {
					mergedEdges.push(enhancedEdge);
				}
			});

			return { nodes: mergedNodes, edges: mergedEdges };
		},
		[nodes, edges],
	);

	const enhanceNextInQueue = useCallback(async () => {
		if (enhancementQueue.length === 0 || iterationCount >= MAX_ITERATIONS) {
			setIsEnhancing(false);
			if (iterationCount !== 0)
				toast.success(
					`Tree enhancement completed after ${iterationCount} operations.`,
				);
			return;
		}

		const nodeId = enhancementQueue[0];
		const subtree = getRelatedNodesAndEdges(nodeId);
		const enhancedSubtree = await enhanceSubtree(subtree);

		if (enhancedSubtree.expanded) {
			const updatedTree = mergeEnhancedData({ nodes, edges }, enhancedSubtree);
			updateAll(updatedTree.nodes, updatedTree.edges);
			setIterationCount((prev) => prev + 1);

			// Add new nodes to the queue
			const newNodeIds = enhancedSubtree.nodes
				.filter((n) => !nodes.some((on) => on.id === n.id))
				.map((n) => n.id);

			setEnhancementQueue((prev) => [...prev.slice(1), ...newNodeIds]);
		} else {
			setEnhancementQueue((prev) => prev.slice(1));
		}

		// Add child nodes to the queue
		const childNodeIds = edges
			.filter((e) => e.source === nodeId)
			.map((e) => e.target);

		setEnhancementQueue((prev) => [...prev, ...childNodeIds]);
	}, [
		enhancementQueue,
		iterationCount,
		getRelatedNodesAndEdges,
		enhanceSubtree,
		mergeEnhancedData,
		nodes,
		edges,
		updateAll,
	]);

	useEffect(() => {
		if (isEnhancing) {
			enhanceNextInQueue();
		}
	}, [isEnhancing, enhanceNextInQueue, enhancementQueue]);

	const startEnhancement = useCallback(async () => {
		setIsEnhancing(true);
		setIterationCount(0);

		setEnhancementQueue([nodes?.[0].id]);
	}, [activeNode]);

	function handleClick(newMode: TechTreeMode) {
		if (newMode !== "enhance") {
			setMode(newMode);
		} else {
			startEnhancement();
		}
	}

	return (
		<div
			onClick={() => handleClick(mode)}
			className={clsx(
				"h-12 vertical justify-center space-y-1.5 items-center aspect-square cursor-pointer group hover:bg-blue-50 transition-colors rounded",
				{
					"bg-blue-50 text-blue-700": isActive,
					"bg-white text-black": !isActive,
				},
			)}
		>
			<div className="transition-colors group-hover:text-blue-700 leading-none text-base">
				{icon}
			</div>
			<span
				className={clsx("text-[9px] leading-none font-medium uppercase", {
					"text-blue-700": isActive,
					"text-gray-800": !isActive,
				})}
			>
				{label}
			</span>
		</div>
	);
}

function BaseMenuBar() {
	return (
		<>
			<ModeSelectionItem label="move" mode="move" icon={<CursorFilled />} />
			<ModeSelectionItem label="edit" mode="edit" icon={<AddFilled />} />
			<ModeSelectionItem
				label="enhance"
				mode="enhance"
				icon={<EnhanceOutlined />}
			/>
		</>
	);
}

export function TechTreeMenu() {
	const { mode } = useTechTreeContext();

	return (
		<div
			className={clsx("transition-all flex flex-col absolute left-0", {
				"left-0 right-0 mx-auto w-full items-stretch text-center":
					mode === "edit",
				"left-0 items-start": mode === "move",
			})}
		>
			<div className="p-1 flex items-center bg-white border-gray-100 border rounded space-x-1 drop-shadow-sm">
				{mode === "move" ? <BaseMenuBar /> : <EditTechTreeMenu />}
			</div>
			{/*<div className="mt-4 mr-auto">
				<div className="text-gray-500 text-xs">* Technology trees</div>
			</div>*/}
		</div>
	);
}
