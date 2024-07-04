import { useWallets } from "@privy-io/react-auth";
import React from "react";
import Select from "react-select";
import { useSwitchChain } from "wagmi";

export function Networks() {
	const { wallets } = useWallets();
	const { chains, switchChain } = useSwitchChain();
	const wallet = wallets[0]; // Replace this with your desired wallet
	const chainId = wallet?.chainId;

	const options = chains?.map((chain) => ({
		value: chain.id,
		label: chain.name,
	}));

	function handleChainChange(chainId: number) {
		const chain = chains?.find((c) => c.id === chainId);
		if (chain) {
			switchChain({ chainId: chain.id });
		}
	}

	return (
		<div>
			<Select
				options={options}
				value={options?.find((a) => chainId?.endsWith(`${a.value}`))}
				onChange={(newValue) =>
					newValue?.value && handleChainChange(newValue.value)
				}
				className="!text-xs z-20"
			/>
		</div>
	);
}
