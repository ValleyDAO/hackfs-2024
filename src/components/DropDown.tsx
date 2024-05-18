import React, {
	MouseEvent,
	ReactNode,
	useEffect,
	useRef,
	useState,
} from "react";

import clsx from "clsx";
import Link from "next/link";

interface MenuDropdownProps {
	children: ReactNode;
	menu: { label: string; href: string }[];
	visible?: boolean;
}

function DropDown({ children, menu, visible = true }: MenuDropdownProps) {
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		document.addEventListener("click", handleDocumentClick, false);
		return () => {
			document.removeEventListener("click", handleDocumentClick, false);
		};
	}, []);

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	function handleDocumentClick(event: any) {
		if (dropdownRef?.current && !dropdownRef.current.contains(event.target)) {
			setIsOpen(false);
		}
	}

	function handleMouseDown(event: MouseEvent<HTMLDivElement>) {
		if (event.type === "mousedown" && event.button !== 0) return;
		setIsOpen(true);
	}

	const dropdownMenu =
		visible && isOpen ? (
			<div
				className="overflow-y-auto right-0 absolute top-[100%] z-50 mt-1 list-none text-left bg-clip-padding bg-white rounded border outline-none shadow-sm"
				aria-expanded="true"
			>
				{menu.map((menuItem, menuItemIdx) => (
					<div
						key={`menu-section-${menuItemIdx}`}
						className="block py-1.5 px-5 clear-both !w-48 relative !m-1 text-sm text-gray-900 hover:text-blue-700 whitespace-nowrap cursor-pointer"
					>
						{menu.map((menuItem) => (
							<Link
								href={menuItem.href}
								className="h-full text-sm hover:text-blue-700 text-gray-800 group"
							>
								{menuItem?.label}
							</Link>
						))}
					</div>
				))}
			</div>
		) : null;

	return (
		<div
			onMouseDown={handleMouseDown}
			ref={dropdownRef}
			className="overflow-visible relative h-full"
		>
			{children}
			{dropdownMenu}
		</div>
	);
}

export default DropDown;
