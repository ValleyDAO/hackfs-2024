"use client";

import { Contributors } from "@/app/app/[id]/components/Contributors";
import { ProjectMenu } from "@/app/app/[id]/components/ProjectMenu";
import { ResearchContent } from "@/app/app/[id]/components/ResearchContent";
import { ResearchTreasury } from "@/app/app/[id]/components/ResearchTreasury";
import { RfpProposal } from "@/app/app/[id]/components/RfpProposal";
import { StatusTag } from "@/components/StatusTag";
import { LoadingOutlined } from "@/components/icons/LoadingOutlined";
import { useFetchTechTreeNode } from "@/hooks/useFetchTechTreeNode";

import { NodeData } from "@/typings";
import React, { useEffect } from "react";

interface Props {
	params: {
		id: string;
	};
}

export default function Page({ params }: Props) {
	const { node } = useFetchTechTreeNode(params.id);
	const [localNode, setLocalNode] = React.useState<NodeData>();

	useEffect(() => {
		if (node) {
			setLocalNode(node);
		}
	}, [node]);

	return (
		<>
			<div className="techtree-title mb-6">
				<h1 className="font-bold text-3xl">{localNode?.label}</h1>
				<div className="mt-2">
					<div className="flex items-center space-x-2">
						<div className="text-xs">Status:</div>
						<StatusTag status={localNode?.status} />
					</div>
				</div>
			</div>
			<ProjectMenu id={params.id} />
			{localNode?.status === "rfp" ? (
				<RfpProposal
					nodeId={localNode?.id}
					rfp={localNode?.rfp?.content}
					updateStatus={() =>
						setLocalNode(
							(prevState) =>
								prevState && { ...prevState, status: "in-progress" },
						)
					}
				/>
			) : localNode?.status === "in-progress" ? (
				<>
					{localNode?.fundingState && (
						<ResearchTreasury
							title={localNode?.label}
							fundingState={localNode?.fundingState}
						/>
					)}
					<Contributors />
					<ResearchContent research={localNode?.content} />
				</>
			) : localNode?.status === "finished" ? (
				<>Finished</>
			) : (
				<div className="mt-10">
					<LoadingOutlined />
				</div>
			)}
		</>
	);
}
