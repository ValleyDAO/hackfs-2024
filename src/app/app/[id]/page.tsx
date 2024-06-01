"use client";

import { RequestForFunding } from "@/app/app/[id]/components/RequestForFunding";
import { ContributionAndTreasury } from "@/app/app/[id]/components/overview/ContributionAndTreasury";
import { LoadingOutlined } from "@/components/icons/LoadingOutlined";

import { Contributors } from "@/app/app/[id]/components/Contributors";
import { DocumentViewer } from "@/app/app/[id]/components/DocumentViewer";
import { WriteRfp } from "@/app/app/[id]/components/WriteRfp";
import { useResearchPage } from "@/app/app/[id]/providers/ResearchPageProvider";
import { LoginButton } from "@/components/LoginButton";
import { Button } from "@/components/button";
import { EditOutlined } from "@/components/icons/EditOutlined";
import { WarningOutlined } from "@/components/icons/WarningOutlined";
import { RichText } from "@/components/richText/RichText";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useActiveAccount } from "thirdweb/react";

export default function Page() {
	const { status, id, contributions } = useResearchPage();
	const router = useRouter();
	const account = useActiveAccount();
	return (
		<>
			{status === "idle" ? (
				<WriteRfp />
			) : status === "rfp" ? (
				<RequestForFunding />
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
						{contributions && contributions?.length > 0 ? (
							<RichText
								value={contributions?.[contributions?.length - 1]?.ipfsHash}
							/>
						) : (
							<div>
								<div className=" p-2 text-sm flex items-center space-x-4 flex-wrap">
									<div className="w-8 aspect-square horizontal justify-center rounded bg-yellow-100">
										<WarningOutlined className="text-yellow-800 text-lg" />
									</div>
									<span className="text-gray-700 text-xs">
										This research does not have a{" "}
										<span className="font-medium">contribution</span> yet. Let's
										get started!
									</span>
								</div>
								<div className="mt-4">
									{account?.address ? (
										<Link href={`/app/${id}/contribute`}>
											<Button variant="primary">Contribute</Button>
										</Link>
									) : (
										<LoginButton label="Login" />
									)}
								</div>
							</div>
						)}
					</DocumentViewer>
				</>
			) : status === "finished" ? (
				<>
					<div className="mt-8">
						<h1 className="font-bold text-base ">Research concluded</h1>
						<p className="text-sm text-gray-700 mb-4">
							Thank you for your contribution. The research has been concluded.
						</p>
						<DocumentViewer
							documents={[
								{
									name: "Research",
								},
							]}
						>
							<RichText
								value={contributions?.[contributions?.length - 1]?.ipfsHash}
							/>
						</DocumentViewer>
					</div>
				</>
			) : (
				<div className="mt-10">
					<LoadingOutlined />
				</div>
			)}
		</>
	);
}
