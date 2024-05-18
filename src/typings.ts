export interface TechTreeNode {
	targetPosition?: string;
	sourcePosition?: string;
	id: string;
	type?: string;
	data: { label: string };
	position: { x: number; y: number };
}

export interface TechTreeEdge {
	id: string;
	source: string;
	target: string;
	type: string;
	animated: boolean;
}
