"use client";

import { techTreeContract } from "@/lib/constants";
import { Contributor, NodeData, NodeStatus, NodeType } from "@/typings";
import { useMemo } from "react";
import { useReadContract } from "thirdweb/react";

interface useFetchTechTreeNodeProps {
	isLoading: boolean;
	node?: NodeData;
}

export function useOnChainNode(
	techTreeId: bigint,
	id: bigint,
): useFetchTechTreeNodeProps {
	const { data: onChainNode, isLoading } = useReadContract({
		contract: techTreeContract,
		method: "getNode",
		params: [techTreeId, id],
	});

	function parseOnChainDateToDateFormat(date: unknown): Date | undefined {
		if (!date || isNaN(Number(date))) return undefined;
		return new Date(Number(date) * 1000);
	}

	const node = useMemo(() => {
		if (!onChainNode) return undefined;

		const arr = new Set([
			onChainNode.createdBy,
			onChainNode.rfp.writer,
			...(onChainNode.contributions || []).map((c) => c.contributor),
		]);
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
			techTreeId: onChainNode.techTreeId,
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
