"use client";

import { Contributors } from "@/app/app/[id]/components/Contributors";
import { ProjectMenu } from "@/app/app/[id]/components/ProjectMenu";
import { ResearchContent } from "@/app/app/[id]/components/ResearchContent";
import { ResearchTreasury } from "@/app/app/[id]/components/ResearchTreasury";
import { RfpProposal } from "@/app/app/[id]/components/RfpProposal";
import { LoadingOutlined } from "@/components/icons/LoadingOutlined";

import { useResearchPage } from "@/app/app/[id]/providers/ResearchPageProvider";
import React from "react";

export default function Page() {
	const { status } = useResearchPage();

	return (
		<>
			{status === "rfp" ? (
				<RfpProposal />
			) : status === "in-progress" ? (
				<>
					<ResearchTreasury />
					<Contributors />
					<ResearchContent />
				</>
			) : status === "finished" ? (
				<>Finished</>
			) : (
				<div className="mt-10">
					<LoadingOutlined />
				</div>
			)}
		</>
	);
}
