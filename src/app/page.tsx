"use client";
import { LoginButton } from "@/components/LoginButton";
import { Button } from "@/components/button";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { useActiveAccount } from "thirdweb/react";

function WalkthroughItem({
	title,
	description,
	className,
}: { title: string; description: string; className: string }) {
	return (
		<div
			className={clsx(
				"flex flex-col items-center px-6 pt-6 pb-20 bg-white/80 rounded mb-2",
				className,
			)}
		>
			<div className="py-10 bg-gray-100 text-center rounded w-full mb-6" />
			<h3 className="text-sm font-semibold">{title}</h3>
			<p className="text-gray-700 leading-snug text-sm">{description}</p>
		</div>
	);
}

export default function Home() {
	const account = useActiveAccount();
	return (
		<>
			<div className="pt-20 space-y-10 bg-grid w-full overflow-y-scroll h-full">
				<div className="mb-14 flex flex-col items-center mx-auto w-7/12">
					<h1 className="text-2xl font-black text-center mb-2">
						Decentralized Technology Trees
					</h1>
					<p className="w-7/12 text-sm text-center mx-auto text-gray-700">
						ValleyDAO's Tech Tree is a decentralized research platform that
						allows you to explore, contribute, and fund research projects Built
						for{" "}
						<a
							className="underline hover:text-blue-700"
							href="https://ethglobal.com/events/hackfs2024"
						>
							HackFS
						</a>{" "}
						hackathon.
					</p>
					<div className="mt-6 mx-auto">
						<Link href="/app">
							<Button variant="black">Go To App</Button>
						</Link>
					</div>
				</div>
				<div className="w-8/12 mx-auto">
					<div className="flex items-stretch space-x-2">
						<WalkthroughItem
							className="w-7/12"
							title="1. Connect Wallet"
							description="Connect your wallet to get started"
						/>
						<WalkthroughItem
							className="w-5/12"
							title="2. Navigate & Explore"
							description="Explore the tech tree and discover research projects"
						/>
					</div>
					<div className="flex items-stretch space-x-2">
						<WalkthroughItem
							className="w-5/12"
							title="3. Collaborate on research projects"
							description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
						/>

						<WalkthroughItem
							className="w-7/12"
							title="4. Receive rewards & recognition"
							description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
						/>
					</div>
				</div>
			</div>
		</>
	);
}
