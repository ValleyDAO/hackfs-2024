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
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { PreparedTransaction, prepareContractCall } from "thirdweb";

interface UploadChangesProps {
	research?: string;
	editedResearch?: string;
	close(): void;
}

function UploadChanges({ editedResearch, close }: UploadChangesProps) {
	const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
	const debouncedVal = useDebouncedValue(isSubmitting, 2500);

	useEffect(() => {
		if (debouncedVal) {
			setIsSubmitting(false);
			toast.success("Transaction successful");
			close();
		}
	}, [debouncedVal]);

	return (
		<Modal
			wrapperWidth="max-w-4xl"
			bodyClassName="px-4 py-4"
			open
			close={() => close()}
		>
			<h2 className="font-bold text-lg">Almost there</h2>
			<div className="text-xs mb-6 w-6/12">
				You're about to submit the following changes. Verify that these changes
				are intended before proceeding.
			</div>
			<div className="border border-gray-100 rounded bg-gray-50/50 p-6 text-sm">
				<div className="text-xs font-medium text-gray-500 uppercase mb-2">
					Differences
				</div>
				<RichText value={editedResearch} />
			</div>
			<div className="mt-4">
				<Button
					fullSize
					className="!py-3"
					loading={isSubmitting}
					variant="primary"
					onClick={() => setIsSubmitting(true)}
				>
					Submit Changes
				</Button>
			</div>
		</Modal>
	);
}

export default function Page() {
	const { contributions, id } = useResearchPage();
	const [editedResearch, setEditedResearch] = React.useState<
		string | undefined
	>(contributions?.[0]?.ipfsHash);
	const router = useRouter();
	const { isSuccess, isError, send, loading } = useTransaction();
	const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

	useEffect(() => {
		if (isSuccess) {
			setEditedResearch("");
			router.refresh();
		} else if (isError) {
			setIsSubmitting(false);
			toast.error("Transaction failed");
		}
	}, [isSuccess, isError]);

	async function handleUpdate() {
		if (!editedResearch) return;
		setIsSubmitting(true);

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
					<Button loading={loading}>Cancel Changes</Button>
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
