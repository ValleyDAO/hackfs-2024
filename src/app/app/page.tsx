"use client";

import { CreateTechTree } from "@/app/app/CreateTechTreeModal";
import { ButtonWithAuthentication } from "@/components/button/ButtonWithAuthentication";
import { LoadingOutlined } from "@/components/icons/LoadingOutlined";
import { TechTreeOutlined } from "@/components/icons/TechTreeOutlined";
import { useContributionContract } from "@/hooks/useContributionContract";
import { TechTree } from "@/typings";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

function TechTreeItem({ techTree }: { techTree: TechTree }) {
	return (
		<Link
			key={techTree.id}
			href={`/app/${techTree.id}`}
			className={clsx(
				"transition-all bg-indigo-50/50 flex items-center cursor-pointer text-indigo-900 hover:bg-gray-100 border leading-none border-indigo-100 space-x-2 px-4 py-1.5 rounded-full",
			)}
		>
			<TechTreeOutlined className="" />
			<span className="text-xs font-medium">{techTree.title}</span>
		</Link>
	);
}

export default function Home() {
	const [intentToCreate, setIntentToCreate] = React.useState(false);
	const { data: techTrees, isLoading } = useContributionContract<TechTree[]>({
		functionName: "getTechTrees",
	});

	return (
		<>
			<div className="transition-all flex flex-col items-center w-full">
				<div className="bg-white h-full shadow-sm rounded px-6 py-6 space-y-6 w-6/12">
					<div className="">
						<h1 className=" font-bold text-lg">Define or Explore</h1>
						<p className="w-7/12 text-gray-700 text-sm">
							Pioneer is a platform designed to help you reach your scientific
							end-goals. Define your research goals and have humanity help you
							achieve them.
						</p>
					</div>
					<div>
						<ButtonWithAuthentication
							variant="primary"
							onClick={() => setIntentToCreate(true)}
						>
							Create your scientific end-goal
						</ButtonWithAuthentication>
					</div>
					<div>
						<div>
							<h2 className="text-sm font-medium mb-4">
								Active end-goals researchers are working on:
							</h2>
						</div>
						{isLoading ? (
							<LoadingOutlined />
						) : techTrees && techTrees?.length > 0 ? (
							<div className="flex flex-wrap gap-2">
								{techTrees.map((techTree, idx) => (
									<TechTreeItem key={`node-${idx}`} techTree={techTree} />
								))}
							</div>
						) : (
							<div className="flex flex-col h-full pt-48 space-y-4 w-10/12 mx-auto items-center">
								<TechTreeOutlined className="text-gray-300 text-4xl" />
								<span className="text-gray-400 text-xs text-center">
									Seems that you don't have any technology trees yet. Let's get
									started by creating one.
								</span>
							</div>
						)}
					</div>
				</div>
			</div>
			{intentToCreate && (
				<CreateTechTree handleBack={() => setIntentToCreate(false)} />
			)}
		</>
	);
}
