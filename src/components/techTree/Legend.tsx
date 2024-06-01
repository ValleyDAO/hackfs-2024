import { NodeType } from "@/typings";
import clsx from "clsx";

function LegendItem({ color, label }: { color: string; label: NodeType }) {
	return (
		<div className="flex items-center space-x-1">
			<div className={clsx("w-6 h-1.5 rounded-xl", color)} />
			<div className="">{label}</div>
		</div>
	);
}

export function Legend() {
	return (
		<div className="transition-all flex flex-col absolute left-2 bottom-2 text-xs">
			<div className="flex items-center space-x-5">
				<div className="font-medium text-black">Type of nodes</div>
				<LegendItem color="bg-blue-600" label="research" />
				<LegendItem color="bg-yellow-600" label="development" />
				<LegendItem color="bg-red-600" label="optimization" />
				<LegendItem color="bg-green-600" label="end-goal" />
			</div>
		</div>
	);
}
