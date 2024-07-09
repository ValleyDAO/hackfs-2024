import { EdgeData, NodeData } from "@/typings";
import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
export const maxDuration = 60; // This function can run for a maximum of 5 seconds

const anthropic = new Anthropic({
	apiKey: process.env["ANTHROPIC_API_KEY"], // This is the default and can be omitted
});

interface RelatedNodesAndEdges {
	parents?: NodeData[];
	edges?: EdgeData[];
	subject?: NodeData;
	children?: NodeData[];
	objective: string;
}

export async function POST(req: NextRequest) {
	const body: RelatedNodesAndEdges = await req.json();

	try {
		const message = await anthropic.messages.create({
			max_tokens: 4048,
			temperature: 0,
			system:
				"You're a science advisor specialised in analysing scientific roadmap in the form of a technology tree. You're mission is to analyse the following a node given by the user as \"subject\" with its associated edges that showcase their children and parent nodes in the tech tree. Your analysis and core of your mission is too decide whether title & description of the subject node is too high level for scientists/researchers to work on. \n\nThe parents, edges, child nodes and ultimate objective are provided by the user BUT it's only provided as context. The primary mission for you is too analyse and assess if we need to entangle the complexity of our subject node into more detailed nodes. \n\nUpon expansion, you'll remove the given subject from your response and focus on how new roadmap nodes function between the given child & parent nodes while keeping our objective in mind. These new nodes will form a connection either with each other, one of the child nodes or the parent node.\n\nGuidelines:\n- It is important that my given nodeId's are kept in tack as these are already used to connect existing nodes. \n- Keep high-level sciences such as (Quantum Mechanics, Synthetic Biology, etc.) to an absolute minimum as these are not actionable for researchers in the context of reaching our objective.\n\nResearch and Development Categories:\n1. Fundamental Research (TRL 1-2)\n2. Applied Research (TRL 2-4)\n3. Translational Research (TRL 3-5)\n4. Technology Development (TRL 4-7)\n5. Demonstration and Validation (TRL 6-8)\n6. Implementation and Deployment (TRL 8-9)\n7. Continuous Improvement\n\n=== OBJECT PROPERTIES ===\nNode: \n  id: string\n  title: string\n  description: string\n  category: enum(fundamental-research, applied-research, translational-research, technology-development, demonstration-validation, implementation-deployment, continuous-improvement, ultimate-objective)\n  trl: number (1-9)\n  state: enum(conceptual, emerging, established)\n  maturity: enum(nascent, developing, mature)\n  impact_potential: enum(low, medium, high)\n  resource_intensity: enum(low, medium, high)\n  interdisciplinary_level: enum(low, medium, high)\n  time_horizon: enum(short-term, medium-term, long-term)\n\nEdge: \n  source: string (nodeId)\n  target: string (nodeId)\n  relationship_type: enum(prerequisite, supportive, collaborative, iterative)\n  strength: enum(weak, moderate, strong)\n\n=== HELPER FUNCTION ===\nFor generating unique identifiers, utilize:\n() => Math.random().toString(36).substring(2, 9)\n\n\n=== RESPONSE FORMAT ===\nONLY PROVIDE THE JSON AND DON'T MENTION ANY CONTEXT TEXT\n  ",
			messages: [
				{
					role: "user",
					content: `
						 subject: ${JSON.stringify(body?.subject || [])}
						 parents: ${JSON.stringify(body?.parents || [])}
						 children: ${JSON.stringify(body?.children || [])}
						 Edges: ${JSON.stringify(body?.edges || [])}
						 Objective: ${body.objective}
   				 `,
				},
			],
			model: "claude-3-5-sonnet-20240620",
		});
		const data =
			message.content?.map((item) => JSON.parse((item as any)?.text))?.[0] ||
			{};
		return NextResponse.json({ data: { ...data, expanded: true } });
	} catch (error) {
		console.error("Error while verifying", error);
		return NextResponse.error();
	}
}
