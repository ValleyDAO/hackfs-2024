"use client";
import { LoginButton } from "@/components/LoginButton";
import { web3Client } from "@/lib/constants";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";

function WalkthroughItem({
	title,
	description,
}: { title: string; description: string }) {
	return (
		<div className="flex flex-col p-6 bg-gray-50 rounded mb-2">
			<h3 className="text-base font-bold">{title}</h3>
			<p className="text-gray-700">{description}</p>
		</div>
	);
}

export default function Home() {
	return (
		<div className="w-full h-full text-center flex flex-col items-center pt-20 space-y-10">
			<div className="mb-6">
				<h1 className="text-3xl font-black text-center mb-2">
					Introducing Decentralized Technology Trees
				</h1>
				<p className="w-7/12 mx-auto text-gray-700">
					ValleyDAO's Tech Tree is a decentralized research platform that allows
					you to explore, contribute, and fund research projects Built for{" "}
					<a
						className="underline hover:text-blue-700"
						href="https://ethglobal.com/events/hackfs2024"
					>
						HackFS
					</a>{" "}
					hackathon.
				</p>
				<div className="mt-8">
					<LoginButton variant="black" padding="!px-8 !py-3" />
				</div>

				<div className="mt-10 w-9/12 mx-auto">
					<WalkthroughItem
						title="1. Connect Wallet"
						description="Connect your wallet to get started"
					/>
					<WalkthroughItem
						title="2. Navigate & Explore"
						description="Explore the tech tree and discover research projects"
					/>
					<WalkthroughItem
						title="Configure"
						description="Decide together with the community how the tech tree should look like"
					/>
				</div>
			</div>
		</div>
	);
}
