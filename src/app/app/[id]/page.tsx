"use client";

import { ResearchContent } from "@/app/app/[id]/components/ResearchContent";
import { RfpProposal } from "@/app/app/[id]/components/RfpProposal";
import { ContributionAndTreasury } from "@/app/app/[id]/components/overview/ContributionAndTreasury";
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
					<ContributionAndTreasury />
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
