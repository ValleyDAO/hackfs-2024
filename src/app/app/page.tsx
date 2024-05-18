"use client";

import { TechTree } from "@/components/TechTree";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useActiveWalletConnectionStatus } from "thirdweb/react";

export default function Home() {
	const router = useRouter();
	const status = useActiveWalletConnectionStatus();

	useEffect(() => {
		if (status === "disconnected") {
			router.push("/");
		}
	}, [status]);

	return (
		<div className="p-4 pt-0 h-full w-full">
			<div className="h-full w-full rounded-lg bg-gray-100 flex flex-col justify-center items-center">
				<TechTree />
			</div>
		</div>
	);
}
