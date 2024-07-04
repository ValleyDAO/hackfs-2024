import { EdgeData, NodeData } from "@/typings";
import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const anthropic = new Anthropic({
	apiKey: process.env["NEXT_PUBLIC_ANTHROPIC_API_KEY"], // This is the default and can be omitted
});

interface RelatedNodesAndEdges {
	parents?: NodeData[];
	edges?: EdgeData[];
	subject?: NodeData;
	children?: NodeData[];
}

export async function POST(req: NextRequest) {
	const body: RelatedNodesAndEdges = await req.json();

	try {
		const message = await anthropic.messages.create({
			max_tokens: 2048,
			temperature: 0,
			system:
				"You're a science advisor specialised in creating technology trees. You're mission is to analyse the following 2 nodes with its edge and decide if these nodes are specific enough. For example if the nodes are too high-level or too low-level, you should create a new tech tree.\n\nIt is important that my given nodeId's are kept in tack as these are already used to connect existing nodes. Feel free to replace the title but its highly important that we can paste your JSON code directly into the existing tech tree. Keep high-level sciences such as (Quantum Mechanics, Synthetic Biology, etc.) to an absolute minimum as these are not actionable among our 4 node types.\n\t\t\t\t\t\t\n=== OBJECT PROPERTIES ===\nNode: id, title, description, and type (research, development, optimization).\nEdge: source (relevant nodeId) and target (relevant nodeId)\n\t\t\t\t\t\t\nThis function allows you to generate an id for our nodes & edges:\n() => Math.random().toString(36).substring(2, 9)\n\n\n=== RESPONSE FORMAT ===-\nONLY PROVIDE THE JSON AND DON'T MENTION ANY CONTEXT TEXT",
			messages: [
				{
					role: "user",
					content: `
						subject: ${JSON.stringify(body?.subject || [])}
						parents: ${JSON.stringify(body?.parents || [])}
						children: ${JSON.stringify(body?.children || [])}
						Edges: ${JSON.stringify(body?.edges || [])}
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
