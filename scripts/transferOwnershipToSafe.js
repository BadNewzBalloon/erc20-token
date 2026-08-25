#!/usr/bin/env node
require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  const newOwner = process.env.NEW_OWNER || process.env.MULTISIG_ADDRESS;

  if (!contractAddress) {
    throw new Error("Set CONTRACT_ADDRESS in your environment (CONTRACT_ADDRESS=0x...)");
  }
  if (!newOwner) {
    throw new Error("Set NEW_OWNER or MULTISIG_ADDRESS in your environment (NEW_OWNER=0x...)");
  }

  console.log("Network:", hre.network.name);
  console.log("Contract:", contractAddress);
  console.log("New owner (Safe):", newOwner);

  const [deployer] = await hre.ethers.getSigners();
  console.log("Executing as deployer:", deployer.address);

  const SimpleToken = await hre.ethers.getContractFactory("SimpleToken");
  const token = SimpleToken.attach(contractAddress);

  // sanity check: current owner (if contract exposes owner())
  try {
    const currentOwner = await token.owner();
    console.log("Current owner:", currentOwner);
  } catch (e) {
    console.log("Note: contract may not expose `owner()` or call reverted.");
  }

  const tx = await token.connect(deployer).transferOwnership(newOwner);
  console.log("Sent transferOwnership tx:", tx.hash);
  await tx.wait();
  console.log("Ownership transfer confirmed in tx:", tx.hash);

  // Verify owner afterwards if available
  try {
    const ownerAfter = await token.owner();
    console.log("Owner after:", ownerAfter);
  } catch (e) {
    console.log("Could not read owner() after transfer.");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
