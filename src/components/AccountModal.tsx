import { EthAvatar } from "@/components/EthAvatar";
import { LogoutOutlined } from "@/components/icons/LogoutOutlined";
import { Modal } from "@/components/modal";
import { useAuth } from "@/providers/AuthProvider";
import { NodeData } from "@/typings";
import { formatNumber } from "@/utils/number.utils";
import { getShortenedFormat } from "@/utils/string.utils";
import { useRouter } from "next/navigation";
import React from "react";
import { useActiveAccount } from "thirdweb/react";

interface AccountModalProps {
	close(): void;
}

interface Point {
	value: number;
	node: NodeData;
}

const points: Point[] = [
	{
		value: 25,
		node: {
			id: "1",
			title: "Develop Multi-Junction Solar Cells",
			type: "development",
		},
	},
	{
		value: 5,
		node: { id: "2", title: "optimizations in Gluten", type: "research" },
	},
	{
		value: 10,
		node: { id: "3", title: "CRISP prototypes", type: "development" },
	},
];

export function AccountModal({ close }: AccountModalProps) {
	const { account } = useAuth();
	const router = useRouter();

	function handleLogout() {
		router.push("/logout");
		close();
	}

	const totalPoints = points.reduce((acc, point) => acc + point.value, 0);

	return (
		<>
			{account && (
				<Modal position="right" close={close} open>
					<div className="mb-10 horizontal justify-between">
						<div className="bg-transition horizontal space-x-2 rounded py-2">
							<EthAvatar address={account.address} />
							<p className="font-black">
								{getShortenedFormat(account.address, 6)}
							</p>
						</div>
						<div onClick={close} className="horizontal space-x-4">
							<div
								onClick={handleLogout}
								className="bg-transition cursor-pointer rounded bg-gray-100 px-2 pb-1.5 pt-0.5 hover:bg-gray-200"
							>
								<LogoutOutlined className="text-lg text-gray-900" />
							</div>
						</div>
					</div>
					<div className="border-b border-gray-100 pb-2.5 mb-2.5">
						<div className="text-sm font-bold">Total: {totalPoints} Points</div>
					</div>
					<div className="space-y-1">
						{points?.map((point, index) => (
							<div
								key={`points-${index}`}
								className="horizontal justify-between py-4 bg-gray-50 px-4 rounded"
							>
								<div className="horizontal space-x-3">
									<div className="text-xs font-medium text-gray-900">
										{point.node?.title}
									</div>
								</div>
								<div className="text-xs text-gray-900">
									<span className="font-medium">{point.value}</span> Points
								</div>
							</div>
						))}
					</div>
				</Modal>
			)}
		</>
	);
}
