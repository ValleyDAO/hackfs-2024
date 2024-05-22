"use client";

import { DetailsPage } from "@/app/app/DetailsPage";
import { SidePanel } from "@/app/app/SidePanel";
import { TechTree } from "@/components/techTree/TechTree";
import { TechTreeData, TechTreeNode } from "@/typings";
import { initialEdges, initialNodes } from "@/utils/nodes.utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useActiveWalletConnectionStatus } from "thirdweb/react";

export default function Home() {
	const router = useRouter();
	const status = useActiveWalletConnectionStatus();

	const [showActiveNodeContent, setShowActiveNodeContent] = React.useState<
		"sidepanel" | "details"
	>();

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

	function handleShowActiveNode(activeNode: TechTreeNode) {
		setActiveNode(activeNode);
		setShowActiveNodeContent("sidepanel");
	}

	function handleCloseDetails() {
		setShowActiveNodeContent(undefined);
		setActiveNode(undefined);
	}

	return (
		<>
			<TechTree
				setData={setData}
				data={data}
				setActiveNode={handleShowActiveNode}
			/>
			{activeNode && showActiveNodeContent === "sidepanel" && (
				<SidePanel
					activeNode={activeNode}
					openDetails={() => setShowActiveNodeContent("details")}
					close={handleCloseDetails}
				/>
			)}
			{showActiveNodeContent === "details" && activeNode && (
				<DetailsPage activeNode={activeNode} close={handleCloseDetails} />
			)}
		</>
	);
}
