"use client";

import { TechTreeLayout } from "@/components/techTree";
import { NodesAndEdgesProvider } from "@/providers/NodesAndEdgesProvider";
import { TechTreeLayoutContextProvider } from "@/providers/TechTreeLayoutContextProvider";

import { GET_ROADMAP } from "@/lib/graphql/queries";
import { OnChainTechTree } from "@/typings";
import { useQuery } from "@apollo/client";
import React from "react";
import {parseOnChainEdgeToEdgeData, parseOnChainNodeToNodeData} from "@/utils/parser.utils";

interface Params {
	techTreeId: string;
}

export default function TechTreeDetailsPage({ params }: { params: Params }) {
	const { data } = useQuery<{ techTree: OnChainTechTree }>(
		GET_ROADMAP,
		{
			variables: { id: params.techTreeId },
			ssr: true,
		},
	);

	if (!data?.techTree?.techTreeId) return <div>Not found</div>;

	const nodes = data?.techTree.nodes?.map(parseOnChainNodeToNodeData);
	const edges = data?.techTree.edges?.map(parseOnChainEdgeToEdgeData);

	return (
		<NodesAndEdgesProvider techTreeId={data.techTree.techTreeId} nodes={nodes} edges={edges}>
			<TechTreeLayoutContextProvider techTreeId={data?.techTree?.id}>
				<TechTreeLayout />
			</TechTreeLayoutContextProvider>
		</NodesAndEdgesProvider>
	);
}
