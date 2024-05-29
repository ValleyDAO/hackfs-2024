import { Button } from "@/components/button";
import { CloseOutlined } from "@/components/icons/CloseOutlined";
import InputText from "@/components/input/InputText";
import { useTechTreeContext } from "@/providers/TechTreeContextProvider";
import { useTechTreeData } from "@/providers/TechTreeDataProvider";
import { NodeData } from "@/typings";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect } from "react";

function EditMode() {
	const { handleNodeUpdate } = useTechTreeData();
	const { activeNode, setActiveNode } = useTechTreeContext();
	const [update, setUpdate] = React.useState<Partial<NodeData>>({
		title: activeNode?.title,
	});

	useEffect(() => {
		setUpdate({
			title: activeNode?.title,
		});
	}, [activeNode]);

	function handleSave() {
		if (!activeNode?.id) return;
		handleNodeUpdate(activeNode.id, update);
		setUpdate({});
		setActiveNode(undefined);
	}

	if (!activeNode?.id) return <></>;

	return (
		<div>
			<div className="mb-6">
				<div className="text-xs uppercase text-gray-500">Edit Mode</div>
				<div className="text-lg font-bold">{activeNode?.title}</div>
			</div>

			<InputText
				label="Title"
				value={update.title}
				onChange={(value) => setUpdate((prev) => ({ ...prev, title: value }))}
			/>
			<div className="mt-4 flex justify-end">
				<Button onClick={handleSave} variant="primary">
					Save
				</Button>
			</div>
		</div>
	);
}

function SummaryMode() {
	const { activeNode, setActiveNode } = useTechTreeContext();
	return (
		<>
			<div>
				<div className="mb-6">
					<div className="text-xs uppercase text-gray-500">Active Node</div>
					<div className="text-lg font-bold">{activeNode?.title}</div>
				</div>
				<div>
					<div className="text-xs uppercase text-gray-500">Research Papers</div>
					<div className="text-sm">650</div>
				</div>
			</div>
			<Link href={`/app/${activeNode?.id}`} className="mt-10 block w-full">
				<Button className="!py-3" fullSize variant="black">
					Visit Details Page
				</Button>
			</Link>
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
					className="overflow-y-scroll h-full !w-[450px] border-l ml-2 border-gray-200"
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
