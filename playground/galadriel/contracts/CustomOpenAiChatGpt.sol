// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./interfaces/IOracle.sol";

contract CustomOpenAiChatGpt {
    struct Message {
        string role;
        string content;
    }
    struct ChatRun {
        address owner;
        Message[] messages;
        uint messagesCount;
    }

    mapping(uint => ChatRun) public chatRuns;
    uint private chatRunsCount;

    address private owner;
    address public oracleAddress;

    event OracleAddressUpdated(address indexed newOracleAddress);
    event ChatCreated(address indexed owner, uint indexed chatId);

    IOracle.OpenAiRequest private config;

    constructor(address initialOracleAddress) {
        owner = msg.sender;
        oracleAddress = initialOracleAddress;
        chatRunsCount = 0;

        config = IOracle.OpenAiRequest({
            model: "gpt-4-turbo-preview",
            frequencyPenalty: 21,
            logitBias: "",
            maxTokens: 1000,
            presencePenalty: 21,
            responseFormat: "",
            seed: 0,
            stop: "",
            temperature: 0,
            topP: 101,
            tools: "",
            toolChoice: "",
            user: ""
        });
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    modifier onlyOracle() {
        require(msg.sender == oracleAddress, "Caller is not oracle");
        _;
    }

    function setOracleAddress(address newOracleAddress) public onlyOwner {
        oracleAddress = newOracleAddress;
        emit OracleAddressUpdated(newOracleAddress);
    }

    function startChat(string memory message) public onlyOwner returns (uint) {
        ChatRun storage run = chatRuns[chatRunsCount];

        run.owner = msg.sender;
        Message memory newMessage;
        newMessage.content = message;
        newMessage.role = "user";
        run.messages.push(newMessage);
        run.messagesCount = 1;

        uint currentId = chatRunsCount;
        chatRunsCount = chatRunsCount + 1;

        IOracle(oracleAddress).createOpenAiLlmCall(currentId, config);
        emit ChatCreated(msg.sender, currentId);

        return currentId;
    }

    function onOracleOpenAiLlmResponse(
        uint runId,
        IOracle.OpenAiResponse memory response,
        string memory errorMessage
    ) public onlyOracle {
        ChatRun storage run = chatRuns[runId];
        require(
            keccak256(abi.encodePacked(run.messages[run.messagesCount - 1].role)) == keccak256(abi.encodePacked("user")),
            "No message to respond to"
        );

        if (!compareStrings(errorMessage, "")) {
            Message memory newMessage;
            newMessage.role = "assistant";
            newMessage.content = errorMessage;
            run.messages.push(newMessage);
            run.messagesCount++;
        } else {
            if (compareStrings(response.content, "")) {
                IOracle(oracleAddress).createFunctionCall(runId, response.functionName, response.functionArguments);
            } else {
                Message memory newMessage;
                newMessage.role = "assistant";
                newMessage.content = response.content;
                run.messages.push(newMessage);
                run.messagesCount++;
            }
        }
    }

    function onOracleFunctionResponse(
        uint runId,
        string memory response,
        string memory errorMessage
    ) public onlyOracle {
        ChatRun storage run = chatRuns[runId];
        require(
            compareStrings(run.messages[run.messagesCount - 1].role, "user"),
            "No function to respond to"
        );
        if (compareStrings(errorMessage, "")) {
            Message memory newMessage;
            newMessage.role = "user";
            newMessage.content = response;
            run.messages.push(newMessage);
            run.messagesCount++;
            IOracle(oracleAddress).createOpenAiLlmCall(runId, config);
        }
    }

    function getChatRun(uint chatId) public view returns (ChatRun memory) {
        return chatRuns[chatId];
    }

    function getAllChatRuns() public view returns (ChatRun[] memory) {
        ChatRun[] memory allChatRuns = new ChatRun[](chatRunsCount);
        for (uint i = 0; i < chatRunsCount; i++) {
            allChatRuns[i] = chatRuns[i];
        }
        return allChatRuns;
    }

    function getMessageHistoryContents(uint chatId) public view returns (string[] memory) {
        string[] memory messages = new string[](chatRuns[chatId].messages.length);
        for (uint i = 0; i < chatRuns[chatId].messages.length; i++) {
            messages[i] = chatRuns[chatId].messages[i].content;
        }
        return messages;
    }

    function getMessageHistoryRoles(uint chatId) public view returns (string[] memory) {
        string[] memory roles = new string[](chatRuns[chatId].messages.length);
        for (uint i = 0; i < chatRuns[chatId].messages.length; i++) {
            roles[i] = chatRuns[chatId].messages[i].role;
        }
        return roles;
    }

    function getChatRunsCount() public view returns (uint) {
        return chatRunsCount;
    }

    function compareStrings(string memory a, string memory b) private pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }
}