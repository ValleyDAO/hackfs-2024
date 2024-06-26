import { useTechTreeContext } from "@/providers/TechTreeLayoutContextProvider";
import { NodeData, NodeType } from "@/typings";
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
	const isActive = activeNode?.id === BigInt(id);

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
					"px-10 py-4 relative !text-xs duration-300 transition-all border rounded",
					{
						"bg-green-50 border-green-600 text-green-800":
							data.type === "end-goal",
						"bg-blue-50 border-blue-600 text-blue-800":
							data.type === "research",
						"bg-yellow-50 border-yellow-600 text-yellow-800":
							data.type === "development",
						"bg-red-50 border-red-600 text-red-800":
							data.type === "optimization",
					},
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
