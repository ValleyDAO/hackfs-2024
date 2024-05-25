"use client";

import { ResearchTreasury } from "@/app/app/ResearchTreasury";
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
					<div className="py-10 border-b border-gray-100 grid grid-cols-3 gap-6">
						<div className="py-20 bg-white rounded" />
						<div className="py-20 bg-white rounded" />
						<div className="py-20 bg-white rounded" />
					</div>
					<div className="py-10 border-b border-gray-100 leading-8 text-sm">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit
						amet erat sit amet lacus commodo ultricies. Phasellus vitae risus
						convallis dolor facilisis cursus quis vitae nisi. In vitae lectus eu
						felis euismod lacinia quis eu purus. Mauris quis mauris metus. Fusce
						ultricies feugiat fringilla. Maecenas lobortis dolor sit amet tellus
						commodo lobortis. Quisque viverra ex ligula, quis dictum ipsum
						venenatis eget. Cras ex purus, tempus imperdiet gravida et,
						consequat sed eros. Morbi faucibus felis at tortor pharetra blandit.
						Sed mattis malesuada orci eu tincidunt. Aliquam erat volutpat.
						Pellentesque magna sapien, finibus sed enim sit amet, sollicitudin
						tempor mi. In accumsan, ex vitae ultricies molestie, quam neque
						suscipit dolor, ut venenatis ipsum eros at tellus. Nam eget mollis
						quam. Aliquam vitae maximus purus, nec condimentum magna. Vestibulum
						ante ipsum primis in faucibus orci luctus et ultrices posuere
						cubilia curae; Nulla bibendum, dolor quis vehicula elementum, urna
						libero ultricies orci, interdum elementum metus neque in est.
						Pellentesque habitant morbi tristique senectus et netus et malesuada
						fames ac turpis egestas. Praesent libero elit, fringilla at lorem
						sed, molestie ultrices turpis. Nulla facilisi. Vestibulum odio eros,
						porttitor blandit bibendum eu, rhoncus id nisl. Etiam ullamcorper
						efficitur tortor, at bibendum enim vulputate non. Mauris at rutrum
						ante. Morbi feugiat ante ut tortor scelerisque sodales. Sed sit amet
						condimentum nunc. Cras vel nulla fermentum, sollicitudin arcu sed,
						dapibus metus.
					</div>
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
