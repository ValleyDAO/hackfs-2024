"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {
	useActiveWallet,
	useActiveWalletConnectionStatus,
	useDisconnect,
} from "thirdweb/react";

export default function Home() {
	const router = useRouter();
	const wallet = useActiveWallet();
	const { disconnect } = useDisconnect();
	const status = useActiveWalletConnectionStatus();

	useEffect(() => {
		if (status === "disconnected") {
			router.push("/");
		}
	}, [status]);

	return (
		<div className="my-20 flex flex-col items-center space-y-10">
			<div className="text-center">
				{wallet && <button onClick={() => disconnect(wallet)}>logout</button>}
			</div>
		</div>
	);
}
