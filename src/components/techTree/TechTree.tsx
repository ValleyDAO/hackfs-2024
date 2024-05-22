import React, { useEffect, useMemo } from "react";
import ReactFlow, { ConnectionLineType } from "reactflow";

import "reactflow/dist/style.css";
import { TechNode } from "@/components/TechNode";
import { MenuBar } from "@/components/techTree/MenuBar";
import { techTreeContract } from "@/lib/constants";
import { TechTreeData, TechTreeNode } from "@/typings";
import {
	getLayoutElements,
	initialEdges,
	initialNodes,
} from "@/utils/nodes.utils";
import { prepareContractCall } from "thirdweb";
import { useEstimateGas, useSendTransaction } from "thirdweb/react";

interface TechTreeProps {
	setActiveNode(activeNode?: TechTreeNode): void;
	data: TechTreeData;
	setData(data: TechTreeData): void;
}

export function TechTree({ setActiveNode, data, setData }: TechTreeProps) {
	const nodeTypes = useMemo(() => ({ "tech-tree": TechNode }), []);
	const { mutate, isPending, status, error, mutateAsync } =
		useSendTransaction();
	const { mutateAsync: estimateGasCost, data: gasEstimate } = useEstimateGas();
	console.log({
		isPending,
		status,
		error,
	});

	useEffect(() => {
		const data = getLayoutElements(initialNodes, initialEdges);
		setData(data);
	}, []);

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
				contract: techTreeContract,
				method: "addNode",
				params: ["Added node"],
			});
			// @ts-ignore
			const tx = mutate(transaction);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="flex-1 relative h-full bg-grid flex">
			<ReactFlow
				nodes={data?.nodes}
				edges={data?.edges}
				connectionLineType={ConnectionLineType.SmoothStep}
				fitView
				defaultEdgeOptions={{ animated: true }}
				maxZoom={1.1}
				nodeTypes={nodeTypes}
				nodesDraggable={false}
				zoomOnPinch={false}
				zoomOnScroll={false}
				draggable={false}
				autoPanOnNodeDrag={false}
				onSelectionEnd={() => setActiveNode(undefined)}
				onNodeClick={(evt, node) => setActiveNode(node)}
			/>
			<MenuBar onAdd={onAdd} />
		</div>
	);
}
