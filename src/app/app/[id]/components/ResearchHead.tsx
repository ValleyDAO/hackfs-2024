"use client";

import { ProjectMenu } from "@/app/app/[id]/components/ProjectMenu";
import { useResearchPage } from "@/app/app/[id]/providers/ResearchPageProvider";
import { StatusTag } from "@/components/StatusTag";
import React from "react";

interface ResearchHeadProps {
	id: string;
}

export function ResearchHead({ id }: ResearchHeadProps) {
	const { label, status } = useResearchPage();

	if (!label || !status) return <></>;
	return (
		<>
			<div className="techtree-title mb-6">
				<h1 className="font-black text-2xl">{label}</h1>
				<div className="mt-1">
					<div className="flex items-center space-x-2">
						<div className="text-xs">Status:</div>
						<StatusTag status={status} />
					</div>
				</div>
			</div>
			<ProjectMenu status={status} id={id} />
		</>
	);
}
