"use client";

import { getShortenedFormat } from "@/utils/string.utils";

import { useResearchPage } from "@/app/app/[id]/providers/ResearchPageProvider";

import React from "react";

export function Contributors() {
	const { contributors } = useResearchPage();
	return (
		<div className="pt-6 pb-3 flex items-center space-x-2">
			<h3 className="font-semibold text-xs">
				{contributors?.length} Contributors:
			</h3>
			<div className="flex items-center space-x-2">
				{contributors?.map((item, idx) => (
					<div key={`contributor-${idx}`} className="">
						<div className="text-xs text-primary underline">
							{item?.ensName || getShortenedFormat(item.address)}
							{idx !== contributors.length - 1 && ","}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
