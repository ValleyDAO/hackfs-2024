"use client";

import { useResearchPage } from "@/app/app/[id]/providers/ResearchPageProvider";
import { LoadingOutlined } from "@/components/icons/LoadingOutlined";
import { Contributor } from "@/typings";
import { getShortenedFormat } from "@/utils/string.utils";
import { formatDistance } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

type LogType = "creation" | "funded" | "rfp-written";

interface BasicActivityLogProps {
	contributor?: Contributor;
	createdAt?: Date;
	type: LogType;
}

function BasicActivityLog({
	contributor,
	createdAt = new Date(),
	type,
}: BasicActivityLogProps) {
	function getTypeText(type: LogType) {
		switch (type) {
			case "creation":
				return "created a new node";
			case "funded":
				return "funded the node";
			case "rfp-written":
				return "wrote an RFP";
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
	const { contributors, createdAt, creator, treasury, rfp } = useResearchPage();

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
						<div className="text-sm font-semibold mb-4">Activities</div>
						<div className="space-y-2">
							{treasury?.funder !==
								"0x0000000000000000000000000000000000000000" && (
								<BasicActivityLog
									contributor={contributors?.find(
										(item) => item.address === treasury?.funder,
									)}
									createdAt={treasury?.fundedAt}
									type="funded"
								/>
							)}
							{rfp?.writer !== "0x0000000000000000000000000000000000000000" && (
								<BasicActivityLog
									contributor={contributors?.find(
										(item) => item.address === rfp?.writer,
									)}
									createdAt={rfp?.createdAt}
									type="rfp-written"
								/>
							)}
							<BasicActivityLog
								contributor={contributors?.find(
									(item) => item.address === creator,
								)}
								createdAt={createdAt}
								type="creation"
							/>
						</div>
					</div>
				</motion.div>
			</AnimatePresence>
		</>
	);
}
