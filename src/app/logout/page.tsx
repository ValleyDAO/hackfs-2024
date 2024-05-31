"use client";

import { LoadingOutlined } from "@/components/icons/LoadingOutlined";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useActiveWallet, useDisconnect } from "thirdweb/react";

export default function Page() {
	const router = useRouter();
	const activeWallet = useActiveWallet();
	const { disconnect } = useDisconnect();

	useEffect(() => {
		handleLogout();
	}, [activeWallet]);

	async function handleLogout() {
		if (!activeWallet) return;
		disconnect(activeWallet);
		router.push("/");
	}

	return (
		<div className="h-full overflow-hidden flex justify-between">
			<LoadingOutlined />
		</div>
	);
}
