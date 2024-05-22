import clsx from "clsx";
import {
	Handle,
	NodeProps,
	Position,
	ReactFlowState,
	useStore,
} from "reactflow";

type TechNodeProps = { label: string };

export function TechNode({
	data,
	isConnectable,
	targetPosition = Position.Top,
	sourcePosition = Position.Bottom,
	selected,
}: NodeProps<TechNodeProps>) {
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
