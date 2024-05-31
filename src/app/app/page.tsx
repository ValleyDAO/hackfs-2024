import { TechTreeLayout } from "@/components/techTree";
import { TechTreeSidePanel } from "@/components/techTree/sidePanel";
import { TechTreeContextProvider } from "@/providers/TechTreeContextProvider";
import { TechTreeDataProvider } from "@/providers/TechTreeDataProvider";

import React from "react";

export default function Home() {
	return (
		<TechTreeDataProvider>
			<TechTreeContextProvider>
				<TechTreeLayout />
				<TechTreeSidePanel />
			</TechTreeContextProvider>
		</TechTreeDataProvider>
	);
}
