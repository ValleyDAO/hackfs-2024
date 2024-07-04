"use client";

import { NodeTypeTag } from "@/components/StatusTag";
import { Button } from "@/components/button";
import { CloseOutlined } from "@/components/icons/CloseOutlined";
import { Enhance } from "@/components/techTree/sidePanel/Enhance";
import { useTechTreeContext } from "@/providers/TechTreeLayoutContextProvider";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { EditMode } from "./EditMode";

function SummaryMode() {
	const { activeNode } = useTechTreeContext();

	return (
		<>
			<div>
				<div className="mb-6">
					<div className="text-xs uppercase text-gray-500">Active Node</div>
					<div className="text-lg font-bold">{activeNode?.title}</div>
					<div className="text-sm">{activeNode?.description}</div>
				</div>
				<div>
					<div className="text-xs text-gray-500">Node Type</div>
					<div className="text-sm">
						{activeNode?.type && <NodeTypeTag type={activeNode?.type} />}
					</div>
				</div>
			</div>
			<Enhance />
		</>
	);
}

export function TechTreeSidePanel() {
	const { activeNode, setActiveNode, mode } = useTechTreeContext();

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
					<div className="w-full p-4 pl-6 pr-4 text-xs relative h-full">
						<div className="flex justify-end mb-3">
							<div
								onClick={() => setActiveNode(undefined)}
								className="group transition-colors cursor-pointer rounded"
							>
								<CloseOutlined className="group-hover:text-red-700 text-base text-gray-500 transition-colors" />
							</div>
						</div>
						{mode === "edit" ? <EditMode /> : <SummaryMode />}
					</div>
				</motion.div>
			</AnimatePresence>
		</>
	);
}
