import { Button } from "@/components/button";
import { CloseOutlined } from "@/components/icons/CloseOutlined";
import { DifferenceTracker } from "@/components/richText/DifferenceTracker";
import { InputRichText } from "@/components/richText/InputRichText";
import { InputRichTextV2 } from "@/components/richText/InputRichTextV2";
import { RichText } from "@/components/richText/RichText";
import { useEscapeKeydown } from "@radix-ui/react-use-escape-keydown";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

type ResearchEditorProps = {
	close(): void;
	research: string;
};

interface UploadChangesProps {
	research: string;
	editedResearch: string;
}

function UploadChanges({ research, editedResearch }: UploadChangesProps) {
	const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
	return (
		<>
			<h2 className="font-bold text-lg">Almost there</h2>
			<div className="text-sm mb-6 w-8/12">
				You're about to submit the following changes. Verify that these changes
				are intended before proceeding.
			</div>
			<div className="border border-gray-100 rounded bg-gray-50/50 p-6">
				<div className="text-xs font-medium text-gray-500 uppercase mb-2">
					Differences
				</div>
				<RichText value={research} />
				<div className="mt-4">{JSON.stringify(editedResearch)}</div>
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
		</>
	);
}

export function ResearchEditor({ close, research }: ResearchEditorProps) {
	useEscapeKeydown(() => close?.());
	const [editedResearch, setEditedResearch] = React.useState<string>(research);
	const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

	async function handleUpdate() {
		//await update({ description });
		close();
	}

	return (
		<div
			onClick={() => close?.()}
			className={clsx("fixed inset-0 z-10 m-0 h-full p-0 bg-black/25")}
		>
			<AnimatePresence>
				<motion.div
					variants={{
						hidden: { y: "100%" },
						visible: { y: 0, transition: { duration: 0.15 } },
						exit: { y: "100%", transition: { duration: 0.15 } },
					}}
					onClick={(e) => e.stopPropagation()}
					onKeyDown={(e) => e.stopPropagation()}
					className="mx-auto flex w-full flex-col items-center overflow-scroll bg-white p-10 absolute m-auto left-0 right-0 bottom-0 max-w-7xl rounded-t top-20"
					initial="hidden"
					animate="visible"
					exit="exit"
				>
					<div className="mb-3 flex w-full justify-end">
						<div
							onClick={close}
							className="bg-gray-50 hover:bg-red-100 group transition-colors cursor-pointer rounded px-2 py-0.5"
						>
							<CloseOutlined className="group-hover:text-red-700 text-sm transition-colors" />
						</div>
					</div>

					<div className="w-8/12">
						{isSubmitting ? (
							<UploadChanges
								research={research}
								editedResearch={editedResearch}
							/>
						) : (
							<>
								<InputRichTextV2
									minRows={10}
									label="Research"
									value={editedResearch}
									onChange={(description) => setEditedResearch(description)}
								/>
								<div className="mt-4">
									<Button
										fullSize
										className="!py-3"
										loading={isSubmitting}
										variant="primary"
										onClick={() => setIsSubmitting(true)}
									>
										Save
									</Button>
								</div>
							</>
						)}
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
