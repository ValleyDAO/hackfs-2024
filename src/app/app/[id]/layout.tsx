import { ResearchPageProvider } from "@/app/app/[id]/providers/ResearchPageProvider";
import { ArrowLeftOutlined } from "@/components/icons/ArrowLeftOutlined";
import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
	title: "ValleyDAO | HackFS 2024",
	description: "-",
};

function TopBar() {
	return (
		<div className="flex mx-1 py-1 border-b border-gray-100">
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
			<div className="layout pt-6 w-full">
				<ResearchPageProvider id={params.id}>{children}</ResearchPageProvider>
			</div>
		</div>
	);
}
