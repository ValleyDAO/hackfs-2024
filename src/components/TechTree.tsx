import dagre from "dagre";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
	ConnectionLineType,
	applyNodeChanges,
	applyEdgeChanges,
	OnNodesChange,
	OnEdgesChange,
} from "reactflow";

import "reactflow/dist/style.css";
import { TechNode } from "@/components/TechNode";
import { TechTreeData, TechTreeEdge, TechTreeNode } from "@/typings";
import {
	defaultPosition,
	edgeType,
	getLayoutElements,
	getNodeId,
	initialEdges,
	initialNodes,
} from "@/utils/nodes.utils";

interface TechTreeProps {
	setActiveNode(activeNode?: TechTreeNode): void;
	data: TechTreeData;
	setData(data: TechTreeData): void;
}

export function TechTree({ setActiveNode, data, setData }: TechTreeProps) {
	const nodeTypes = useMemo(() => ({ "tech-tree": TechNode }), []);

	useEffect(() => {
		const data = getLayoutElements(initialNodes, initialEdges);
		setData(data);
	}, []);

	const onAdd = useCallback(() => {
		const newNode = {
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
		setData(parsedData);
	}, [data]);

	return (
		<div className="flex-1 h-full bg-grid flex">
			<div className="h-full flex items-center  ">
				<div className="p-1 bg-gray-200 border-gray-100 border rounded-full">
					<div
						onClick={onAdd}
						className="py-2 px-3.5 cursor-pointer hover:bg-blue-100 hover:text-blue-700 rounded-full bg-white text-gray-500"
					>
						+
					</div>
				</div>
			</div>
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
		</div>
	);
}
