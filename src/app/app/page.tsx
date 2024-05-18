"use client";

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
			<div className="h-full w-full rounded-lg bg-gray-200/60 flex flex-col justify-center items-center">
				<h2 className="font-bold text-xl">Authenticated</h2>
			</div>
		</div>
	);
}
