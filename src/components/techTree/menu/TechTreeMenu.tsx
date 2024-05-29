import { AddFilled } from "@/components/icons/AddFilled";
import { CursorFilled } from "@/components/icons/CursorFilled";
import { EditTechTreeMenu } from "@/components/techTree/menu/EditTechTreeMenu";
import { useTechTreeContext } from "@/providers/TechTreeContextProvider";
import { TechTreeMode } from "@/typings";
import clsx from "clsx";
import React from "react";

function ModeSelectionItem({
	icon,
	mode,
}: { icon: React.ReactNode; mode: TechTreeMode }) {
	const { mode: activeMode, setMode } = useTechTreeContext();
	const isActive = activeMode === mode;
	return (
		<div
			onClick={() => setMode(mode)}
			className={clsx(
				"h-12 horizontal justify-center aspect-square cursor-pointer group hover:bg-blue-50 transition-colors rounded",
				{
					"bg-blue-50 text-blue-700": isActive,
					"bg-white text-black": !isActive,
				},
			)}
		>
			<div className="transition-colors group-hover:text-blue-700 leading-none text-xl">
				{icon}
			</div>
		</div>
	);
}

function BaseMenuBar() {
	return (
		<>
			<ModeSelectionItem mode="move" icon={<CursorFilled />} />
			<ModeSelectionItem mode="edit" icon={<AddFilled />} />
		</>
	);
}

export function TechTreeMenu() {
	const { mode, setMode } = useTechTreeContext();

	function handleBackFromEditMode() {
		setMode("move");
	}

	return (
		<div
			className={clsx("transition-all duration-4000 absolute left-0", {
				"left-0 right-0 mx-auto text-center": mode === "edit",
				"left-0": mode === "move",
			})}
		>
			<div className="p-1 flex items-center bg-white border-gray-100 border rounded space-x-1 drop-shadow-sm">
				{mode === "move" ? <BaseMenuBar /> : <EditTechTreeMenu />}
			</div>
		</div>
	);
}
