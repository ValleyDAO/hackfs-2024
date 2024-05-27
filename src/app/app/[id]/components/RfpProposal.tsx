import { Button } from "@/components/button";
import { Modal } from "@/components/modal";
import { FundingState } from "@/typings";
import { formatNumber } from "@/utils/number.utils";

import { InputNumber } from "@/components/input/input-number";
import { RichText } from "@/components/richText/RichText";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface DepositFundsProps {
	close(): void;
}

function DepositFunds({ close }: DepositFundsProps) {
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [value, setValue] = useState<number>(0);

	const debounced = useDebouncedValue(value, 2500);

	useEffect(() => {
		if (isSubmitting && debounced) {
			setIsSubmitting(false);
			toast.success("Funds deposited successfully");
			close();
		}
	}, [debounced]);

	return (
		<Modal
			wrapperWidth="max-w-2xl"
			bodyClassName="px-4 py-6"
			open
			close={close}
		>
			<div className="mb-10">
				<h2 className="font-bold">Add GROW</h2>
				<p className="text-sm text-gray-700 w-10/12">
					Enter the amount of GROW you would like to add to the treasury. These
					funds will directly support the research.
				</p>
			</div>
			<InputNumber
				precision={1}
				decimalSeparator="."
				aria-label="Demo number input"
				placeholder="Type a number…"
				value={value}
				onChange={(value) => setValue(value)}
			/>
			<div className="mt-4">
				<Button
					fullSize
					className="!py-3"
					loading={isSubmitting}
					variant="primary"
					onClick={() => setIsSubmitting(true)}
				>
					Deposit
				</Button>
			</div>
		</Modal>
	);
}

interface RfpProposalProps {
	nodeId?: string;
	rfp?: string;
	updateStatus?(): void;
}

export function RfpProposal({ nodeId, rfp, updateStatus }: RfpProposalProps) {
	const [intentionToAddFunds, setIntentionToAddFunds] =
		useState<boolean>(false);
	return (
		<div className="flex items-start space-x-10 mt-6">
			<div className="w-9/12 space-y-4 border border-gray-100 bg-gray-50/50 rounded p-6">
				<div className="horizontal justify-between">
					<div>
						<div className="text-base font-bold mb-1">Request For Proposal</div>
					</div>
				</div>
				<div className="p-2">
					<RichText value={rfp} />
				</div>
			</div>
			<div className="w-4/12 p-6 bg-gray-50">
				<div className="font-bold mb-8">Fund Research</div>
				<div>
					<Button
						onClick={() => setIntentionToAddFunds(true)}
						variant="primary"
						className="!py-3"
						fullSize
					>
						Fund Research
					</Button>
				</div>
			</div>
			{intentionToAddFunds && (
				<DepositFunds
					close={() => {
						setIntentionToAddFunds(false);
						updateStatus?.();
					}}
				/>
			)}
		</div>
	);
}
