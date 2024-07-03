import { Button } from "@/components/button";
import { ButtonWithAuthentication } from "@/components/button/ButtonWithAuthentication";
import { ArrowLeftOutlined } from "@/components/icons/ArrowLeftOutlined";
import { CloseCircleOutlined } from "@/components/icons/CloseCircleOutlined";
import { LoadingOutlined } from "@/components/icons/LoadingOutlined";
import { TechTreeOutlined } from "@/components/icons/TechTreeOutlined";
import InputText from "@/components/input/InputText";
import { contributionAbi, contributionContractAddress } from "@/lib/constants";
import { useTxEvents } from "@/providers/ContractEventsProvider";
import { useTechTree } from "@/providers/TechTreeParentProvider";
import { TechTree } from "@/typings";
import clsx from "clsx";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useWriteContract } from "wagmi";

function CreateTechTree({ handleBack }: { handleBack: () => void }) {
	const { setActiveTechTree } = useTechTree();
	const { events } = useTxEvents();
	const [title, setTitle] = React.useState("");
	const {
		data: hash,
		writeContract,
		isSuccess,
		isError,
		isPending,
	} = useWriteContract();

	useEffect(() => {
		const event = events.find(
			(event) =>
				event.eventName === "TechTreeAdded" && event.transactionHash === txHash,
		);
		if (event) {
			setActiveTechTree({
				id: event.args.techTreeId,
				title: event.args.title,
			} as TechTree);
		}
	}, [events, txHash]);

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
		<div className="">
			<div className="flex mb-6">
				<div
					onClick={handleBack}
					className="horizontal text-xs space-x-1.5 cursor-pointer hover:text-blue-700 text-gray-500"
				>
					<ArrowLeftOutlined />
					<span>Back</span>
				</div>
			</div>
			<div className="mb-6">
				<span className="font-medium text-gray-500 text-xs">CREATE</span>
				<h1 className="font-bold text-lg">Create a Technology Tree</h1>
			</div>
			<div className="space-y-3">
				<InputText label="Title" value={title} onChange={setTitle} />
				<div className="!mt-4 !pt-4 border-t border-gray-100 w-full space-y-3">
					<Button
						disabled={!title || title?.length < 2}
						fullSize
						loading={loading}
						onClick={() => handleCreateTechTree(title)}
						variant="primary"
					>
						Create
					</Button>
				</div>
			</div>
		</div>
	);
}

function TechTreeItem({ techTree }: { techTree: TechTree }) {
	const { setActiveTechTree } = useTechTree();
	return (
		<div
			key={techTree.id}
			onClick={() => setActiveTechTree(techTree)}
			className={clsx(
				"transition-all flex items-center cursor-pointer hover:bg-gray-100 border-b last:border-0 border-gray-100 space-x-2 px-4 py-3 rounded",
			)}
		>
			<TechTreeOutlined className="text-lg" />
			<div className="text-sm">{techTree.title}</div>
		</div>
	);
}

function TechTreeList({ handleCreate }: { handleCreate: () => void }) {
	const { techTrees, isLoading } = useTechTree();

	return (
		<>
			<div>
				<span className="mb-6 font-medium text-gray-400 text-xs">
					GET STARTED
				</span>
				<h1 className="mb-6 font-bold text-lg">Select a Technology Tree</h1>
				<div>
					{isLoading ? (
						<LoadingOutlined />
					) : techTrees && techTrees?.length > 0 ? (
						techTrees.map((techTree, idx) => (
							<TechTreeItem key={`node-${idx}`} techTree={techTree} />
						))
					) : (
						<div className="flex flex-col h-full pt-48 space-y-4 w-10/12 mx-auto items-center">
							<TechTreeOutlined className="text-gray-300 text-4xl" />
							<span className="text-gray-400 text-xs text-center">
								Seems that you don't have any technology trees yet. Let's get
								started by creating one.
							</span>
						</div>
					)}
				</div>
			</div>
			<ButtonWithAuthentication
				variant="primary"
				fullSize
				onClick={handleCreate}
			>
				Create New Technology Tree
			</ButtonWithAuthentication>
		</>
	);
}

export function TechTreeSelector() {
	const { setActiveTechTree, activeTechTree, isLoading } = useTechTree();
	const [intentToCreateTechTree, setIntentToCreateTechTree] =
		React.useState(false);

	return (
		<div
			className={clsx(
				"transition-all flex flex-col absolute right-0 bottom-0 z-10",
				{
					"top-0 w-[450px]": !activeTechTree,
				},
			)}
		>
			<div className="bg-white h-full shadow-sm rounded">
				{activeTechTree ? (
					<div className="horizontal space-x-6">
						<div className="horizontal space-x-2 pl-6">
							<div className="text-gray-500 text-xs">
								Active Technology Tree:
							</div>
							<div className="text-xs font-semibold">
								{activeTechTree?.title}
							</div>
						</div>
						<div
							onClick={() => setActiveTechTree(undefined)}
							className="px-4 py-3 aspect-square bg-gray-50 hover:bg-red-50 cursor-pointer transition-colors group"
						>
							<CloseCircleOutlined className="text-lg text-gray-400 group-hover:text-red-700" />
						</div>
					</div>
				) : (
					<div className="px-4 py-6 flex flex-col h-full justify-between">
						{intentToCreateTechTree ? (
							<CreateTechTree
								handleBack={() => setIntentToCreateTechTree(false)}
							/>
						) : (
							<TechTreeList
								handleCreate={() => setIntentToCreateTechTree(true)}
							/>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
