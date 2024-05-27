"use client";

import { getShortenedFormat } from "@/utils/string.utils";

import { useResearchPage } from "@/app/app/[id]/providers/ResearchPageProvider";

import React from "react";

export function Contributors() {
	const { contributors } = useResearchPage();
	return (
		<div className="pt-6 pb-3 flex items-center space-x-2">
			<h3 className="font-semibold text-sm">
				{contributors?.length} Contributors:
			</h3>
			{contributors?.map((item, idx) => (
				<>
					<div className="text-sm text-primary underline">
						{item?.ensName || getShortenedFormat(item.address)}
					</div>
					{idx !== contributors.length - 1 && ","}
				</>
			))}
		</div>
	);
}
