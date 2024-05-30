"use client";

import { RfpProposal } from "@/app/app/[id]/components/RfpProposal";
import { ContributionAndTreasury } from "@/app/app/[id]/components/overview/ContributionAndTreasury";
import { LoadingOutlined } from "@/components/icons/LoadingOutlined";

import { Contributors } from "@/app/app/[id]/components/Contributors";
import { DocumentViewer } from "@/app/app/[id]/components/DocumentViewer";
import { WriteRfp } from "@/app/app/[id]/components/WriteRfp";
import { useResearchPage } from "@/app/app/[id]/providers/ResearchPageProvider";
import { EditOutlined } from "@/components/icons/EditOutlined";
import { RichText } from "@/components/richText/RichText";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
	const { status, id, content } = useResearchPage();
	const router = useRouter();
	return (
		<>
			{status === "idle" ? (
				<WriteRfp />
			) : status === "rfp" ? (
				<RfpProposal />
			) : status === "in-progress" ? (
				<>
					<ContributionAndTreasury />
					<Contributors />
					<DocumentViewer
						documents={[
							{
								name: "Research",
							},
						]}
						actions={[
							{
								icon: <EditOutlined />,
								label: "Contribute",
								onClick: () => {
									router.push(`/app/${id}/contribute`);
								},
							},
						]}
					>
						<RichText value={content} />
					</DocumentViewer>
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
