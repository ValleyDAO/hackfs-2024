import { Button } from "@/components/button";
import { WarningOutlined } from "@/components/icons/WarningOutlined";
import { Modal } from "@/components/modal";
import { InputRichText } from "@/components/richText/InputRichText";
import { useSendTx } from "@/hooks/useSendTx";
import React from "react";

export function WriteRfp() {
	const [writeRfp, setWriteRfp] = React.useState(false);
	const [proposal, setProposal] = React.useState<string>();
	const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
	const { loading, sendTx } = useSendTx({
		type: "RfpAdded",
	});
	return (
		<div className="mt-4">
			{!writeRfp ? (
				<>
					<div className=" p-2 text-sm flex items-center space-x-4 flex-wrap">
						<div className="w-8 aspect-square horizontal justify-center rounded bg-yellow-100">
							<WarningOutlined className="text-yellow-800 text-lg" />
						</div>
						<span className="text-gray-700">
							This research does not have an{" "}
							<span className="font-medium">Request for Proposal (RFP)</span>{" "}
							yet. Let's get started!
						</span>
					</div>
					<div className="mt-4">
						<Button onClick={() => setWriteRfp(true)} variant="primary">
							Write & Upload an RFP
						</Button>
					</div>
				</>
			) : (
				<>
					<div className="!pt-4">
						<InputRichText
							minRows={10}
							label="Request For Proposal"
							value={proposal}
							onChange={(rfp) => setProposal(rfp)}
						/>
						<div className="mt-4 flex justify-end">
							<Button
								className="!py-2 !px-6"
								loading={isSubmitting}
								disabled={!proposal || proposal?.length < 2}
								variant="primary"
								onClick={() => setIsSubmitting(true)}
							>
								Publish
							</Button>
						</div>
					</div>
					<Modal open={isSubmitting} close={() => setIsSubmitting(false)}>
						sdfsdf
						<Button onClick={() => sendTx}></Button>
					</Modal>
				</>
			)}
		</div>
	);
}
