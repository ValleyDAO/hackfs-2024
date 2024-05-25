"use client";

import { ResearchTreasury } from "@/app/app/ResearchTreasury";
import { ResearchContent } from "@/app/app/[id]/ResearchContent";
import { ArrowLeftOutlined } from "@/components/icons/ArrowLeftOutlined";
import { CloseOutlined } from "@/components/icons/CloseOutlined";
import { useFetchTechTreeNode } from "@/hooks/useFetchTechTreeNode";
import clsx from "clsx";
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

export default function Page({ params }: Props) {
	const { node } = useFetchTechTreeNode(params.id);
	return (
		<div className="w-full h-full rounded bg-white overflow-y-scroll">
			<div className="flex pl-1 pt-1">
				<Link
					href="/app"
					className="horizontal px-3 text-xs space-x-1.5 py-2 text-gray-500 transition-colors bg-gray-100/75 rounded-sm cursor-pointer hover:bg-blue-50 hover:text-blue-700"
				>
					<ArrowLeftOutlined />
					<span>Back</span>
				</Link>
			</div>
			<div className="layout mt-20 flex items-start h-full w-full space-x-20">
				<div className="w-9/12">
					<div className="techtree-title mb-4">
						<h1 className="font-bold text-3xl">{node?.label}</h1>
					</div>
					<ResearchTreasury fundingState={node?.fundingState} />
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
