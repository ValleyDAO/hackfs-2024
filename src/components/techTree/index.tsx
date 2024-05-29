import React from "react";
import ReactFlow, { ConnectionLineType } from "reactflow";

import "reactflow/dist/style.css";
import { TechNode } from "@/components/techTree/TechNode";
import { TechTreeMenu } from "@/components/techTree/menu/TechTreeMenu";

import { useTechTree } from "@/providers/TechTreeProvider";
import { getLayoutElements } from "@/utils/nodes.utils";
import clsx from "clsx";

const nodeTypes = { "tech-tree": TechNode };

export function TechTreeLayout() {
	const {
		mode,
		techTree,
		onPossibleNodeAdd,
		setActiveNode,
		activeEditType,
		handleEdgeUpdate,
	} = useTechTree();
	const { nodes, edges } = getLayoutElements(techTree?.nodes, techTree?.edges);

	return (
		<div
			className={clsx(
				mode === "edit" && "tech-tree-edit",
				"flex-1 relative h-full bg-grid flex",
			)}
		>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				connectionLineType={ConnectionLineType.SmoothStep}
				fitView
				defaultEdgeOptions={{ animated: true }}
				maxZoom={1.1}
				nodeTypes={nodeTypes}
				nodesDraggable={mode === "move"}
				zoomOnPinch={mode === "move"}
				zoomOnScroll={mode === "move"}
				draggable={mode === "move"}
				autoPanOnNodeDrag={mode === "move"}
				onSelectionEnd={() => setActiveNode(undefined)}
				onClick={onPossibleNodeAdd}
				onConnect={(params) => handleEdgeUpdate(params.source, params.target)}
				onEdgesChange={(newEdges) => console.log(newEdges)}
				edgesUpdatable={mode === "edit" && activeEditType === "edge"}
				onNodeClick={(evt, node) => setActiveNode(node)}
			/>
			<TechTreeMenu />
		</div>
	);
}
