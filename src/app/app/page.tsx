"use client";

import { SidePanel } from "@/app/app/SidePanel";
import { TechTreeLayout } from "@/components/techTree";
import { TechTreeContextProvider } from "@/providers/TechTreeContextProvider";
import { TechTreeDataProvider } from "@/providers/TechTreeDataProvider";
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
		<TechTreeDataProvider>
			<TechTreeContextProvider>
				<TechTreeLayout />
				<SidePanel />
			</TechTreeContextProvider>
		</TechTreeDataProvider>
	);
}
