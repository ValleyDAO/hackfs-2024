"use client";

import { contributionContract, web3Client } from "@/lib/constants";
import { Contributor, NodeData, NodeType } from "@/typings";
import { useEffect, useState } from "react";
import { resolveName } from "thirdweb/extensions/ens";
import { useReadContract } from "thirdweb/react";

interface useFetchTechTreeNodeProps {
	isLoading: boolean;
	node?: NodeData;
}

const rfp = {
	compensation: 500,
	content:
		'{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"1. Introduction"}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"The purpose of this RFP is to solicit proposals from qualified firms for genetic engineering services. We are seeking expertise in genome editing, synthetic biology, and related biotechnologies to advance our research and development initiatives."}]},{"type":"paragraph"},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"2. Project Overview"}]},{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Project Title"},{"type":"text","text":": Genetic Engineering Services"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Objective"},{"type":"text","text":": To leverage genetic engineering techniques to modify organisms for improved traits and capabilities."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Scope"},{"type":"text","text":": Includes genome editing, synthetic biology, bioinformatics, and regulatory compliance."}]}]},{"type":"listItem","content":[{"type":"paragraph"}]}]},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"3. Proposal Requirements"}]},{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Company Background"},{"type":"text","text":": Provide a brief history, including experience and expertise in genetic engineering."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Technical Approach"},{"type":"text","text":": Describe the methodologies and technologies to be used."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Project Timeline"},{"type":"text","text":": Outline the expected timeline for project milestones."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Budget Estimate"},{"type":"text","text":": Provide a detailed cost estimate."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Team Qualifications"},{"type":"text","text":": Include resumes of key personnel."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Past Projects"},{"type":"text","text":": Summarize previous relevant projects and outcomes."}]}]},{"type":"listItem","content":[{"type":"paragraph"}]}]},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"4. Evaluation Criteria"}]},{"type":"paragraph","content":[{"type":"text","text":"Proposals will be evaluated based on the following criteria:"}]},{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Technical Expertise"},{"type":"text","text":": Demonstrated knowledge and experience."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Innovative Approach"},{"type":"text","text":": Creativity in solving genetic engineering challenges."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Cost-Effectiveness"},{"type":"text","text":": Competitive and detailed budget."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Timeline"},{"type":"text","text":": Realistic and achievable project milestones."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"References"},{"type":"text","text":": Positive feedback from previous clients."}]}]}]}]}\n',
};

export function useFetchTechTreeNode(id: bigint): useFetchTechTreeNodeProps {
	const { data: onChainNode, isLoading } = useReadContract({
		contract: contributionContract,
		method: "getNode",
		params: [id],
	});

	const [node, setNode] = useState<NodeData>();

	useEffect(() => {
		if (!onChainNode || isLoading) return;
		fetchTechTreeNode(onChainNode);
	}, [onChainNode, isLoading]);

	async function fetchTechTreeNode(data: Record<string, any>) {
		const contributors: Contributor[] = [
			{
				address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
			},
			{
				address: "0xFc1575e15F8763A917111A63364E95A0f4f444E2",
			},
		];

		for (const contributor of contributors) {
			const ensName = await resolveName({
				client: web3Client,
				address: contributor.address,
			});
			if (ensName) {
				contributor.ensName = ensName;
			}
		}

		setNode({
			title: data.title,
			id: `${id}`,
			type: NodeType.END_GOAL,
			rfp,
			content:
				'{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Abstract"},{"type":"text","text":": Endometriosis is a prevalent chronic inflammatory disease characterized by a considerable delay"}]},{"type":"paragraph","content":[{"type":"text","text":"between initial symptoms and diagnosis through surgery. The pressing need for a timely, non-invasive"}]},{"type":"paragraph","content":[{"type":"text","text":"diagnostic solution underscores the focus of current research efforts. This study examines the diagnostic"}]},{"type":"paragraph","content":[{"type":"text","text":"potential of the menstrual blood lipidome. The lipid profile of 39 samples (23 women with endometriosis and"}]},{"type":"paragraph","content":[{"type":"text","text":"16 patient of control group) was acquired using reverse-phase high-performance liquid chromatography-mass"}]},{"type":"paragraph","content":[{"type":"text","text":"spectrometry with LipidMatch processing and identification. "}]}]}',
			status: "rfp",
			fundingState: {
				fundingRequest: 500000,
				fundingRaised: 25750,
				funders: 25,
			},
			contributors,
		});
	}

	return {
		node,
		isLoading,
	};
}
