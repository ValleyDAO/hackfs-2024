import { TechTreeLayout } from "@/components/techTree";
import { TechTreeSidePanel } from "@/components/techTree/sidePanel";
import { NodesAndEdgesProvider } from "@/providers/NodesAndEdgesProvider";
import { TechTreeLayoutContextProvider } from "@/providers/TechTreeLayoutContextProvider";

import { TechTreeProvider } from "@/providers/TechTreeParentProvider";
import React from "react";

export default function Home() {
	return (
		<TechTreeProvider>
			<NodesAndEdgesProvider>
				<TechTreeLayoutContextProvider>
					<TechTreeLayout />
					<TechTreeSidePanel />
				</TechTreeLayoutContextProvider>
			</NodesAndEdgesProvider>
		</TechTreeProvider>
	);
}
