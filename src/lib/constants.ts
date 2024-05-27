"use client";

import { createThirdwebClient, defineChain, getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { SmartWalletOptions, createWallet } from "thirdweb/wallets";
import { inAppWallet } from "thirdweb/wallets/embedded";

const clientId = process.env.NEXT_PUBLIC_THIRD_WEB_KEY || "";

if (!clientId) {
	throw new Error("No client ID provided");
}

export const contributionContractAddress =
	"0xfcc2be343357ccc9b80c621b00438c6dd365bb39";
export const fundingContractAddress =
	"0x53e588884d661fafc97bf1491ec7fedefae5ee50";
export const chain = defineChain({
	id: 314159,
});

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

export const contributionContract = getContract({
	address: contributionContractAddress,
	chain: defineChain(314159),
	client: web3Client,
});

export const accountAbstraction: SmartWalletOptions = {
	chain,
	sponsorGas: false,
};
