import { Button } from "@/components/button";
import { useEnhance } from "@/hooks/useEnhance";
import React from "react";

export function ModeSelectionItem() {
	const { start, isEnhancing } = useEnhance({});

	return (
		<div className="space-y-2">
			<div className="text-[13px] text-gray-600">
				Nodes can be described as too complex to be perceived as an actionable
				step in your roadmap. You can enhance your roadmap by adding more nodes
				and edges to the graph.
			</div>
			<Button
				onClick={start}
				variant="primary"
				loading={isEnhancing}
				size="small"
			>
				Entangle complexity
			</Button>
		</div>
	);
}
