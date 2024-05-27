"use client";

import { Contributors } from "@/app/app/[id]/Contributors";
import { ProjectMenu } from "@/app/app/[id]/ProjectMenu";
import { Navigation } from "@/components/navigation";
import { useFetchTechTreeNode } from "@/hooks/useFetchTechTreeNode";
import { usePathname } from "next/navigation";
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
