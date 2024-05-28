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
		<div className="border border-gray-100 rounded bg-gray-50/75 leading-relaxed">
			<div className="horizontal  justify-between border-b border-gray-100 bg-black rounded-t px-4">
				<div className="flex pt-2">
					{documents?.map((doc) => (
						<div className=" space-x-1.5 border-b-2 pb-0.5 border-blue-800 ">
							<FileOutlined className="text-sm text-gray-200" />
							<span className="text-gray-100 text-xs">{doc.name}</span>
						</div>
					))}
				</div>
				<div className="flex items-center">
					{actions?.map((action) => (
						<div
							className="text-gray-100 hover:text-white transition-colors cursor-pointer"
							onClick={action.onClick}
						>
							<EditOutlined className="leading-none text-lg" />
						</div>
					))}
				</div>
			</div>
			<div className="p-6">{children}</div>
		</div>
	);
}
