"use client";

import { SidePanel } from "@/app/app/SidePanel";
import { TechTreeLayout } from "@/components/techTree";
import { TechTreeProvider } from "@/providers/TechTreeProvider";
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
		<TechTreeProvider>
			<TechTreeLayout />
			<SidePanel />
		</TechTreeProvider>
	);
}
