import { Navigation, NavigationItemProps } from "@/components/navigation";

import { useResearchPage } from "@/app/app/[techTreeId]/node/[id]/providers/ResearchPageProvider";
import { NodeStatus } from "@/typings";
import { usePathname } from "next/navigation";
import React from "react";

interface ProjectMenuProps {
	status?: NodeStatus;
}

export function ProjectMenu({ status }: ProjectMenuProps) {
	const { id, techTreeId } = useResearchPage();
	const basePath = `/app/${techTreeId}/node/${id}`;
	let menu: NavigationItemProps[] = [];
	const pathname = usePathname();

	if (status === "idle") {
		menu.push({
			href: basePath,
			label: "Home",
		});
	} else if (status === "rfp") {
		menu.push({
			href: basePath,
			label: "RFP",
		});
	} else {
		menu.push(
			{
				href: basePath,
				label: "Home",
				isActive: pathname === `${basePath}/contribute`,
			},
			{
				href: `${basePath}/contributions`,
				label: "Contributions",
			},
			{
				href: `${basePath}/treasury`,
				label: "Treasury",
			},
			{
				href: `${basePath}/governance`,
				label: "Governance",
			},
		);
	}

	return <Navigation menu={menu} />;
}
