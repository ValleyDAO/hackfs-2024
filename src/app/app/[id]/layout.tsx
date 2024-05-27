import { ActivityLogs } from "@/app/app/[id]/components/ActivityLogs";
import { ResearchPageProvider } from "@/app/app/[id]/providers/ResearchPageProvider";
import { ArrowLeftOutlined } from "@/components/icons/ArrowLeftOutlined";

import { ResearchHead } from "@/app/app/[id]/components/ResearchHead";
import Link from "next/link";
import React from "react";

function TopBar() {
	return (
		<div className="flex mx-1 pt-1">
			<Link
				href="/app"
				className="horizontal px-3 text-xs space-x-1.5 py-2  transition-colors bg-blue-50 rounded-sm cursor-pointer hover:bg-blue-100/50 text-blue-700"
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
			<TopBar />
			<ResearchPageProvider id={params.id}>
				<div className="flex w-full h-full">
					<div className="layout pt-6 w-full">
						<ResearchHead id={params.id} />
						{children}
					</div>
					{/*<ActivityLogs />*/}
				</div>
			</ResearchPageProvider>
		</div>
	);
}
