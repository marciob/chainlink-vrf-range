const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
require("@nomiclabs/hardhat-etherscan");
const { SUBSCRIPTION_ID } = require("../constants");

async function main() {
  /*
 A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
 so randomNumRange here is a factory for instances of our RandomNumRange contract.
 */
  const randomNumRange = await ethers.getContractFactory("RandomNumRange");
  // deploy the contract
  const deployedRandomNumRangeContract = await randomNumRange.deploy(
    SUBSCRIPTION_ID
  );

  await deployedRandomNumRangeContract.deployed();

  // print the address of the deployed contract
  console.log(
    "Verify Contract Address:",
    deployedRandomNumRangeContract.address
  );

  console.log("Waiting for Etherscan verification.....");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(30000);

  // Verify the contract after deploying
  await hre.run("verify:verify", {
    address: deployedRandomNumRangeContract.address,
    constructorArguments: [SUBSCRIPTION_ID],
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//deployed: 0xDb4c4e0843AbDA88790c2BD59979572c20348A5e
