import type { Metadata } from "next";
import {
	Baskervville,
	Libre_Baskerville,
	Space_Grotesk,
} from "next/font/google";
import "../styles/globals.css";
import { Container } from "@/components/Container";
import Providers from "@/providers";
import clsx from "clsx";
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
			<body className={clsx(spaceGrotesk.className)}>
				<Providers>
					<Container>{children}</Container>
				</Providers>
			</body>
		</html>
	);
}
