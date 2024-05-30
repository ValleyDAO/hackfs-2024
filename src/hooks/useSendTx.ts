import { contributionContract } from "@/lib/constants";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { prepareContractCall } from "thirdweb";
import { useContractEvents, useSendTransaction } from "thirdweb/react";
import { useWatchContractEvent } from "wagmi";

interface SendTxProps {
	loading: boolean;
}

export function useSendTx(): SendTxProps {
	const { mutateAsync, isPending, isSuccess, isPaused } = useSendTransaction();
	const [loading, setLoading] = useState(false);
	/*	const [txHash, setTxHash] = useState<string>();
	const contractEvents = useContractEvents({
		contract: contributionContract,
		events: ["NodeAdded"],
	});
	const {} = useWatchContractEvent({
		address: contributionContract.address,
		abi: contributionContract.abi,
		eventName: "NodeAdded",
	});

	async function sendTx(tx: typeof prepareContractCall) {
		const txHash = await mutateAsync(tx);
		setTxHash(txHash);
	}*/

	return useMemo(
		() => ({
			loading,
		}),
		[isPending, isSuccess, isPaused],
	);
}
