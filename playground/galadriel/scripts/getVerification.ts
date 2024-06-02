import { ethers } from "hardhat";
import WebSocket, { WebSocketServer } from "ws";

// Parse the response from the contract
function parseResponse(response: string) {
    try {
        if (response.includes("```json")) {
            return JSON.parse(response.split("```json")[1].split("```")[0]);
        } else if (response.includes("<TECHNOLOGY_TREE>")) {
            const extractedResponse = response.split("<TECHNOLOGY_TREE>")[1].split("</TECHNOLOGY_TREE>")[0];
            return JSON.parse(extractedResponse);
        } else {
            return JSON.parse(response);
        }
    } catch (error) {
        console.error("Failed to parse response:", error);
        return { rawResponse: response, error: error.message };
    }
}

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

    // Set up WebSocket server
    const wss = new WebSocketServer({ port: 8080 });
    console.log("WebSocket server is running on ws://localhost:8080");

    wss.on('connection', (ws: WebSocket) => {
        ws.on('message', async (message: string) => {
            const msg = message.toString();
            console.log('Received:', msg);

            const promptTemplate = `
            <INSTRUCTIONS>
            You are an expert in building technology trees. 
            
            Here is the end-goal you need to build a technology tree for: <<END_GOAL>>
            Make a technology tree that will lead to the end-goal. 
            Each node in the array should include the fields: id, title, description, and type. 
            The types should be one of the following: research, development, optimization, end-goal. 
            Ensure that each node is a specific, actionable step towards achieving the end-goal. 
            Additionally, include an array of connections (edges) between the nodes, with each connection having a source and a target to represent the dependencies
            All nodes and connections should clearly contribute to the end-goal, with no loose research or development nodes.
            The final node should represent the end-goal itself.
            Output should be in a JSON format. A list of nodes.
            </INSTRUCTIONS>
            
            <TECHNOLOGY_TREE>
            #Your response
            </TECHNOLOGY_TREE>
            `;

            const prompt = promptTemplate.replace("<<END_GOAL>>", msg);

            try {
                // Start the chat by sending the first message
                const chatID = await chatContract.getChatRunsCount();
                console.log("Chat ID:", chatID.toString());
                const transactionResponse = await chatContract.startChat(prompt);
                const receipt = await transactionResponse.wait();
                console.log(`Transaction sent, hash: ${receipt.transactionHash}.\nExplorer: https://explorer.galadriel.com/tx/${receipt.transactionHash}`);

                // Get current chat history
                let currentChatHistory = await chatContract.getMessageHistoryContents(chatID);
                let newChatHistory = currentChatHistory;
                console.log("Current chat history:", currentChatHistory);

                while (currentChatHistory.length === newChatHistory.length) {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    newChatHistory = await chatContract.getMessageHistoryContents(chatID);
                    console.log(".");
                }

                console.log("Chat history:", newChatHistory);
                // parse the response
                const parsedResponse = parseResponse(newChatHistory.join(', '));
                ws.send(JSON.stringify(parsedResponse));
            } catch (error: any) {
                console.error("Failed to interact with the chat contract:", error);
                ws.send(`Error: ${error.message}`);
            }
        });

        ws.send('WebSocket server connected. You can start sending messages.');
    });

    // Keep the server running
    process.stdin.resume();
}

main()
    .then(() => console.log('Server is running...'))
    .catch((error) => {
        console.error("Failed to interact with the chat contract:", error);
        process.exit(1);
    });
