"use client";

import DropDown from "@/components/DropDown";
import { EthAvatar } from "@/components/EthAvatar";
import { FullLogo } from "@/components/FullLogo";
import { CaretDownOutlined } from "@/components/icons/CaretDownOutlined";
import { thirdWebWallets, web3Client } from "@/lib/constants";
import { getShortenedFormat } from "@/utils/string.utils";

import { AccountModal } from "@/components/AccountModal";
import { LoginButton } from "@/components/LoginButton";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Toaster } from "react-hot-toast";
import { AutoConnect, useActiveAccount, useActiveWallet } from "thirdweb/react";

export function Header() {
	const account = useActiveAccount();
	const [showAccountDetails, setShowAccountDetails] = React.useState(false);
	return (
		<>
			<header className="w-full px-4 h-16 flex items-center text-gray-800 justify-between">
				<div className="flex items-center space-x-3">
					<Link
						href={account?.address ? "/app" : "/"}
						className="w-[110px] font-semibold text-white"
					>
						<FullLogo className="hover:!fill-blue-700" />
					</Link>
					<span className="text-xs text-gray-400">|</span>
					<div className="text-sm">HackFS</div>
				</div>
				{account ? (
					<div className="horizontal">
						<div className="mr-6 pr-6 border-r border-gray-300">
							<a
								className="text-xs text-gray-700 hover:text-blue-700"
								href="https://docs.filecoin.io/smart-contracts/developing-contracts/get-test-tokens"
							>
								Get Testnet Tokens
							</a>
						</div>
						<div
							onClick={() => setShowAccountDetails(true)}
							className="h-full rounded cursor-pointer transition-colors pl-2 pr-4 py-1.5 hover:bg-blue-50 flex items-center space-x-2"
						>
							<EthAvatar address={account.address} />
							<div className=" text-xs">
								{getShortenedFormat(account.address)}
							</div>
							<CaretDownOutlined className="text-[9px]" />
						</div>
					</div>
				) : (
					<div>
						<LoginButton label="Login" />
					</div>
				)}
			</header>
			{showAccountDetails && (
				<AccountModal close={() => setShowAccountDetails(false)} />
			)}
		</>
	);
}

export function Container({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const pathname = usePathname();

	async function handleCreate() {
		if (!pathname.startsWith("/app")) router.push("/app");
	}

	return (
		<div className="w-full h-screen">
			<Header />
			<AutoConnect
				client={web3Client}
				wallets={thirdWebWallets}
				onConnect={handleCreate}
			/>
			<Toaster containerClassName="text-sm" position="top-center" />
			<div className="h-[calc(100%-4rem)] w-full p-4 pt-0">
				<div className="p-2 h-full flex items-stretch rounded-lg bg-gray-100">
					{children}
				</div>
			</div>
		</div>
	);
}
