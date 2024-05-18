"use client";

import { createThirdwebClient, defineChain } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { SmartWalletOptions, createWallet } from "thirdweb/wallets";
import { inAppWallet } from "thirdweb/wallets/embedded";

const clientId = process.env.NEXT_PUBLIC_THIRD_WEB_KEY || "";

if (!clientId) {
	throw new Error("No client ID provided");
}

export const chain = defineChain(314159);
export const web3Client = createThirdwebClient({
	clientId,
});

export const thirdWebWallets = [
	createWallet("io.metamask"),
	inAppWallet({
		auth: {
			options: ["email", "google", "apple", "facebook"],
		},
	}),
];

export const accountAbstraction: SmartWalletOptions = {
	chain,
	sponsorGas: true,
};
