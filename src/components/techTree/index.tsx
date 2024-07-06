"use client";

import React, { MouseEvent, useEffect } from "react";
import ReactFlow, {
	ConnectionLineType,
	ConnectionMode,
	Controls,
} from "reactflow";

import "reactflow/dist/style.css";
import { TechNode } from "@/components/techTree/TechNode";
import { TechTreeMenu } from "@/components/techTree/menu/TechTreeMenu";

import { LoadingOutlined } from "@/components/icons/LoadingOutlined";
import { Legend } from "@/components/techTree/Legend";
import { TechTreeSidePanel } from "@/components/techTree/sidePanel";
import { useAuth } from "@/providers/AuthProvider";
import { useNodesAndEdges } from "@/providers/NodesAndEdgesProvider";
import { useTechTreeContext } from "@/providers/TechTreeLayoutContextProvider";
import { NodeData } from "@/typings";
import { generateId, getLayoutElements } from "@/utils/nodes.utils";
import clsx from "clsx";

const nodeTypes = { "tech-tree": TechNode };

export function TechTreeLayout() {
	const { nodes, edges, handleEdgeUpdate, addNewNode, isLoading } =
		useNodesAndEdges();
	const { mode, setActiveNode, activeEditType, setActiveEditType } =
		useTechTreeContext();

	const { nodes: layoutNodes, edges: layoutEdges } = getLayoutElements(
		nodes,
		edges,
	);

	useEffect(() => {
		if (nodes && mode === "edit" && activeEditType === "node") {
			setActiveEditType(undefined);
			setActiveNode(nodes?.[nodes.length - 1]?.id);
		}
	}, [nodes]);

	function onPossibleNodeAdd(ev: MouseEvent<HTMLDivElement>) {
		if (mode === "edit" && activeEditType === "node") {
			ev.preventDefault();
			const newNode: NodeData = {
				id: generateId(),
				title: "Placeholder",
				type: "ultimate-objective",
			};
			addNewNode(newNode);
		}
	}

	return (
		<div
			className={clsx(
				mode === "edit" && "tech-tree-edit",
				"flex-1 relative h-full bg-grid flex",
			)}
		>
			<>
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
					defaultEdgeOptions={{
						animated: true,
						type: "smoothstep",
					}}
					connectionMode={ConnectionMode.Loose}
					maxZoom={1.2}
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
				>
					<Controls />
				</ReactFlow>
				<TechTreeMenu />
				<TechTreeSidePanel />
			</>
			<Legend />
		</div>
	);
}
