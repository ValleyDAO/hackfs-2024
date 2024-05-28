"use client";

import { useResearchPage } from "@/app/app/[id]/providers/ResearchPageProvider";
import { LoadingOutlined } from "@/components/icons/LoadingOutlined";
import { Contributor } from "@/typings";
import { getShortenedFormat } from "@/utils/string.utils";
import { formatDistance } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

type LogType = "creation" | "funded";

interface BasicActivityLogProps {
	contributor?: Contributor;
	createdAt: string;
	type: LogType;
}

function BasicActivityLog({
	contributor,
	createdAt,
	type,
}: BasicActivityLogProps) {
	function getTypeText(type: LogType) {
		switch (type) {
			case "creation":
				return "created a new node";
			case "funded":
				return "funded the node";
			default:
				return "";
		}
	}

	return (
		<div className="flex items-center space-x-0.5 text-gray-500 text-xs">
			<div className="text-gray-400 text-[10px] leading-none mt-0.5 !mr-1.5">
				○
			</div>
			<div className="font-medium">
				{contributor?.ensName || getShortenedFormat(contributor?.address)}
			</div>
			<div className="">{getTypeText(type)}.</div>
			<div className="!ml-2.5 text-xs text-gray-400">
				{formatDistance(new Date(createdAt), new Date(), {
					addSuffix: true,
				})}
			</div>
		</div>
	);
}

export function ActivityLogs() {
	const [loading, setLoading] = React.useState(true);
	const { label, contributors } = useResearchPage();

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
					className="overflow-y-scroll h-full !w-[400px] border-l border-gray-100"
					initial="hidden"
					animate="visible"
					exit="exit"
				>
					<div className="w-full px-2 pl-6 pr-1 text-xs relative h-full">
						{loading ? (
							<LoadingOutlined />
						) : (
							<>
								<div className="text-sm font-semibold mb-4">Activities</div>
								<div className="space-y-2">
									<BasicActivityLog
										contributor={contributors?.[0]}
										createdAt="2023-09-25 18:09:30.03831+00"
										type="creation"
									/>
									<BasicActivityLog
										contributor={contributors?.[1]}
										createdAt="2024-01-25 18:09:30.03831+00"
										type="funded"
									/>
								</div>
							</>
						)}
					</div>
				</motion.div>
			</AnimatePresence>
		</>
	);
}
