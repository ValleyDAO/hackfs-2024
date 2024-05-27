import {ethers} from "hardhat";


async function deployCustomOpenAiChatGpt(contractName: string, oracleAddress: string) {
    const agent = await ethers.deployContract(contractName, [oracleAddress], {});
  
    await agent.waitForDeployment();
  
    console.log(
      `${contractName} deployed to ${agent.target}`
    );
  }

async function main() {
    if (!process.env.ORACLE_ADDRESS) {
        throw new Error("ORACLE_ADDRESS env variable is not set.");
      }
      const oracleAddress: string = process.env.ORACLE_ADDRESS;

      await deployCustomOpenAiChatGpt("CustomOpenAiChatGpt", oracleAddress);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });  