"use client";

import { TechTree } from "@/components/TechTree";
import { CloseOutlined } from "@/components/icons/CloseOutlined";
import { TechTreeData, TechTreeEdge, TechTreeNode } from "@/typings";
import { initialEdges, initialNodes } from "@/utils/nodes.utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useActiveWalletConnectionStatus } from "thirdweb/react";

export default function Home() {
	const router = useRouter();
	const status = useActiveWalletConnectionStatus();

	const [data, setData] = useState<TechTreeData>({
		nodes: initialNodes,
		edges: initialEdges,
	});
	const [activeNode, setActiveNode] = React.useState<TechTreeNode>();

	useEffect(() => {
		if (status === "disconnected") {
			router.push("/");
		}
	}, [status]);

	return (
		<div className="p-4 pt-0 h-full w-full">
			<div className="p-2 h-full flex items-stretch rounded-lg bg-gray-100">
				<TechTree setData={setData} data={data} setActiveNode={setActiveNode} />
				{activeNode && (
					<div className="!w-[450px] h-full border-l border-gray-200">
						<div className="w-full p-2 pl-6 pr-1 text-xs relative h-full">
							<div className="flex justify-end mb-6">
								<div
									onClick={() => setActiveNode(undefined)}
									className="bg-gray-200 hover:bg-gray-300 group transition-all cursor-pointer rounded px-2 py-1.5"
								>
									<CloseOutlined />
								</div>
							</div>
							<div className="text-xs uppercase text-gray-500">Active Node</div>
							<div className="text-lg font-bold">{activeNode.data.label}</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
