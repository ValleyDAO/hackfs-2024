# Galadriel Project

This guide provides instructions on how to set up and deploy the `CustomOpenAiChatGpt` contract on the Galadriel devnet.

## Prerequisites
Before beginning, ensure you have `node`, `npm`, and `git` installed on your machine.

## Step-by-Step Guide

### Step 1: Get Devnet Tokens
Obtain some devnet tokens from the Galadriel faucet. You can access the faucet here: [Galadriel Faucet](https://docs.galadriel.com/faucet)

### Step 2: Clone the Repository
Clone the Galadriel contracts repository and navigate to the contracts directory.
```bash
git clone https://github.com/galadriel-ai/contracts
cd contracts/contracts
```

### Step 3: Setup Environment
Copy the template.env file to a new .env file and configure it:
```bash
cp template.env .env
```
Modify the .env file:

Set PRIVATE_KEY_GALADRIEL to the private key of the account you want to use for deploying the contracts.
Set ORACLE_ADDRESS to the oracle address provided by the Galadriel team: 0x4168668812C94a3167FCd41D12014c5498D74d7e.

### Step 4: Install Dependencies
Navigate to the root of the repository and install the required npm packages.
```bash
npm install
```

### Step 5: Prepare Contract Files
Copy the CustomOpenAiChatGpt.sol contract file into the contracts folder.

```bash
cp <source_path>/CustomOpenAiChatGpt.sol contracts/
```

### Step 6: Prepare Script Files
Copy the deployment script deployCustomOpenAIChatGPT.ts into the scripts folder.
```bash
cp <source_path>/deployCustomOpenAIChatGPT.ts scripts/
```

### Step 7: Update Package Scripts
Add a new npm script to the package.json file to facilitate the deployment:
```bash
"scripts": {
    "deployCustomOpenAiChatGpt": "npx hardhat run scripts/deployCustomOpenAiChatGpt.ts --network galadriel"
}
```

### Step 8: Deploy the Contract
Run the deployment script to deploy the contract on the Galadriel devnet.
```bash
npm run deployCustomOpenAiChatGpt
```
Copy and save the resulting contract address.

### Step 9: Additional Scripts and Dockerfile
Copy the getVerification script to the scripts folder.
Copy the Dockerfile to the root of the cloned repository.

### Step 10: Step 10: Update Environment with Contract Address
Update the .env file with the CHAT_CONTRACT_ADDRESS obtained from the deployment.

### Step 11: Build and Run Docker Container
Build and run the Docker container:
```bash
docker build -t galadriel-chatgpt .
docker run -d -p 8080:8080 galadriel-chatgpt
```
You now have a Dockerized deployment of the CustomOpenAiChatGpt contract running against the Galadriel devnet.
You can interact with the docker through websocket.