"use client";

import { FullLogo } from "@/components/FullLogo";
import { thirdWebWallets, web3Client } from "@/lib/constants";
import { getShortenedFormat } from "@/utils/string.utils";
import { useRouter } from "next/navigation";
import React from "react";
import { AutoConnect, useActiveAccount } from "thirdweb/react";

export function Header() {
	const account = useActiveAccount();
	return (
		<header className="w-full bg-black pl-4 h-14 flex items-stretch justify-between">
			<div className="w-[110px] font-semibold text-white">
				<FullLogo />
			</div>
			{account && (
				<div className="px-6 h-full flex items-center bg-gray-900">
					<div className="text-white text-sm">
						{getShortenedFormat(account.address)}
					</div>
				</div>
			)}
		</header>
	);
}

export function Container({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	return (
		<>
			<Header />
			<AutoConnect
				client={web3Client}
				wallets={thirdWebWallets}
				onConnect={() => router.push("/app")}
			/>
			{children}
		</>
	);
}
