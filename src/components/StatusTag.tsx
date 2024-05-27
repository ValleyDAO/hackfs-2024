import { Tag } from "@/components/Tag";
import { NodeStatus } from "@/typings";
import React from "react";

interface StatusTagProps {
	status?: NodeStatus;
}

export function StatusTag({ status }: StatusTagProps) {
	return (
		<Tag
			color={
				status === "rfp"
					? "gray"
					: status === "in-progress"
						? "blue"
						: status === "finished"
							? "green"
							: "gray"
			}
		>
			{status?.replace(/-/g, " ")?.toUpperCase()}
		</Tag>
	);
}
