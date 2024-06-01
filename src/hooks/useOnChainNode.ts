"use client";

import { contributionContract } from "@/lib/constants";
import { Contributor, NodeData, NodeStatus, NodeType } from "@/typings";
import { useMemo } from "react";
import { useReadContract } from "thirdweb/react";

interface useFetchTechTreeNodeProps {
	isLoading: boolean;
	node?: NodeData;
}

export function useOnChainNode(id: bigint): useFetchTechTreeNodeProps {
	const { data: onChainNode, isLoading } = useReadContract({
		contract: contributionContract,
		method: "getNode",
		params: [id],
	});

	function parseOnChainDateToDateFormat(date: unknown): Date | undefined {
		if (!date || isNaN(Number(date))) return undefined;
		return new Date(Number(date) * 1000);
	}

	const node = useMemo(() => {
		if (!onChainNode) return undefined;

		/*const contributors: Contributor[] = [
			{
				address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
			},
			{
				address: "0xFc1575e15F8763A917111A63364E95A0f4f444E2",
			},
		];*/

		const arr = new Set([onChainNode.createdBy, onChainNode.rfp.writer]);
		const contributors: Contributor[] = [];
		arr.forEach((address) =>
			contributors.push({
				address,
			}),
		);

		/*for (const contributor of contributors) {
			const ensName = await resolveName({
				client: web3Client,
				address: contributor.address,
			});
			if (ensName) {
				contributor.ensName = ensName;
			}
		}*/

		const status: NodeStatus = onChainNode.isFinished
			? "finished"
			: onChainNode.rfp.ipfsHash?.length === 0
				? "idle"
				: onChainNode.rfp.ipfsHash?.length > 0 &&
						onChainNode.treasury.amount === BigInt(0)
					? "rfp"
					: onChainNode.treasury.amount > BigInt(0) &&
							onChainNode.rfp.ipfsHash?.length > 0
						? "in-progress"
						: "idle";

		return {
			title: onChainNode.title,
			id: BigInt(id),
			type: onChainNode.nodeType as NodeType,
			isFinished: onChainNode.isFinished,
			status,
			rfp: {
				createdAt: parseOnChainDateToDateFormat(onChainNode.rfp.createdAt),
				ipfsHash: onChainNode.rfp.ipfsHash,
				writer: onChainNode.rfp.writer,
			},
			createdBy: onChainNode.createdBy,
			createdAt: parseOnChainDateToDateFormat(onChainNode.createdAt),
			contributors,
			contributions: onChainNode.contributions?.map((contribution) => ({
				contributor: contribution.contributor,
				ipfsHash: contribution.ipfsHash,
				createdAt: parseOnChainDateToDateFormat(
					(contribution as any).createdAt,
				),
			})),
			treasury: {
				amount: onChainNode.treasury.amount,
				funder: onChainNode.treasury.funder,
				fundedAt: parseOnChainDateToDateFormat(onChainNode.treasury.fundedAt),
			},
		} as NodeData;
	}, [onChainNode]);

	return {
		node,
		isLoading,
	};
}
