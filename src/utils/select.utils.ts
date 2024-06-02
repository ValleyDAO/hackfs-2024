import { NodeTypeValues, SelectOptionItem } from "@/typings";
import { capitalize } from "@walletconnect/utils";

export function parseTypeToSearchFieldItems(
	hasEndGoalInNodes: boolean,
): SelectOptionItem[] {
	const values =
		NodeTypeValues.map((item) => ({
			label: capitalize(item.toLowerCase()),
			value: item,
		})) || [];
	if (!hasEndGoalInNodes) {
		return values;
	}
	return values.filter((item) => item.value !== "end-goal");
}
