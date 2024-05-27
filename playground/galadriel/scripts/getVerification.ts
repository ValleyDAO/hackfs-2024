import { ethers } from "hardhat";
import readline from "readline";

async function main() {
    // Define the ABI for the chat contract
    const contractABI = [
        "function startChat(string) external returns (uint)",
        "function onOracleLlmResponse(uint,string) external",
        "function addMessage(string,uint) external",
        "function getMessageHistoryContents(uint) public view returns (string[])",
        "function getChatRunsCount() public view returns (uint)"
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
    const contractInterface = new ethers.Interface(contractABI);

    // Get user input for the message
    const message = await getUserInput("Enter your message for the chat: ");

    // Start the chat by sending the first message
    const chatID = await chatContract.getChatRunsCount();
    console.log("Chat ID:", chatID);
    const transactionResponse = await chatContract.startChat(message);
    const receipt = await transactionResponse.wait();
    console.log(`Transaction sent, hash: ${receipt.hash}.\nExplorer: https://explorer.galadriel.com/tx/${receipt.hash}`);

    // get current chat history
    const currentChatHistory = await chatContract.getMessageHistoryContents(chatID);
    let newChatHistory = currentChatHistory;
    console.log("Current chat history:", currentChatHistory);

    while (currentChatHistory.length == newChatHistory.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        newChatHistory = await chatContract.getMessageHistoryContents(chatID);
        console.log(".");    
    }

    console.log("Chat history:", newChatHistory);
}

async function getUserInput(prompt: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve, reject) => {
        rl.question(prompt, (input) => {
            resolve(input);
            rl.close();
        });
    });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Failed to interact with the chat contract:", error);
        process.exit(1);
    });
