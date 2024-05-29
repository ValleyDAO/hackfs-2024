import { Button } from "@/components/button";
import { AddFilled } from "@/components/icons/AddFilled";
import { ArrowLeftOutlined } from "@/components/icons/ArrowLeftOutlined";
import { CursorFilled } from "@/components/icons/CursorFilled";
import { EdgeOutlined } from "@/components/icons/EdgeOutlined";
import { NodeOutlined } from "@/components/icons/NodeOutlined";
import { useTechTree } from "@/providers/TechTreeProvider";
import { TechTreeAddType, TechTreeMode } from "@/typings";
import clsx from "clsx";
import React, { useEffect } from "react";

function AddObjectInEditModeItem({
	icon,
	type,
	activeEditType,
}: {
	icon: React.ReactNode;
	type: TechTreeAddType;
	activeEditType?: TechTreeAddType;
}) {
	const { setActiveEditType } = useTechTree();
	const isActive = activeEditType === type;
	return (
		<div
			onClick={() => setActiveEditType(type)}
			className={clsx(
				"h-12 horizontal justify-center space-x-1 cursor-pointer group hover:text-blue-700 rounded",
				{
					"text-blue-700": isActive,
					"bg-white text-black": !isActive,
				},
			)}
		>
			<div className="text-xl">{icon}</div>
			<div
				className={clsx("text-xs mt-1 capitalize", {
					"text-blue-700": isActive,
					"text-black group-hover:text-blue-700 transition-colors": !isActive,
				})}
			>
				{type}
			</div>
		</div>
	);
}

export function EditTechTreeMenu() {
	const { setMode, activeEditType } = useTechTree();

	function handleBackFromEditMode() {
		setMode("move");
	}

	return (
		<div className="flex items-center justify-between w-full pl-4 pr-2">
			<div>
				<div className="flex w-full items-center space-x-4">
					<div
						onClick={handleBackFromEditMode}
						className="horizontal text-sm space-x-1.5 cursor-pointer group hover:text-blue-700 text-gray-500 border-r border-gray-200 pr-8"
					>
						<ArrowLeftOutlined />
						<div className="text-xs">
							Leave{" "}
							<span className="font-medium group-hover:text-blue-700 text-gray-600">
								Edit Mode
							</span>
						</div>
					</div>
					<div className="flex items-center space-x-8">
						<AddObjectInEditModeItem
							type="node"
							activeEditType={activeEditType}
							icon={<NodeOutlined />}
						/>
						<AddObjectInEditModeItem
							type="edge"
							activeEditType={activeEditType}
							icon={<EdgeOutlined />}
						/>
					</div>
				</div>
			</div>
			<Button disabled variant="black">
				Publish
			</Button>
		</div>
	);
}
