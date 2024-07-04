import { Button } from "@/components/button";
import { ArrowLeftOutlined } from "@/components/icons/ArrowLeftOutlined";
import InputText from "@/components/input/InputText";
import { Modal } from "@/components/modal";
import { contributionAbi, contributionContractAddress } from "@/lib/constants";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useWatchContractEvent, useWriteContract } from "wagmi";

export function CreateTechTree({ handleBack }: { handleBack: () => void }) {
	const router = useRouter();
	const [title, setTitle] = React.useState("");

	const {
		data: hash,
		writeContract,
		isSuccess,
		isError,
		isPending,
	} = useWriteContract();

	useWatchContractEvent({
		address: contributionContractAddress,
		abi: contributionAbi,
		eventName: "TechTreeAdded",
		onLogs(logs) {
			logs.forEach((log) => {
				if (log.transactionHash === hash) {
					const args = (log as any).args as Record<string, any>;
					router.push(`/app/${args.techTreeId}`);
				}
			});
		},
	});

	useEffect(() => {
		if (isSuccess) {
			toast.success("Tech tree created successfully");
		} else if (isError) {
			toast.error("Failed to create tech tree");
		}
	}, [isSuccess, isError]);

	async function handleCreateTechTree(title: string) {
		writeContract({
			address: contributionContractAddress,
			abi: contributionAbi,
			functionName: "addTechTree",
			args: [title],
		});
	}

	return (
		<Modal open close={handleBack}>
			<div className="mb-6">
				<h1 className="font-semibold text-base">Define an end-goal</h1>
				<p className="w-10/12 text-sm text-gray-700">
					Clearly define the end-goal you want to achieve. This will help you
					communicate your research to the community.
				</p>
			</div>
			<InputText
				label="End-goal"
				placeholder="Dyson Sphere, Faster than light travel, etc."
				value={title}
				onChange={setTitle}
			/>
			<div className="mt-4 w-full flex justify-end space-y-3">
				<Button
					disabled={!title || title?.length < 2}
					loading={isPending}
					onClick={() => handleCreateTechTree(title)}
					variant="primary"
				>
					Create
				</Button>
			</div>
		</Modal>
	);
}
