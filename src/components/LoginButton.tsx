import { web3Client } from "@/lib/constants";
import clsx from "clsx";
import React from "react";
import { ConnectButton } from "thirdweb/react";

interface LoginButtonProps {
	label?: string;
	variant?: "black" | "primary";
	padding?: string;
}

export function LoginButton({
	label = "Get Started",
	variant = "primary",
	padding = "!py-2 !px-4",
}: LoginButtonProps) {
	return (
		<ConnectButton
			client={web3Client}
			connectButton={{
				label,
				className: clsx(
					"!text-sm !w-full sm:!w-fit !min-w-fit !font-normal !group-hover:brightness-110 !group-focus:brightness-90 !text-white !rounded",
					{
						"!bg-black !border-black": variant === "black",
						"!bg-primary !border-primary": variant === "primary",
					},
					padding,
				),
			}}
			connectModal={{
				title: "HackFS",
				titleIcon:
					"https://holder.io/wp-content/uploads/coins/1/grow--3-73911.png",
			}}
		/>
	);
}
