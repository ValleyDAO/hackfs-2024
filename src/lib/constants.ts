import { filecoinCalibration, hardhat } from "viem/chains";
import abi from "./abis/contributions.json";

export const contributionAbi = abi;
export const contributionContractAddress = !!process.env.NEXT_PUBLIC_IS_LOCAL
	? "0x5FbDB2315678afecb367f032d93F642f64180aa3"
	: "0xa0697da50Fc9fb14D4941e55c7623AA6736A6F40";

export const chainOptions = [hardhat, filecoinCalibration];
