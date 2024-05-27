import { ethers } from "hardhat";

async function main() {
    // Define the ABI for the chat contract without using struct definitions
    const contractABI = [
        "function getAllChatRuns() external view returns (tuple(tuple(string role, string content)[] messages, uint256 messagesCount)[])"
    ];

    // Verify the contract address is set
    if (!process.env.CHAT_CONTRACT_ADDRESS) {
        throw new Error("CHAT_CONTRACT_ADDRESS environment variable is not set.");
    }
    const contractAddress = process.env.CHAT_CONTRACT_ADDRESS;

    // Get a signer from the Hardhat environment
    const [signer] = await ethers.getSigners();

    // Create a contract instance
    const chatContract = new ethers.Contract(contractAddress, contractABI, signer);

    // Fetch all chat runs
    const allChatRuns = await chatContract.getAllChatRuns();

    // Parse and display the chat runs
    allChatRuns.forEach((chatRun: any, index: number) => {
        console.log(`ChatRun ${index + 1}:`);
        console.log(`Messages Count: ${chatRun.messagesCount}`);
        chatRun.messages.forEach((message: any, msgIndex: number) => {
            console.log(`  Message ${msgIndex + 1}:`);
            console.log(`    Role: ${message.role}`);
            console.log(`    Content: ${message.content}`);
        });
    });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Failed to interact with the chat contract:", error);
        process.exit(1);
    });