import { useNodesAndEdges } from "@/providers/NodesAndEdgesProvider";
import { useTechTreeContext } from "@/providers/TechTreeLayoutContextProvider";
import { EdgeData, NodeData } from "@/typings";
import { fetchWrapper } from "@/utils/query.utils";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface RelatedNodesAndEdges {
	parents?: NodeData[];
	edges?: EdgeData[];
	subject?: NodeData;
	children?: NodeData[];
}

const MAX_ITERATIONS = 20;

export function useEnhance() {
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

			const nodeIds = nodes.map((n) => n.id);
			// Add new nodes to the queue
			const newNodeIds = enhancedSubtree.nodes
				.filter((n) => !nodeIds.includes(n.id))
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

	const start = useCallback(async () => {
		setIsEnhancing(true);
		setIterationCount(0);

		setEnhancementQueue([nodes?.[0].id]);
	}, [nodes]);

	return { start };
}
