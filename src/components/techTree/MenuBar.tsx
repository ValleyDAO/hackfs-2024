import React from "react";

interface MenuBarProps {
	onAdd(): void;
}

export function MenuBar({ onAdd }: MenuBarProps) {
	return (
		<div className="h-full absolute top-2 left-2 flex items-start ">
			<div className="p-1 bg-white border-gray-100 border rounded space-y-1 drop-shadow-sm">
				<div
					onClick={onAdd}
					className="pt-2 pb-1.5 px-3 cursor-pointer group bg-blue-50/50 hover:bg-blue-50 transition-colors rounded-sm bg-white"
				>
					<span className="text-gray-500 transition-colors group-hover:text-blue-700 leading-none text-xl">
						+
					</span>
				</div>
			</div>
		</div>
	);
}
