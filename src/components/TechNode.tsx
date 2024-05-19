import { Handle, NodeProps, Position } from "reactflow";

type TechNodeProps = { label: string };

export function TechNode({
	data,
	isConnectable,
	targetPosition = Position.Top,
	sourcePosition = Position.Bottom,
}: NodeProps<TechNodeProps>) {
	return (
		<>
			<Handle
				type="target"
				position={targetPosition}
				isConnectable={isConnectable}
			/>
			<div className="px-10 py-4 text-xs bg-white border border-gray-200 rounded">
				{data?.label}
			</div>
			<Handle
				type="source"
				position={sourcePosition}
				isConnectable={isConnectable}
			/>
		</>
	);
}
