"use client";

import { ProjectMenu } from "@/app/app/[id]/components/ProjectMenu";
import { ResearchTreasury } from "@/app/app/[id]/components/ResearchTreasury";
import { Table, TableCell, TableRow } from "@/components/table";
import { useFetchTechTreeNode } from "@/hooks/useFetchTechTreeNode";
import React from "react";

interface Props {
	params: {
		id: string;
	};
}

export default function Page({ params }: Props) {
	const { node } = useFetchTechTreeNode(params.id);
	return (
		<>
			<div className="techtree-title mb-6">
				<h1 className="font-bold text-3xl">{node?.label}</h1>
			</div>
			<ProjectMenu id={params.id} />
			{node?.fundingState && (
				<ResearchTreasury
					title={node?.label}
					fundingState={node?.fundingState}
				/>
			)}
			<div className="mt-10">
				<div className="font-bold mb-4">Active Payroll</div>
				<Table
					headers={[
						{
							label: "Researcher",
							columnSpan: 5,
						},
						{
							label: "Total Tokens",
							columnSpan: 3,
						},
						{
							label: "Available to Claim",
							columnSpan: 3,
						},
					]}
				>
					<TableRow index={0}>
						<TableCell className="py-2" columnSpan={5}>
							vitalik.eth
						</TableCell>
						<TableCell columnSpan={3}>200.242 GROW</TableCell>
						<TableCell columnSpan={3}>12.1 GROW</TableCell>
					</TableRow>
				</Table>
			</div>
		</>
	);
}
