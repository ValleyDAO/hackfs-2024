"use client";

import { useResearchPage } from "@/app/app/[id]/providers/ResearchPageProvider";
import { LoadingOutlined } from "@/components/icons/LoadingOutlined";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export function ActivityLogs() {
	const [loading, setLoading] = React.useState(true);
	const { label } = useResearchPage();

	React.useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, []);

	return (
		<>
			<AnimatePresence>
				<motion.div
					variants={{
						hidden: { x: "100%" },
						visible: { x: 0, transition: { duration: 0.15 } },
						exit: { x: "100%", transition: { duration: 0.15 } },
					}}
					className="overflow-y-scroll h-full !w-[350px] border-l border-gray-100"
					initial="hidden"
					animate="visible"
					exit="exit"
				>
					<div className="w-full p-2 pl-6 pr-1 text-xs relative h-full">
						<div className="mb-6">
							<div className="text-xs uppercase text-gray-500">Active Node</div>
							<div className="text-lg font-bold">{label}</div>
						</div>
						{loading ? (
							<LoadingOutlined />
						) : (
							<div>
								<div className="text-xs uppercase text-gray-500">
									Research Papers
								</div>
								<div className="text-sm">650</div>

								<div className="mt-10 cursor-pointer hover:text-blue-700">
									Expand
								</div>
							</div>
						)}
					</div>
				</motion.div>
			</AnimatePresence>
		</>
	);
}
