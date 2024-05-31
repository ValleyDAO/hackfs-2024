import { NodeType, SelectOptionItem } from "@/typings";
import { capitalize } from "@walletconnect/utils";

export function parseTypeToSearchFieldItems(): SelectOptionItem[] {
	return (
		Object.values(NodeType).map((item) => ({
			label: capitalize(item.toLowerCase()),
			value: item,
		})) || []
	);
}
