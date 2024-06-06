"use client";

import { useResearchPage } from "@/app/app/[id]/providers/ResearchPageProvider";
import { Button } from "@/components/button";
import { CloseOutlined } from "@/components/icons/CloseOutlined";
import { Modal } from "@/components/modal";
import { InputRichText } from "@/components/richText/InputRichText";
import { RichText } from "@/components/richText/RichText";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useTransaction } from "@/hooks/useTransaction";
import { techTreeContract } from "@/lib/constants";
import { useTxEvents } from "@/providers/ContractEventsProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { PreparedTransaction, prepareContractCall } from "thirdweb";

export default function Page() {
	const { contributions, id } = useResearchPage();
	const [editedResearch, setEditedResearch] = React.useState<
		string | undefined
	>(contributions?.[0]?.ipfsHash);
	const router = useRouter();
	const { events } = useTxEvents();
	const { send, loading } = useTransaction();

	useEffect(() => {
		const event = events.find(
			(event) => event.eventName === "ContributionAdded",
		);
		if (event) {
			router.push(`/app/${id}`);
		}
	}, [events, id]);

	async function handleUpdate() {
		if (!editedResearch) return;

		const transaction = prepareContractCall({
			contract: techTreeContract,
			method: "addContribution",
			params: [id as bigint, editedResearch],
		}) as PreparedTransaction;
		await send(transaction);
	}

	return (
		<div className="w-full mt-2 space-y-2">
			<div className="mt-4 flex justify-end space-x-2">
				<Link href={`/app/${id}`}>
					<Button disabled={loading}>Cancel Changes</Button>
				</Link>
				<Button loading={loading} variant="primary" onClick={handleUpdate}>
					Submit Changes
				</Button>
			</div>
			<InputRichText
				minRows={10}
				value={editedResearch}
				onChange={(description) => setEditedResearch(description)}
			/>
		</div>
	);
}
