import { useTxEvents } from "@/providers/ContractEventsProvider";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { PreparedTransaction } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

type TxStatus = "loading" | "success" | "error" | "idle";

interface SendTxProps {
	loading: boolean;
	isSuccess: boolean;
	sendTx(tx: PreparedTransaction): Promise<void>;
	txHash?: string;
	status: TxStatus;
}

interface SendTxInputProps {
	type?: "RfpAdded";
}

export function useSendTx({ type }: SendTxInputProps): SendTxProps {
	const { mutateAsync, isPending, isPaused } = useSendTransaction();
	const [status, setStatus] = useState<TxStatus>("idle");
	const [txHash, setTxHash] = useState<string>();

	const { events } = useTxEvents();

	useEffect(() => {
		const event = events.find((event) => event.transactionHash === txHash);
		if (event) {
			toast.success(`Transaction successful!`);
			setStatus("success");
		}
	}, [events, txHash]);

	async function sendTx(tx: PreparedTransaction) {
		setStatus("loading");
		// @ts-ignore
		const response = await mutateAsync(tx);
		setTxHash(response.transactionHash);
	}

	return useMemo(
		() => ({
			loading: status === "loading",
			sendTx,
			isSuccess: status === "success",
			status,
			txHash,
		}),
		[isPending, status, isPaused, txHash],
	);
}
