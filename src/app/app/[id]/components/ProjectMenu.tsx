import { Navigation, NavigationItemProps } from "@/components/navigation";

import { NodeStatus } from "@/typings";
import React from "react";

interface ProjectMenuProps {
	id: string;
	status?: NodeStatus;
}

export function ProjectMenu({ id, status }: ProjectMenuProps) {
	const basePath = `/app/${id}`;
	let menu: NavigationItemProps[] = [];

	if (status === "rfp") {
		menu.push({
			href: `${basePath}`,
			label: "RFP",
		});
	} else {
		menu.push(
			{
				href: basePath,
				label: "Home",
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
