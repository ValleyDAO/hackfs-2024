"use client";

import { getShortenedFormat } from "@/utils/string.utils";

import { useResearchPage } from "@/app/app/[id]/providers/ResearchPageProvider";

import { EthAvatar } from "@/components/EthAvatar";
import { techTreeContract } from "@/lib/constants";
import { Contributor } from "@/typings";
import { formatNumber } from "@/utils/number.utils";
import React, { useEffect } from "react";
import { useReadContract } from "thirdweb/react";

interface ContributorItemProps {
	length: number;
	idx: number;
	contributor: Contributor;
	setContributorPoints: (address: string, points: bigint) => void;
	totalPoints: bigint;
}

function ContributorItem({
	contributor,
	totalPoints,
	setContributorPoints,
}: ContributorItemProps) {
	const { id } = useResearchPage();
	const { data, isLoading } = useReadContract({
		contract: techTreeContract,
		method: "getUserNodePoints",
		params: [contributor.address, id as bigint],
	});

	useEffect(() => {
		const d = data?.toString();
		if (data?.toString()) {
			const points = BigInt(data.toString());
			setContributorPoints(contributor.address, points);
		}
	}, [data]);

	return (
		<div className="bg-gray-50 flex flex-col items-center rounded w-full py-6">
			<EthAvatar size="lg" address={contributor.address} />

			<div className="text-sm mt-3 text-primary font-bold">
				{contributor?.ensName || getShortenedFormat(contributor.address)}
			</div>
			{!isLoading && (
				<>
					<div className="text-sm mt-2">
						<span className="font-semibold">
							{formatNumber((Number(data) / Number(totalPoints)) * 100)}%
						</span>{" "}
						of the work
					</div>
					<div className="text-xs">{data?.toString()} Earned Points</div>
				</>
			)}
		</div>
	);
}

export function Contributors() {
	const { contributors } = useResearchPage();
	const [contributorPoints, setContributorPoints] = React.useState<
		{ address: string; points: bigint }[]
	>([]);

	function handleContributorPoints(address: string, points: bigint) {
		setContributorPoints([...contributorPoints, { address, points }]);
	}

	const totalPoints = contributorPoints.reduce(
		(acc, item) => acc + item.points,
		BigInt(0),
	);

	return (
		<div className="mt-10 pb-3">
			<h3 className="font-semibold text-base">
				{contributors?.length} Contributor
				{contributors && contributors?.length > 1 ? "s" : ""}
			</h3>
			<div className="grid grid-cols-6 w-full gap-2 my-4">
				{contributors?.map((item, idx) => (
					<ContributorItem
						key={`contributor-${idx}`}
						contributor={item}
						idx={idx}
						length={contributors?.length}
						setContributorPoints={handleContributorPoints}
						totalPoints={totalPoints}
					/>
				))}
			</div>
		</div>
	);
}
