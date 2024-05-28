"use client";

import { useResearchPage } from "@/app/app/[id]/providers/ResearchPageProvider";
import { Button } from "@/components/button";
import { CloseOutlined } from "@/components/icons/CloseOutlined";
import { Modal } from "@/components/modal";
import { InputRichText } from "@/components/richText/InputRichText";
import { RichText } from "@/components/richText/RichText";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

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
	const { content, id } = useResearchPage();
	const [editedResearch, setEditedResearch] = React.useState<
		string | undefined
	>(content);
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

	function handleUpdate() {
		setIsSubmitting(false);
		router.push(`/app/${id}`);
	}

	return (
		<>
			<div className="w-full mt-8 space-y-2">
				<div className="mt-4 flex justify-end space-x-2">
					<Link href={`/app/${id}`}>
						<Button>Cancel Changes</Button>
					</Link>
					<Button variant="primary" onClick={() => setIsSubmitting(true)}>
						Submit Changes
					</Button>
				</div>
				<InputRichText
					minRows={10}
					value={editedResearch}
					onChange={(description) => setEditedResearch(description)}
				/>
			</div>
			{isSubmitting && (
				<UploadChanges
					research={content}
					editedResearch={editedResearch}
					close={handleUpdate}
				/>
			)}
		</>
	);
}
