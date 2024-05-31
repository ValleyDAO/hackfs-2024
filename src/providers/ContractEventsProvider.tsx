"use client";

import { contributionContract } from "@/lib/constants";
import React, { ReactNode, createContext, useContext } from "react";
import { prepareEvent } from "thirdweb";
import { useContractEvents } from "thirdweb/react";

interface TxEvent {
	address: string;
	blockHash: string;
	blockNumber: bigint;
	eventName: string;
	transactionHash: string;
	transactionIndex: number;
}

type TxEventsContextProps = {
	events: TxEvent[];
};

export const TxEventsContext = createContext<TxEventsContextProps>({
	events: [],
});

const nodeAdded = prepareEvent({
	signature:
		"event NodeAdded(uint256 indexed nodeId, string title,  string nodeType)",
});
const rfpEvent = prepareEvent({
	signature: "event RfpAdded(uint256 indexed nodeIndex, string _ipfsHash)",
});

export const useTxEvents = (): TxEventsContextProps => {
	const context = useContext(TxEventsContext);
	if (!context) {
		throw new Error("useAuth must be used within a AuthProvider");
	}
	return context;
};

export function ContractEventsProvider({ children }: { children: ReactNode }) {
	const { data } = useContractEvents({
		contract: contributionContract,
		events: [nodeAdded, rfpEvent],
		blockRange: 50,
	});

	return (
		<TxEventsContext.Provider value={{ events: (data || []) as TxEvent[] }}>
			{children}
		</TxEventsContext.Provider>
	);
}
