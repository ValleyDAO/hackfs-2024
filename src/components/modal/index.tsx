import { useEscapeKeydown } from "@radix-ui/react-use-escape-keydown";

import { CloseOutlined } from "@/components/icons/CloseOutlined";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

type ModalProps = {
	children: ReactNode;
	close?(): void;
	title?: string;
	bodyClassName?: string;
	wrapperWidth?:
		| "max-w-lg"
		| "max-w-xl"
		| "max-w-2xl"
		| "max-w-3xl"
		| "max-w-4xl"
		| "max-w-5xl";
	open: boolean;
	withBackground?: boolean;
	position?: "top" | "center" | "bottom" | "left" | "right";
};

export function Modal({
	children,
	close,
	title,
	open,
	withBackground = true,
	position = "bottom",
	wrapperWidth = "max-w-lg",
	bodyClassName,
}: ModalProps) {
	if (!open) return <></>;

	return (
		<div
			onClick={() => close?.()}
			className={clsx("fixed inset-0 z-10 m-0 h-full p-0", {
				"bg-black/25": withBackground,
			})}
		>
			<AnimatePresence>
				<motion.div
					variants={{
						hidden: { y: "100%" },
						visible: { y: 0, transition: { duration: 0.15 } },
						exit: { y: "100%", transition: { duration: 0.15 } },
					}}
					className="flex h-full w-full items-center"
					initial="hidden"
					animate="visible"
					exit="exit"
				>
					<div
						onClick={(e) => e.stopPropagation()}
						onKeyDown={(e) => e.stopPropagation()}
						className={clsx(
							"mx-auto flex w-full flex-col items-center overflow-scroll bg-white p-6",
							{
								"absolute inset-0 z-10 rounded": !position,
								"absolute m-auto left-0 right-0 rounded top-32":
									position === "bottom",
								"fixed inset-0 left-auto": position === "right",
							},
							bodyClassName,
							wrapperWidth,
						)}
					>
						{title && (
							<div className="mb-2.5 left- flex w-full items-center justify-between border-b border-gray-100 pb-2.5">
								<div className="text-lg font-bold">{title}</div>
								<div className="hover:bg-gray-100 rounded px-1 group">
									<CloseOutlined
										className="text-base cursor-pointer group-hover:text-black transition-colors text-gray-400"
										onClick={() => close?.()}
									/>
								</div>
							</div>
						)}
						<div className="flex h-full w-full flex-col">{children}</div>
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
