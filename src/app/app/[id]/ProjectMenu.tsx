import { Navigation } from "@/components/navigation";

import React from "react";

interface ProjectMenuProps {
	id: string;
}

export function ProjectMenu({ id }: ProjectMenuProps) {
	const basePath = `/app/${id}`;
	return (
		<Navigation
			menu={[
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
			]}
		/>
	);
}
