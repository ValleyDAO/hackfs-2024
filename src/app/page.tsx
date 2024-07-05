"use client";
import { Button } from "@/components/button";
import Link from "next/link";
import React from "react";

export default function Home() {
	return (
		<>
			<div className="bg-grid w-full h-full flex flex-col items-center justify-center">
				<div className="w-7/12">
					<h1 className="text-2xl font-black text-center mb-2">
						Roadmap to scientific discoveries
					</h1>
					<p className="w-7/12 text-sm text-center mx-auto text-gray-700">
						ValleyDAO's Tech Tree is a decentralized research platform that
						allows you to explore, contribute, and fund research projects Built
						for{" "}
						<a
							className="underline hover:text-blue-700"
							href="https://ethglobal.com/events/hackfs2024"
						>
							HackFS
						</a>{" "}
						hackathon.
					</p>
				</div>
				<div className="mt-4">
					<Link href="/app">
						<Button variant="black">Go To App</Button>
					</Link>
				</div>
			</div>
		</>
	);
}
