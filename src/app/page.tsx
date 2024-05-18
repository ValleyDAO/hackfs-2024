import {web3Client} from "@/lib/constants";
import { ConnectButton } from "thirdweb/react";

export default function Home() {
  // add link on how to get testnet tokens
  return (
    <div className="my-20 flex flex-col items-center space-y-10">
      <div>
        <h1 className="text-4xl font-bold text-center">Welcome to HackFS</h1>
        <div>
          <a className="text-blue-700" href="https://docs.filecoin.io/smart-contracts/developing-contracts/get-test-tokens">
            How to get testnet tokens
          </a>
        </div>
      </div>
      <ConnectButton client={web3Client}/>

    </div>
  );
}
