import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const anthropic = new Anthropic({
	apiKey: process.env["NEXT_PUBLIC_ANTHROPIC_API_KEY"], // This is the default and can be omitted
});

export async function GET(req: NextRequest, params: { title: string }) {
	const title = req.nextUrl.searchParams.get("title") || "Omni Solar Panels";

	const message = await anthropic.messages.create({
		model: "claude-3-5-sonnet-20240620",
		max_tokens: 2048,
		temperature: 0,
		system:
			"You're a science advisor that is an expert in creating technology trees. Your mission is to create a tech tree with '{{TITLE}}' as your end-goal. It is important that we are able to reach '{{TITLE}}' as the end-goal where all beginning nodes should start with basic sciences and lead towards the end-goal. Keep the nodes a bit more high-level whenever specific nodes are too far-fetched.\nKeep high-level sciences such as (Quantum Mechanics, Synthetic Biology, etc.) to an absolute minimum as these are not actionable among our 4 node types.\n\nAdditionally, include an array of edges that connect the nodes, with each connection having a source and a target to represent the dependencies. \n\nAll nodes and connections should clearly contribute to the end-goal, with no loose research or development nodes. The final node should represent the end-goal itself.\n\n=== OBJECT PROPERTIES ===\nNode: id, title, description, and type (research, development, optimization, end-goal).\nEdge: source (relevant nodeId) and target (relevant nodeId)\n\nThis function allows you to generate an id for our nodes & edges:\n() => Math.random().toString(36).substring(2, 9)\n\n=== RESPONSE FORMAT ===-\nONLY PROVIDE THE JSON AND DON'T MENTION ANY CONTEXT TEXT",
		messages: [
			{
				role: "user",
				content: [
					{
						type: "text",
						text: `End Goal  = '${title}'`,
					},
				],
			},
		],
	});
	console.log(JSON.stringify(message.content));
	const data = message.content?.map((item) => JSON.parse((item as any)?.text));
	return NextResponse.json({ data: data?.[0] });
}
