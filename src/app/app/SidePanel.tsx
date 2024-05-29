import { CloseOutlined } from "@/components/icons/CloseOutlined";
import { useTechTreeContext } from "@/providers/TechTreeContextProvider";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

function EditMode() {
	const { activeNode } = useTechTreeContext();
	return (
		<div>
			<div className="mb-6">
				<div className="text-xs uppercase text-gray-500">Active Node</div>
				<div className="text-lg font-bold">{activeNode?.title}</div>
			</div>
			<div className="text-xs uppercase text-gray-500">Edit Mode</div>
			<div className="text-sm">650</div>
		</div>
	);
}

function SummaryMode() {
	const { activeNode, setActiveNode } = useTechTreeContext();
	return (
		<>
			<div className="mb-6">
				<div className="text-xs uppercase text-gray-500">Active Node</div>
				<div className="text-lg font-bold">{activeNode?.title}</div>
			</div>
			<div>
				<div className="text-xs uppercase text-gray-500">Research Papers</div>
				<div className="text-sm">650</div>

				<div
					onClick={() => setActiveNode(undefined)}
					className="mt-10 cursor-pointer hover:text-blue-700"
				>
					Expand
				</div>
			</div>
		</>
	);
}

export function SidePanel() {
	const { activeNode, setActiveNode, mode } = useTechTreeContext();

	if (!activeNode) return <></>;

	return (
		<>
			<AnimatePresence>
				<motion.div
					variants={{
						hidden: { x: "100%" },
						visible: { x: 0, transition: { duration: 0.15 } },
						exit: { x: "100%", transition: { duration: 0.15 } },
					}}
					className="overflow-y-scroll h-full !w-[450px] border-l border-gray-200"
					initial="hidden"
					animate="visible"
					exit="exit"
				>
					<div className="w-full p-2 pl-6 pr-1 text-xs relative h-full">
						<div className="flex justify-end mb-3">
							<div
								onClick={() => setActiveNode(undefined)}
								className="bg-white hover:bg-red-100 group transition-colors cursor-pointer rounded px-2 py-1.5"
							>
								<CloseOutlined className="group-hover:text-red-700 text-gray-500 transition-colors" />
							</div>
						</div>
						{mode === "edit" ? <EditMode /> : <SummaryMode />}
					</div>
				</motion.div>
			</AnimatePresence>
		</>
	);
}
