"use client";

import { ProjectMenu } from "@/app/app/[id]/components/ProjectMenu";
import { useResearchPage } from "@/app/app/[id]/providers/ResearchPageProvider";
import { StatusTag } from "@/components/StatusTag";
import { Button } from "@/components/button";
import { useTransaction } from "@/hooks/useTransaction";
import { techTreeContract } from "@/lib/constants";
import { isInvalidNumber } from "@/utils/number.utils";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { PreparedTransaction, prepareContractCall } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";

export function ResearchHead() {
	const account = useActiveAccount();
	const { title, status, createdBy, id, isFinished } = useResearchPage();
	const { isError, isSuccess, send, loading } = useTransaction();
	const router = useRouter();

	useEffect(() => {
		if (isSuccess) {
			toast.success("Research concluded successfully");
			router.refresh();
		} else if (isError) {
			toast.error("Failed to conclude research");
		}
	}, [isSuccess, isError]);

	async function handleConcludeResearch() {
		if (isInvalidNumber(id)) return;
		const transaction = prepareContractCall({
			contract: techTreeContract,
			method: "finishNode",
			params: [id as bigint],
		}) as PreparedTransaction;
		await send(transaction);
	}

	return (
		<>
			<div className="mb-6 flex justify-between">
				<div>
					<h1 className="font-black text-2xl">{title}</h1>
					<div className="mt-1">
						<div className="flex items-center space-x-2">
							<div className="text-xs">Status:</div>
							<StatusTag status={status} />
						</div>
					</div>
				</div>
				{account?.address === createdBy &&
					!isFinished &&
					status === "in-progress" && (
						<div>
							<Button
								loading={loading}
								onClick={handleConcludeResearch}
								variant="primary"
							>
								Conclude the research
							</Button>
						</div>
					)}
			</div>
			<ProjectMenu status={status} />
		</>
	);
}
