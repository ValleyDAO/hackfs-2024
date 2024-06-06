import { Button } from "@/components/button";
import { GaladrielLogo } from "@/components/icons/GaladrielLogo";
import useWebSocket from "@/hooks/useWebSocket";
import { useNodesAndEdges } from "@/providers/NodesAndEdgesProvider";
import { useTechTreeContext } from "@/providers/TechTreeLayoutContextProvider";
import { EdgeData, NodeData } from "@/typings";
import { useState } from "react";
import toast from "react-hot-toast";

export function EnhanceWithGaladriel() {
	const { updateFromGaladriel } = useNodesAndEdges();
	const { activeNode, setMode } = useTechTreeContext();
	const [isLoading, setIsLoading] = useState(false);
	const { sendMessage } = useWebSocket("ws://54.87.241.21:8080");

	async function handleEnhancement() {
		try {
			setIsLoading(true);
			const response = await sendMessage(activeNode?.title as string);
			const techTree = JSON.parse(response) as {
				nodes: NodeData[];
				connections: EdgeData[];
			};

			updateFromGaladriel(
				techTree?.nodes.map((node, idx) => ({
					id: BigInt(idx),
					title: node.title,
					type: node.type,
				})),
				techTree?.connections.map((edge, idx) => ({
					id: `${idx}`,
					source: `${Number(edge.source) - 1}`,
					target: `${Number(edge.target) - 1}`,
				})),
			);
			setMode("edit");
		} catch (error) {
			console.error("Error while enhancing", error);
			toast.error("Error while enhancing. Try again later");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="mt-10">
			<div className="w-20">
				<GaladrielLogo scaleWithParent />
			</div>
			<div className="mt-2 leading-relaxed text-gray-800">
				Galadriel, decentralized and on-chain AI-agent, allows you to enhance
				the end-goal by populating development, research and optimization
				criteria.
			</div>
			<div className="mt-4">
				<Button variant="black" loading={isLoading} onClick={handleEnhancement}>
					Enhance
				</Button>
			</div>
		</div>
	);
}
