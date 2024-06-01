import { Button } from "@/components/button";
import { GaladrielLogo } from "@/components/icons/GaladrielLogo";
import useWebSocket from "@/hooks/useWebSocket";
import { useNodesAndEdges } from "@/providers/NodesAndEdgesProvider";
import { useTechTreeContext } from "@/providers/TechTreeLayoutContextProvider";
import { NodeData } from "@/typings";
import { useState } from "react";

export function EnhanceWithGaladriel() {
	const { addNewNodes, nodes } = useNodesAndEdges();
	const { activeNode } = useTechTreeContext();
	const [isLoading, setIsLoading] = useState(false);
	const { sendMessage } = useWebSocket("ws://54.87.241.21:8080");

	async function handleEnhancement() {
		setIsLoading(true);
		const response = await sendMessage(activeNode?.title as string);
		const newNodes = JSON.parse(response) as NodeData[];
		const length = nodes?.length;

		addNewNodes(
			newNodes
				.filter((item) => item.type !== "end-goal")
				.map((node, idx) => ({
					id: BigInt(length + idx),
					title: node.title,
					type: node.type,
				})),
		);
		setIsLoading(false);
	}

	return (
		<div className="mt-14">
			<div className="w-20">
				<GaladrielLogo scaleWithParent />
			</div>
			<div className="mt-2 leading-relaxed text-gray-800">
				Galadriel, decentralized and on-chain AI-agent, allows you to enhance
				the end-goal by populating development, research and optimization
				criteria.
			</div>
			<div className="mt-4">
				<Button
					variant="primary"
					loading={isLoading}
					onClick={handleEnhancement}
				>
					Enhance
				</Button>
			</div>
		</div>
	);
}
