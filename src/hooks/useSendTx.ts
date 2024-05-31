import { contributionContract } from "@/lib/constants";
import { useEffect, useMemo, useState } from "react";
import { prepareContractCall, prepareEvent } from "thirdweb";
import { useContractEvents, useSendTransaction } from "thirdweb/react";

interface SendTxProps {
	loading: boolean;
	sendTx(tx: SendTx): void;
}

interface SendTxInputProps {
	type: "RfpAdded";
}

type SendTx = typeof prepareContractCall;

const event = prepareEvent({
	signature:
		"event NodeAdded(uint256 indexed nodeId, string title, uint256 points)",
});

const rfpEvent = prepareEvent({
	signature: "event RfpAdded(uint256 indexed nodeIndex, string _ipfsHash)",
});

export function useSendTx({ type }: SendTxInputProps): SendTxProps {
	const { mutateAsync, isPending, isSuccess, isPaused } = useSendTransaction();
	const [loading, setLoading] = useState(false);
	const [txHash, setTxHash] = useState<string>();
	const { data } = useContractEvents({
		contract: contributionContract,
		events: [rfpEvent],
		watch: true,
	});

	useEffect(() => {
		console.log(data);
	}, [data]);

	async function sendTx(tx: SendTx) {
		// @ts-ignore
		await mutateAsync(tx);
		//setTxHash(txHash);
	}

	return useMemo(
		() => ({
			loading,
			sendTx,
		}),
		[isPending, isSuccess, isPaused],
	);
}
