"use client";

import { ResearchEditor } from "@/app/app/[id]/components/ResearchEditor";
import { EditOutlined } from "@/components/icons/EditOutlined";
import { ExperimentOutlined } from "@/components/icons/ExperimentOutlined";
import { RichText } from "@/components/richText/RichText";
import React from "react";

interface ResearchContentProps {
	research?: string;
}

export function ResearchContent({ research }: ResearchContentProps) {
	const [isEditing, setIsEditing] = React.useState(false);
	return (
		<>
			<div className="border border-gray-100 rounded bg-gray-50/25 leading-relaxed">
				<div className="flex items-end justify-between border-b border-gray-100 bg-gray-50 pl-6">
					<div className="pb-1 text-primary space-x-1 border-b border-primary font-semibold">
						<ExperimentOutlined className="text-xs" />
						<span className="uppercase text-xs ">RESEARCH</span>
					</div>
					<div
						className="hover:bg-blue-50 transition-colors cursor-pointer space-x-2 px-4 py-1.5 rounded-tr"
						onClick={() => setIsEditing(true)}
					>
						<EditOutlined className="text-primary text-sm leading-none" />
						<span className="text-xs font-semibold text-primary">
							Contribute
						</span>
					</div>
				</div>
				<div className="p-6">
					<RichText value={research} />
				</div>
			</div>
			{isEditing && research && (
				<ResearchEditor close={() => setIsEditing(false)} research={research} />
			)}
		</>
	);
}
