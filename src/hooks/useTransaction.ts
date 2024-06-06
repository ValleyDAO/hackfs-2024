import { useTxEvents } from "@/providers/ContractEventsProvider";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { PreparedTransaction } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

type TxStatus = "loading" | "success" | "error" | "idle";

interface SendTxProps {
	loading: boolean;
	isSuccess: boolean;
	isError?: boolean;
	send(tx: PreparedTransaction): Promise<void>;
	txHash?: string;
	status: TxStatus;
}

export function useTransaction(): SendTxProps {
	const { mutateAsync, isPending, isPaused, isError, error } =
		useSendTransaction();
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

	async function send(tx: PreparedTransaction) {
		setStatus("loading");
		const response = await mutateAsync(tx);
		setTxHash(response.transactionHash);
	}

	console.log(error);

	return useMemo(
		() => ({
			loading: status === "loading",
			send,
			isSuccess: status === "success",
			isError,
			status,
			txHash,
			error,
		}),
		[isPending, status, isPaused, txHash, isError, error],
	);
}
