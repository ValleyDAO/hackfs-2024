import { CloseOutlined } from "@/components/icons/CloseOutlined";
import { TechTreeNode } from "@/typings";
import { useEscapeKeydown } from "@radix-ui/react-use-escape-keydown";
import clsx from "clsx";
import { active } from "d3-transition";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

type DetailsPageProps = {
	close?(): void;
	activeNode: TechTreeNode;
};

const menu = [
	{
		title: "Research Information",
	},
	{
		title: "Description",
	},
	{
		title: "Research Papers",
	},
	{
		title: "Research Videos",
	},
	{
		title: "Research Images",
	},
	{
		title: "Research Files",
	},
];

export function DetailsPage({ close, activeNode }: DetailsPageProps) {
	useEscapeKeydown(() => close?.());

	return (
		<div
			onClick={() => close?.()}
			className={clsx("fixed inset-0 z-10 m-0 h-full p-0 bg-black/25")}
		>
			<AnimatePresence>
				<motion.div
					variants={{
						hidden: { y: "100%" },
						visible: { y: 0, transition: { duration: 0.15 } },
						exit: { y: "100%", transition: { duration: 0.15 } },
					}}
					onClick={(e) => e.stopPropagation()}
					onKeyDown={(e) => e.stopPropagation()}
					className="mx-auto flex w-full flex-col items-center overflow-scroll bg-white p-10 absolute m-auto left-0 right-0 bottom-0 max-w-[90%] rounded-t top-20"
					initial="hidden"
					animate="visible"
					exit="exit"
				>
					<div className="mb-3 flex w-full justify-end">
						<div
							onClick={close}
							className="bg-gray-50 hover:bg-red-100 group transition-colors cursor-pointer rounded px-2 py-0.5"
						>
							<CloseOutlined className="group-hover:text-red-700 text-sm transition-colors" />
						</div>
					</div>
					<div className="flex items-start h-full w-full space-x-20">
						<div className="w-9/12">
							<h1 className="font-bold text-3xl">{activeNode.data.label}</h1>
							<div className="py-10 border-b border-gray-100 grid grid-cols-3 gap-6">
								<div className="py-20 bg-gray-100 rounded" />
								<div className="py-20 bg-gray-100 rounded" />
								<div className="py-20 bg-gray-100 rounded" />
							</div>
							<div className="py-10 border-b border-gray-100 leading-8 text-sm">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
								sit amet erat sit amet lacus commodo ultricies. Phasellus vitae
								risus convallis dolor facilisis cursus quis vitae nisi. In vitae
								lectus eu felis euismod lacinia quis eu purus. Mauris quis
								mauris metus. Fusce ultricies feugiat fringilla. Maecenas
								lobortis dolor sit amet tellus commodo lobortis. Quisque viverra
								ex ligula, quis dictum ipsum venenatis eget. Cras ex purus,
								tempus imperdiet gravida et, consequat sed eros. Morbi faucibus
								felis at tortor pharetra blandit. Sed mattis malesuada orci eu
								tincidunt. Aliquam erat volutpat. Pellentesque magna sapien,
								finibus sed enim sit amet, sollicitudin tempor mi. In accumsan,
								ex vitae ultricies molestie, quam neque suscipit dolor, ut
								venenatis ipsum eros at tellus. Nam eget mollis quam. Aliquam
								vitae maximus purus, nec condimentum magna. Vestibulum ante
								ipsum primis in faucibus orci luctus et ultrices posuere cubilia
								curae; Nulla bibendum, dolor quis vehicula elementum, urna
								libero ultricies orci, interdum elementum metus neque in est.
								Pellentesque habitant morbi tristique senectus et netus et
								malesuada fames ac turpis egestas. Praesent libero elit,
								fringilla at lorem sed, molestie ultrices turpis. Nulla
								facilisi. Vestibulum odio eros, porttitor blandit bibendum eu,
								rhoncus id nisl. Etiam ullamcorper efficitur tortor, at bibendum
								enim vulputate non. Mauris at rutrum ante. Morbi feugiat ante ut
								tortor scelerisque sodales. Sed sit amet condimentum nunc. Cras
								vel nulla fermentum, sollicitudin arcu sed, dapibus metus.
							</div>
							<div className="py-10 border-b border-gray-100 grid grid-cols-3 gap-6">
								<div className="py-20 bg-gray-100 rounded" />
								<div className="py-20 bg-gray-100 rounded" />
								<div className="py-20 bg-gray-100 rounded" />
							</div>
						</div>
						<div className="w-3/12">
							{menu.map((menuItem, menuItemIdx) => (
								<div
									key={`menu-${menuItemIdx}`}
									className="py-2.5 border-b border-gray-100 text-xs w-full hover:text-blue-700 text-gray-800 group"
								>
									{menuItem?.title}
								</div>
							))}
						</div>
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
