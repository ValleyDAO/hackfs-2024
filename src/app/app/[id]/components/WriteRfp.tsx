import { useResearchPage } from "@/app/app/[id]/providers/ResearchPageProvider";
import { LoginButton } from "@/components/LoginButton";
import { Button } from "@/components/button";
import { WarningOutlined } from "@/components/icons/WarningOutlined";
import { InputRichText } from "@/components/richText/InputRichText";
import { useTransaction } from "@/hooks/useTransaction";
import { techTreeContract } from "@/lib/constants";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { PreparedTransaction, prepareContractCall } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";

export function WriteRfp() {
	const router = useRouter();
	const account = useActiveAccount();
	const { id } = useResearchPage();
	const [writeRfp, setWriteRfp] = React.useState(false);
	const [proposal, setProposal] = React.useState<string>();
	const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
	const { loading, send, isSuccess, isError } = useTransaction();

	useEffect(() => {
		if (isSuccess) {
			setProposal("");
			setWriteRfp(false);
			router.refresh();
		} else if (isError) {
			setIsSubmitting(false);
		}
	}, [isSuccess]);

	async function handlePublish() {
		if (!proposal || isNaN(Number(id))) return;
		setIsSubmitting(true);

		const transaction = prepareContractCall({
			contract: techTreeContract,
			method: "addRfp",
			params: [id as bigint, proposal],
		}) as PreparedTransaction;
		await send(transaction);
	}

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
						{account?.address ? (
							<Button
								withAuth
								onClick={() => setWriteRfp(true)}
								variant="primary"
							>
								Write & Upload an RFP
							</Button>
						) : (
							<LoginButton label="Login" />
						)}
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
								loading={isSubmitting || loading}
								disabled={!proposal || proposal?.length < 2}
								variant="primary"
								onClick={() => handlePublish()}
							>
								Publish
							</Button>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
