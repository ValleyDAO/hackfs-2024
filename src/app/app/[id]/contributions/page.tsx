"use client";

import { Contributors } from "@/app/app/[id]/components/Contributors";
import { ProjectMenu } from "@/app/app/[id]/components/ProjectMenu";
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
			<Contributors />
		</>
	);
}
