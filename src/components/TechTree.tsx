import dagre from "dagre";
import React, { useCallback, useEffect } from "react";
import ReactFlow, {
	addEdge,
	ConnectionLineType,
	useNodesState,
	useEdgesState,
	useReactFlow,
} from "reactflow";

import "reactflow/dist/style.css";
import { TechTreeEdge, TechTreeNode } from "@/typings";
import { initialEdges, initialNodes } from "@/utils/nodes.utils";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 200;
const nodeHeight = 50;

export function TechTree() {
	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	useEffect(() => {
		getLayoutedElements(initialNodes, initialEdges);
	}, []);

	function getLayoutedElements(nodes: TechTreeNode[], edges: TechTreeEdge[]) {
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
			node.targetPosition = "left";
			node.sourcePosition = "right";

			// We are shifting the dagre node position (anchor=center center) to the top left
			// so it matches the React Flow node anchor point (top left).
			node.position = {
				x: nodeWithPosition.x - nodeWidth / 2,
				y: nodeWithPosition.y - nodeHeight / 2,
			};

			return node;
		});

		setNodes(nodes as any);
		setEdges(edges);
	}

	return (
		<ReactFlow
			nodes={nodes}
			edges={edges}
			onNodesChange={onNodesChange}
			onEdgesChange={onEdgesChange}
			connectionLineType={ConnectionLineType.SmoothStep}
			fitView
			maxZoom={1}
			nodesDraggable={false}
			zoomOnPinch={false}
			zoomOnScroll={false}
			draggable={false}
			autoPanOnNodeDrag={false}
		/>
	);
}
