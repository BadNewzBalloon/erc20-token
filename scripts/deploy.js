const hre = require("hardhat");

async function main() {
  console.log("Deploying SimpleToken...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Deploy the contract
  const SimpleToken = await hre.ethers.getContractFactory("SimpleToken");
  const token = await SimpleToken.deploy();
  await token.deployed();

  console.log("SimpleToken deployed to:", token.address);

  // Get initial supply from contract
  const initialSupply = await token.totalSupply();
  const deployerBalance = await token.balanceOf(deployer.address);

  console.log("Initial supply:", hre.ethers.utils.formatEther(initialSupply), "tokens");
  console.log("Deployer balance:", hre.ethers.utils.formatEther(deployerBalance), "tokens");

  // Check for multisig address in environment
  const multisigAddress = process.env.MULTISIG_ADDRESS;

  if (multisigAddress && hre.ethers.utils.isAddress(multisigAddress)) {
    console.log("\nTransferring ownership to multisig:", multisigAddress);
    const tx = await token.transferOwnership(multisigAddress);
    await tx.wait();
    console.log("✓ Ownership transferred successfully");
  } else if (multisigAddress) {
    console.log("\n⚠️ MULTISIG_ADDRESS provided but invalid:", multisigAddress);
    console.log("Deployer retains ownership.");
  } else {
    console.log("\nℹ️ No MULTISIG_ADDRESS provided. Deployer retains ownership.");
    console.log("To transfer ownership later, call: token.transferOwnership(<address>)");
  }

  // Return contract address for use in other scripts
  return token.address;
}

main()
  .then((address) => {
    console.log("\n✓ Deployment complete");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
