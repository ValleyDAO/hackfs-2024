"use client";

import { NodeTypeTag } from "@/components/StatusTag";
import { Button } from "@/components/button";
import { CloseOutlined } from "@/components/icons/CloseOutlined";
import { Enhance } from "@/components/techTree/sidePanel/Enhance";
import { useNodesAndEdges } from "@/providers/NodesAndEdgesProvider";
import { useTechTreeContext } from "@/providers/TechTreeLayoutContextProvider";
import { EdgeData, NodeData } from "@/typings";
import { fetchWrapper } from "@/utils/query.utils";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

function SummaryMode() {
	const { activeNode } = useTechTreeContext();

	return (
		<>
			<Enhance />
		</>
	);
}

export function TechTreeSidePanel() {
	const { updateAll } = useNodesAndEdges();
	const { activeNode, setActiveNode, mode } = useTechTreeContext();
	const [isEditing, setIsEditing] = React.useState(false);
	const [isGenerating, setIsGenerating] = React.useState(false);

	async function create() {
		setIsGenerating(true);
		const response = await fetchWrapper<{
			nodes: NodeData[];
			edges: EdgeData[];
		}>(`/generate-tech-tree?title=${activeNode?.title}&id=${activeNode?.id}`);

		updateAll(
			response?.nodes.map((node) => ({
				id: node.id,
				title: node.title,
				description: node.description,
				type: node.type,
			})),
			response?.edges.map((edge, idx) => ({
				id: `${idx}`,
				source: edge.source,
				target: edge.target,
			})),
		);
		setIsGenerating(false);
		setActiveNode(undefined);
	}

	if (!activeNode) return <></>;

	return (
		<>
			<AnimatePresence>
				<motion.div
					variants={{
						hidden: { x: "100%" },
						visible: { x: 0, transition: { duration: 0.15 } },
						exit: { x: "100%", transition: { duration: 0.5 } },
					}}
					className="overflow-y-scroll rounded bg-white drop-shadow-sm h-full !w-[450px] ml-2 border-gray-200"
					initial="hidden"
					animate="visible"
					exit="exit"
				>
					<div className="w-full p-8 text-xs relative h-full">
						<div className="flex justify-between mb-3">
							<div className="mb-6">
								<div className="text-lg font-bold">{activeNode?.title}</div>
								<div className="text-sm">{activeNode?.description || "-"}</div>
							</div>
							<div
								onClick={() => setActiveNode(undefined)}
								className="group transition-colors cursor-pointer rounded"
							>
								<CloseOutlined className="group-hover:text-red-700 text-base text-gray-500 transition-colors" />
							</div>
						</div>
						<div className="text-sm">
							{activeNode?.type && <NodeTypeTag type={activeNode?.type} />}
						</div>
						<div className="mt-6">
							You are in {mode} mode. You can either add nodes and connections
							manually or use the AI to generate them.
						</div>
						<div className="mt-6">
							<Button loading={isGenerating} variant="primary" onClick={create}>
								Generate Roadmap
							</Button>
						</div>
					</div>
				</motion.div>
			</AnimatePresence>
		</>
	);
}
