"use client";

import { SidePanel } from "@/app/app/SidePanel";
import { TechTreeLayout } from "@/components/techTree";
import { TechTreeContextProvider } from "@/providers/TechTreeContextProvider";
import { TechTreeDataProvider } from "@/providers/TechTreeDataProvider";

import React from "react";

export default function Home() {
	return (
		<TechTreeDataProvider>
			<TechTreeContextProvider>
				<TechTreeLayout />
				<SidePanel />
			</TechTreeContextProvider>
		</TechTreeDataProvider>
	);
}
