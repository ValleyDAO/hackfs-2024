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
import { TechTreeEdge, TechTreeNode } from "@/typings";
import { initialEdges, initialNodes } from "@/utils/nodes.utils";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 200;
const nodeHeight = 50;

interface TechTreeProps {
	setActiveNode(activeNode?: TechTreeNode): void;
}

export function TechTree({ setActiveNode }: TechTreeProps) {
	const [data, setData] = useState<{
		nodes: TechTreeNode[];
		edges: TechTreeEdge[];
	}>({ nodes: initialNodes, edges: initialEdges });

	const nodeTypes = useMemo(() => ({ "tech-tree": TechNode }), []);

	useEffect(() => {
		getLayoutElements(initialNodes, initialEdges);
	}, []);

	function getLayoutElements(nodes: TechTreeNode[], edges: TechTreeEdge[]) {
		dagreGraph.setGraph({ rankdir: "LR" });

		nodes.forEach((node) => {
			dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
		});

		edges.forEach((edge) => {
			dagreGraph.setEdge(edge.source, edge.target);
		});

		dagre.layout(dagreGraph);

		nodes.forEach((node) => {
			const nodeWithPosition = dagreGraph.node(node.id);
			// @ts-ignore
			node.targetPosition = "left";
			// @ts-ignore
			node.sourcePosition = "right";

			// We are shifting the dagre node position (anchor=center center) to the top left
			// so it matches the React Flow node anchor point (top left).
			node.position = {
				x: nodeWithPosition.x - nodeWidth / 2,
				y: nodeWithPosition.y - nodeHeight / 2,
			};

			return node;
		});

		setData({
			nodes,
			edges,
		});
	}

	return (
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
	);
}
