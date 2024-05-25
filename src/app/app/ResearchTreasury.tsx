import { Button } from "@/components/button";
import { FundingState } from "@/typings";
import { formatNumber } from "@/utils/number.utils";
import React from "react";

interface ResearchTreasuryProps {
	fundingState?: FundingState;
}

export function ResearchTreasury({ fundingState }: ResearchTreasuryProps) {
	if (!fundingState) {
		return null;
	}
	const fundingPercentage =
		(fundingState.fundingRaised / fundingState.fundingRequest) * 100;

	return (
		<div className="space-y-4 border-y border-gray-100 py-6">
			<div className="horizontal justify-between">
				<div>
					<div className="text-base font-bold mb-1">Treasury</div>
					<div className="horizontal space-x-4 text-left">
						<div className="text-base text-gray-600">
							<span className="font-black text-primary">
								${formatNumber(fundingState.fundingRaised)}
							</span>{" "}
							of ${formatNumber(fundingState.fundingRequest)}
						</div>

						<div className="text-gray-300 text-sm">|</div>
						<div className="horizontal space-x-1 text-sm">
							<div className="font-medium text-black">
								{formatNumber(fundingState.funders)}
							</div>
							<div className="text-gray-600">backers</div>
						</div>
					</div>
				</div>
				<div>
					<Button variant="primary">Fund Research</Button>
				</div>
			</div>
			<div className="horizontal space-x-1">
				<div
					className="h-2 bg-primary rounded-full"
					style={{ width: `${fundingPercentage}%` }}
				/>
				<div
					className="h-2 bg-gray-200 rounded-full"
					style={{ width: `${100 - fundingPercentage}%` }}
				/>
			</div>
		</div>
	);
}
