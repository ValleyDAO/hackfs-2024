"use client";

import { Contributors } from "@/app/app/[id]/Contributors";
import { ProjectMenu } from "@/app/app/[id]/ProjectMenu";
import { ResearchContent } from "@/app/app/[id]/ResearchContent";
import { ResearchTreasury } from "@/app/app/[id]/ResearchTreasury";
import { ArrowLeftOutlined } from "@/components/icons/ArrowLeftOutlined";
import { Navigation } from "@/components/navigation";
import { useFetchTechTreeNode } from "@/hooks/useFetchTechTreeNode";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const menu = [
	{
		title: "Research Information",
	},
	{
		title: "Description",
	},
	{
		title: "Research Papers",
	},
	{
		title: "Research Videos",
	},
	{
		title: "Research Images",
	},
	{
		title: "Research Files",
	},
];

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
			<Contributors />
			<ResearchContent />
			{/*<div className="w-3/12">
					{menu.map((menuItem, menuItemIdx) => (
						<div
							key={`menu-${menuItemIdx}`}
							className="py-2.5 border-b border-gray-100 text-xs w-full hover:text-blue-700 text-gray-800 group"
						>
							{menuItem?.title}
						</div>
					))}
				</div>*/}
		</>
	);
}
