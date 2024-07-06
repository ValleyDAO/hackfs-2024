import { useTechTreeContext } from "@/providers/TechTreeLayoutContextProvider";
import { NodeData, NodeType } from "@/typings";
import { getNodeTypeColor } from "@/utils/nodes.utils";
import clsx from "clsx";
import { Handle, NodeProps, Position } from "reactflow";

export function TechNode({
	data,
	isConnectable,
	targetPosition = Position.Top,
	sourcePosition = Position.Bottom,
	id,
}: NodeProps<NodeData>) {
	const { mode, activeNode, activeEditType } = useTechTreeContext();
	const hasActiveNodeInMoveMode = activeNode;
	const isActive = activeNode?.id === id;

	return (
		<>
			<Handle
				type="target"
				className={clsx(
					(mode !== "edit" || activeEditType !== "edge") && "!bg-transparent",
				)}
				position={targetPosition}
				isConnectable={isConnectable}
			/>
			<div
				className={clsx(
					"px-10 py-4 w-[350px] h-[75px] flex items-center relative !text-xs duration-300 transition-all border rounded",
					getNodeTypeColor(data.type),
					hasActiveNodeInMoveMode
						? {
								"border-gray-600 bg-white text-black": isActive,
								"opacity-50 hover:opacity-100": !isActive,
							}
						: "border-gray-200 bg-white",
				)}
			>
				<span
					className={clsx(data?.title?.length === 0 && "text-green-800/50")}
				>
					{data?.title || "no title yet"}
				</span>
			</div>
			<Handle
				type="source"
				className={clsx(
					(mode !== "edit" || activeEditType !== "edge") && "!bg-transparent",
				)}
				position={sourcePosition}
				isConnectable={mode === "edit" && activeEditType === "edge"}
			/>
		</>
	);
}
