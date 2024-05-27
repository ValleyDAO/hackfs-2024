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
		<div className="flex pl-1 pt-1">
			<Link
				href="/app"
				className="horizontal px-3 text-xs space-x-1.5 py-2 text-gray-500 transition-colors bg-gray-100/75 rounded-sm cursor-pointer hover:bg-blue-50 hover:text-blue-700"
			>
				<ArrowLeftOutlined />
				<span>Back</span>
			</Link>
		</div>
	);
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="w-full rounded bg-white overflow-y-scroll">
			<TopBar />
			<div className="layout pt-14 w-full">{children}</div>
		</div>
	);
}
