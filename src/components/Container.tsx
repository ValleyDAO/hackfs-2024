"use client";

import DropDown from "@/components/DropDown";
import { EthAvatar } from "@/components/EthAvatar";
import { FullLogo } from "@/components/FullLogo";
import { CaretDownOutlined } from "@/components/icons/CaretDownOutlined";
import { thirdWebWallets, web3Client } from "@/lib/constants";
import { getShortenedFormat } from "@/utils/string.utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { AutoConnect, useActiveAccount } from "thirdweb/react";

const menu = [
	{
		href: "/app",
		label: "Logout",
		icon: undefined,
	},
];

export function Header() {
	const account = useActiveAccount();
	return (
		<header className="w-full px-6 h-16 flex items-center text-gray-800 justify-between">
			<div className="flex items-center space-x-3">
				<div className="w-[125px] font-semibold text-white">
					<FullLogo />
				</div>
				<span className="text-xs text-gray-400">|</span>
				<div className="text-sm">HackFS</div>
			</div>
			{account && (
				<DropDown
					menu={[
						{
							href: "/app/logout",
							label: "Logout",
						},
					]}
				>
					<div className="h-full rounded-full cursor-pointer transition-colors flex items-center space-x-2">
						<EthAvatar address={account.address} />
						<div className=" text-sm">
							{getShortenedFormat(account.address)}
						</div>
						<CaretDownOutlined className="text-[9px]" />
					</div>
				</DropDown>
			)}
		</header>
	);
}

export function Container({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	return (
		<div className="w-full h-screen">
			<Header />
			<AutoConnect
				client={web3Client}
				wallets={thirdWebWallets}
				onConnect={() => router.push("/app")}
			/>
			<div className="h-[calc(100%-4rem)] w-full">{children}</div>
		</div>
	);
}