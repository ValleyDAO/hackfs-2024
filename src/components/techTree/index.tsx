import React, { MouseEvent } from "react";
import ReactFlow, { ConnectionLineType } from "reactflow";

import "reactflow/dist/style.css";
import { TechNode } from "@/components/techTree/TechNode";
import { TechTreeMenu } from "@/components/techTree/menu/TechTreeMenu";

import { LoadingOutlined } from "@/components/icons/LoadingOutlined";
import { useTechTreeContext } from "@/providers/TechTreeContextProvider";
import { useTechTreeData } from "@/providers/TechTreeDataProvider";
import { NodeData } from "@/typings";
import { getLayoutElements } from "@/utils/nodes.utils";
import clsx from "clsx";

const nodeTypes = { "tech-tree": TechNode };

export function TechTreeLayout() {
	const { nodes, edges, handleEdgeUpdate, addNewNode, isLoading } =
		useTechTreeData();
	const { mode, setActiveNode, activeEditType, setActiveEditType } =
		useTechTreeContext();

	const { nodes: layoutNodes, edges: layoutEdges } = getLayoutElements(
		nodes,
		edges,
	);

	function onPossibleNodeAdd(ev: MouseEvent<HTMLDivElement>) {
		if (mode === "edit" && activeEditType === "node") {
			ev.preventDefault();
			const newNode: NodeData = {
				id: `${(nodes || []).length}`,
				title: "Placeholder",
			};
			addNewNode(newNode);
			setActiveEditType(undefined);
		}
	}

	return (
		<div
			className={clsx(
				mode === "edit" && "tech-tree-edit",
				"flex-1 relative h-full bg-grid flex",
			)}
		>
			{isLoading && (
				<div className="absolute inset-0 z-10 horizontal justify-center">
					<LoadingOutlined className="text-2xl text-gray-400" />
				</div>
			)}
			<ReactFlow
				nodes={layoutNodes}
				edges={layoutEdges}
				connectionLineType={ConnectionLineType.SmoothStep}
				fitView
				defaultEdgeOptions={{ animated: true }}
				maxZoom={1.1}
				nodeTypes={nodeTypes}
				nodesDraggable={mode === "move"}
				zoomOnPinch
				zoomOnScroll
				draggable={mode === "move"}
				autoPanOnNodeDrag={mode === "move"}
				onSelectionEnd={() => setActiveNode(undefined)}
				onClick={onPossibleNodeAdd}
				onConnect={(params) => handleEdgeUpdate(params.source, params.target)}
				edgesUpdatable={mode === "edit" && activeEditType === "edge"}
				onNodeClick={(evt, { id }) => setActiveNode(id)}
			/>
			<TechTreeMenu />
		</div>
	);
}
