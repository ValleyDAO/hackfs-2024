"use client";
import { web3Client } from "@/lib/constants";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";

export default function Home() {
	const router = useRouter();
	const account = useActiveAccount();

	useEffect(() => {
		if (account?.address) {
			router.push("/app");
		}
	}, [account?.address]);

	return (
		<div className="w-full h-full text-center flex flex-col items-center justify-center space-y-10">
			<div className="mb-6">
				<h1 className="text-4xl  text-center">
					Welcome to <span className="font-bold">HackFS</span>
				</h1>
				<div>
					<a
						className="text-blue-700"
						href="https://docs.filecoin.io/smart-contracts/developing-contracts/get-test-tokens"
					>
						Testnet Tokens
					</a>
				</div>
			</div>
			<ConnectButton client={web3Client} />
		</div>
	);
}
