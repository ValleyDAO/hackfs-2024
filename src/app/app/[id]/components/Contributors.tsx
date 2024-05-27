"use client";

import { getShortenedFormat } from "@/utils/string.utils";

import { web3Client } from "@/lib/constants";
import { Contributor } from "@/typings";
import React, { useEffect } from "react";
import { resolveName } from "thirdweb/extensions/ens";

const contributors: Contributor[] = [
	{
		address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
	},
	{
		address: "0xFc1575e15F8763A917111A63364E95A0f4f444E2",
	},
];

function ContributorItem({
	item,
	isLastChild,
}: { item: Contributor; isLastChild: boolean }) {
	const [ensName, setEnsName] = React.useState<string>();

	useEffect(() => {
		async function fetchEnsName() {
			const name = await resolveName({
				client: web3Client,
				address: item.address,
			});
			if (name) {
				setEnsName(name);
			}
		}
		fetchEnsName();
	}, []);

	return (
		<>
			<div className="text-sm text-primary underline">
				{ensName || getShortenedFormat(item.address)}
			</div>
			{!isLastChild && ","}
		</>
	);
}

export function Contributors() {
	return (
		<div className="pt-6 pb-3 flex items-center space-x-2">
			<h3 className="font-semibold text-sm">
				{contributors?.length} Contributors:
			</h3>
			{contributors?.map((item, idx) => (
				<ContributorItem
					key={idx}
					item={item}
					isLastChild={idx === contributors.length - 1}
				/>
			))}
		</div>
	);
}
