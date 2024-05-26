import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "../styles/globals.css";
import { Container } from "@/components/Container";
import Providers from "@/providers";
import React from "react";

const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "ValleyDAO | HackFS 2024",
	description: "-",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={spaceGrotesk.className}>
				<Providers>
					<Container>{children}</Container>
				</Providers>
			</body>
		</html>
	);
}
