import { Button } from "@/components/button";
import { useNodesAndEdges } from "@/providers/NodesAndEdgesProvider";
import { useTechTreeContext } from "@/providers/TechTreeLayoutContextProvider";
import { EdgeData, NodeData } from "@/typings";
import { fetchWrapper } from "@/utils/query.utils";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

const MAX_ITERATIONS = 50;
const MAX_DEPTH = 10;

export function EnhanceWithGaladriel() {
	const { updateAll, nodes, edges } = useNodesAndEdges();
	const { activeNode, setMode } = useTechTreeContext();
	const [isLoading, setIsLoading] = useState(false);
	const [iterationCount, setIterationCount] = useState(0);

	const getRelatedNodesAndEdges = useCallback(
		(nodeId: string): { nodes: NodeData[]; edges: EdgeData[] } => {
			const relatedEdges = edges.filter(
				(edge) => edge.source === nodeId || edge.target === nodeId,
			);
			const relatedNodeIds = new Set(
				relatedEdges.flatMap((edge) => [edge.source, edge.target]),
			);
			const relatedNodes = nodes.filter((node) => relatedNodeIds.has(node.id));
			return { nodes: relatedNodes, edges: relatedEdges };
		},
		[edges, nodes],
	);

	const enhanceSubtree = useCallback(
		async (subtree: { nodes: NodeData[]; edges: EdgeData[] }): Promise<{
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
		[],
	);

	const recursivelyEnhanceTree = useCallback(
		async (nodeId: string, depth: number = 0): Promise<void> => {
			if (iterationCount >= MAX_ITERATIONS || depth >= MAX_DEPTH) {
				return;
			}

			const subtree = getRelatedNodesAndEdges(nodeId);
			const enhancedSubtree = await enhanceSubtree(subtree);

			if (enhancedSubtree.expanded) {
				const updatedTree = mergeEnhancedData(
					{ nodes, edges },
					enhancedSubtree,
				);
				updateAll(updatedTree.nodes, updatedTree.edges);
				setIterationCount((prev) => prev + 1);

				// Recursively enhance new nodes
				const newNodeIds = enhancedSubtree.nodes
					.filter((n) => !subtree.nodes.some((on) => on.id === n.id))
					.map((n) => n.id);

				for (const newNodeId of newNodeIds) {
					await recursivelyEnhanceTree(newNodeId, depth + 1);
				}
			}

			// Continue with existing child nodes
			const childNodeIds = edges
				.filter((e) => e.source === nodeId)
				.map((e) => e.target);

			for (const childId of childNodeIds) {
				await recursivelyEnhanceTree(childId, depth + 1);
			}
		},
		[
			nodes,
			edges,
			getRelatedNodesAndEdges,
			enhanceSubtree,
			mergeEnhancedData,
			updateAll,
			iterationCount,
		],
	);

	async function handleVerification() {
		try {
			const edge = edges?.find((edge) => edge.source && edge.target);
			const targetNodes = nodes?.filter(
				(item) => item.id === edge?.source || item.id === edge?.target,
			);

			const response = await fetchWrapper<{
				nodes: NodeData[];
				edges: EdgeData[];
			}>("/verify-tech-tree", {
				method: "POST",
				body: JSON.stringify({
					nodes: targetNodes,
					edge,
				}),
			});

			updateAll(
				[...nodes, ...(response?.nodes || [])],
				[...edges, ...(response?.edges || [])],
			);
		} catch (error) {
			console.error("Error while enhancing", error);
			toast.error("Error while enhancing. Try again later");
		}
	}

	const startEnhancement = useCallback(async () => {
		if (!activeNode) {
			toast.error("No active node selected");
			return;
		}

		setIsLoading(true);
		setIterationCount(0);

		const response = await fetchWrapper<{
			nodes: NodeData[];
			edges: EdgeData[];
		}>("/generate-tech-tree?title=" + activeNode?.title);

		updateAll(
			response?.nodes.map((node) => ({
				id: node.id,
				title: node.title,
				type: node.type,
			})),
			response?.edges.map((edge, idx) => ({
				id: edge.id,
				source: edge.source,
				target: edge.target,
			})),
		);

		try {
			await recursivelyEnhanceTree(activeNode.id);
			toast.success(
				`Tree enhancement completed after ${iterationCount} operations.`,
			);
		} catch (error) {
			console.error("Error while enhancing", error);
			toast.error("Error while enhancing. Try again later");
		} finally {
			setIsLoading(false);
		}
	}, [activeNode, recursivelyEnhanceTree, iterationCount]);

	return (
		<div className="mt-10">
			<div className="mt-4 flex flex-col space-y-2">
				<Button variant="black" loading={isLoading} onClick={startEnhancement}>
					Enhance Tree Recursively
				</Button>
			</div>
		</div>
	);
}
