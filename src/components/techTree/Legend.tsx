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
				<LegendItem color="bg-blue-600" label="fundamental-research" />
				<LegendItem color="bg-yellow-600" label="applied-research" />
				<LegendItem color="bg-red-600" label="translational-research" />
				<LegendItem color="bg-purple-600" label="technology-development" />
				<LegendItem color="bg-indigo-600" label="demonstration-validation" />
				<LegendItem color="bg-pink-600" label="implementation-deployment" />
				<LegendItem color="bg-gray-600" label="continuous-improvement" />
			</div>
		</div>
	);
}
