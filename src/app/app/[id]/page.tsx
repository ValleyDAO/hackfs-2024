"use client";

import { Contributors } from "@/app/app/[id]/Contributors";
import { ResearchContent } from "@/app/app/[id]/ResearchContent";
import { ResearchTreasury } from "@/app/app/[id]/ResearchTreasury";
import { ArrowLeftOutlined } from "@/components/icons/ArrowLeftOutlined";
import { useFetchTechTreeNode } from "@/hooks/useFetchTechTreeNode";
import Link from "next/link";
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

function TopBar() {
	return (
		<div className="flex pl-1 pt-1">
			<Link
				href="/app"
				className="horizontal px-3 text-xs space-x-1.5 py-2 text-gray-500 transition-colors bg-gray-100/75 rounded-sm cursor-pointer hover:bg-blue-50 hover:text-blue-700"
			>
				<ArrowLeftOutlined />
				<span>Back</span>
			</Link>
		</div>
	);
}

export default function Page({ params }: Props) {
	const { node } = useFetchTechTreeNode(params.id);
	return (
		<div className="w-full rounded bg-white overflow-y-scroll">
			<TopBar />
			<div className="layout pt-14 flex items-start w-full space-x-14">
				<div className="w-9/12">
					<div className="techtree-title mb-4">
						<h1 className="font-bold text-3xl">{node?.label}</h1>
					</div>
					<ResearchTreasury fundingState={node?.fundingState} />
					<Contributors />
					<ResearchContent />
				</div>
				<div className="w-3/12">
					{menu.map((menuItem, menuItemIdx) => (
						<div
							key={`menu-${menuItemIdx}`}
							className="py-2.5 border-b border-gray-100 text-xs w-full hover:text-blue-700 text-gray-800 group"
						>
							{menuItem?.title}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
