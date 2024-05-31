import { NodeTypeValues, SelectOptionItem } from "@/typings";
import { capitalize } from "@walletconnect/utils";

export function parseTypeToSearchFieldItems(): SelectOptionItem[] {
	return (
		NodeTypeValues.map((item) => ({
			label: capitalize(item.toLowerCase()),
			value: item,
		})) || []
	);
}
