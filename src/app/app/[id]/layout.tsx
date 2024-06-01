import { ActivityLogs } from "@/app/app/[id]/components/ActivityLogs";
import { ResearchPageProvider } from "@/app/app/[id]/providers/ResearchPageProvider";
import { ArrowLeftOutlined } from "@/components/icons/ArrowLeftOutlined";

import { ResearchHead } from "@/app/app/[id]/components/ResearchHead";
import Link from "next/link";
import React from "react";

function TopBar() {
	return (
		<div className="flex mb-2">
			<Link
				href="/app"
				className="horizontal text-xs space-x-1.5 cursor-pointer hover:text-blue-700 text-gray-500"
			>
				<ArrowLeftOutlined />
				<span>Back</span>
			</Link>
		</div>
	);
}

export default function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: { id: string };
}>) {
	return (
		<div className="w-full rounded bg-white overflow-y-scroll">
			<ResearchPageProvider id={params.id}>
				<div className="flex w-full h-full pt-10">
					<div className="layout w-full">
						<TopBar />
						<ResearchHead />
						{children}
					</div>
					<ActivityLogs />
				</div>
			</ResearchPageProvider>
		</div>
	);
}
