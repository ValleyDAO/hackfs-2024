import { EditOutlined } from "@/components/icons/EditOutlined";
import { ExperimentOutlined } from "@/components/icons/ExperimentOutlined";
import { FileOutlined } from "@/components/icons/FileOutlined";
import React, { ReactNode } from "react";

interface Document {
	name: string;
}

interface Action {
	icon: ReactNode;
	label: string;
	onClick: () => void;
}

interface ResearchContentProps {
	children: ReactNode;
	documents: Document[];
	actions?: Action[];
}

export function DocumentViewer({
	children,
	documents,
	actions,
}: ResearchContentProps) {
	return (
		<div className="border border-gray-100 rounded bg-gray-50/25 leading-relaxed">
			<div className="flex items-end pt-1 justify-between border-b border-gray-100 bg-gray-50 pl-6">
				<div className="flex">
					{documents?.map((doc) => (
						<div className="pb-0.5 space-x-1 border-b border-primary font-semibold">
							<FileOutlined className="text-base text-gray-600" />
							<span className="uppercase text-gray-900 text-sm ">
								{doc.name}
							</span>
						</div>
					))}
				</div>
				<div className="flex">
					{actions?.map((action) => (
						<div
							className="hover:bg-blue-50 text-primary transition-colors cursor-pointer space-x-2 px-4 py-1.5 rounded-tr"
							onClick={action.onClick}
						>
							<EditOutlined className="text-sm leading-none" />
							<span className="text-xs font-semibold">{action.label}</span>
						</div>
					))}
				</div>
			</div>
			<div className="p-6">{children}</div>
		</div>
	);
}
