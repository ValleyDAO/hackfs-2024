"use client";

import { SidePanel } from "@/app/app/SidePanel";
import { TechTree } from "@/components/techTree/TechTree";
import { useFetchNodes } from "@/hooks/useFetchNodes";
import { contributionContract } from "@/lib/constants";
import { TechTreeNode } from "@/typings";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {
	useActiveWalletConnectionStatus,
	useReadContract,
} from "thirdweb/react";

export default function Home() {
	const router = useRouter();
	const status = useActiveWalletConnectionStatus();
	const { data } = useReadContract({
		contract: contributionContract,
		method: "getNodesLite",
	});
	const [showActiveNodeContent, setShowActiveNodeContent] = React.useState<
		"sidepanel" | "details"
	>();

	const { techTree, setTechTree } = useFetchNodes();
	const [activeNode, setActiveNode] = React.useState<TechTreeNode>();

	useEffect(() => {
		if (status === "disconnected") {
			router.push("/");
		}
	}, [status]);

	function handleShowActiveNode(activeNode: TechTreeNode) {
		setActiveNode(activeNode);
		router.push(`/app/${activeNode.id}`);
		// setShowActiveNodeContent("details");
	}

	function handleCloseDetails() {
		setShowActiveNodeContent(undefined);
		setActiveNode(undefined);
	}

	console.log(data);

	if (!techTree) {
		return <></>;
	}

	return (
		<>
			<TechTree
				setData={setTechTree}
				data={techTree}
				setActiveNode={handleShowActiveNode}
			/>
			{activeNode && showActiveNodeContent === "sidepanel" && (
				<SidePanel
					activeNode={activeNode}
					openDetails={() => setShowActiveNodeContent("details")}
					close={handleCloseDetails}
				/>
			)}
		</>
	);
}
