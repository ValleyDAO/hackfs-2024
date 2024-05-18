"use client";
import { web3Client } from "@/lib/constants";
import { useRouter } from "next/navigation";
import React from "react";
import { ConnectButton } from "thirdweb/react";

export default function Home() {
	const router = useRouter();
	return (
		<div className="my-20 flex flex-col items-center space-y-10">
			<div>
				<h1 className="text-4xl  text-center">
					Welcome to <span className="font-bold">HackFS</span>
				</h1>
				<div>
					<a
						className="text-blue-700"
						href="https://docs.filecoin.io/smart-contracts/developing-contracts/get-test-tokens"
					>
						How to get testnet tokens
					</a>
				</div>
				<ConnectButton
					client={web3Client}
					onConnect={() => router.push("/app")}
				/>
			</div>
		</div>
	);
}
