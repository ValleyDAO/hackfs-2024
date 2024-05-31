import { Button } from "@/components/button";
import { CloseOutlined } from "@/components/icons/CloseOutlined";
import { InputSelect } from "@/components/input/InputSelect";
import InputText from "@/components/input/InputText";
import { useTechTreeContext } from "@/providers/TechTreeContextProvider";
import { useTechTreeData } from "@/providers/TechTreeDataProvider";
import { NodeData, NodeType, SelectOptionItem } from "@/typings";
import { parseTypeToSearchFieldItems } from "@/utils/select.utils";
import { capitalize } from "@walletconnect/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect } from "react";

function EditMode() {
	const { handleNodeUpdate } = useTechTreeData();
	const { activeNode, setActiveNode } = useTechTreeContext();
	const [update, setUpdate] = React.useState<Partial<NodeData>>({
		title: activeNode?.title,
		type: activeNode?.type,
	});

	useEffect(() => {
		setUpdate({
			title: activeNode?.title,
			type: activeNode?.type,
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
		<div className="pr-2">
			<div className="mb-6">
				<div className="text-xs uppercase text-gray-500">Edit Mode</div>
				<div className="text-lg font-bold">{activeNode?.title}</div>
			</div>

			{activeNode?.origin !== "on-chain" ? (
				<div className="space-y-3">
					<InputText
						label="Title"
						value={update.title}
						onChange={(value) =>
							setUpdate((prev) => ({ ...prev, title: value }))
						}
					/>
					<InputSelect
						label="Type"
						options={parseTypeToSearchFieldItems()}
						value={{
							label: capitalize((update.type || "")?.toLowerCase()) || "-",
							value: update.type || "-",
						}}
						onChange={(item: SelectOptionItem) =>
							setUpdate((prev) => ({
								...prev,
								type: item.value as NodeType,
							}))
						}
						isMulti={false}
					/>
					<div className="!mt-4 !pt-4 border-t border-gray-100 w-full space-y-3">
						<Button
							disabled={
								!update?.title || update?.title?.length < 2 || !update.type
							}
							fullSize
							onClick={handleSave}
							variant="primary"
						>
							Save
						</Button>
						<div className="w-10/12 text-gray-500">
							* Saving a node only adds the changes locally. To fully address
							the changes, you need to publish them.
						</div>
					</div>
				</div>
			) : (
				<div className="text-xs px-6 py-4 bg-yellow-50 rounded leading-relaxed text-yellow-700">
					This node is already on-chain and currently cannot be edited. Join our
					Discord and ask us to amplify this feature!
				</div>
			)}
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
