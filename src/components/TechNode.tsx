import { useTechTree } from "@/providers/TechTreeProvider";
import clsx from "clsx";
import { Handle, NodeProps, Position } from "reactflow";

type TechNodeProps = { label: string };

export function TechNode({
	data,
	isConnectable,
	targetPosition = Position.Top,
	sourcePosition = Position.Bottom,
	selected,
}: NodeProps<TechNodeProps>) {
	const { mode } = useTechTree();
	return (
		<>
			<Handle
				type="target"
				position={targetPosition}
				isConnectable={isConnectable}
			/>
			<div
				className={clsx("px-10 py-4 !text-xs bg-white border rounded", {
					"border-gray-600": selected,
					"border-gray-200": !selected,
				})}
			>
				<span className="techtree-title">{data?.label}</span>
			</div>
			<Handle
				type="source"
				position={sourcePosition}
				isConnectable={isConnectable}
			/>
		</>
	);
}
