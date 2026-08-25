# Step-by-Step Setup & Deployment Guide

## Prerequisites

Before starting, ensure you have:
- **Node.js** v16 or higher installed ([download](https://nodejs.org/))
- **npm** v8 or higher
- A code editor (VS Code recommended)
- Git installed

Verify installations:
```bash
node --version
npm --version
git --version
```

---

## Step 1: Clone the Repository

```bash
git clone https://github.com/BadNewzBalloon/erc20-token.git
cd erc20-token
```

---

## Step 2: Install Dependencies

```bash
npm install
```

This installs:
- Hardhat (Ethereum development environment)
- OpenZeppelin contracts (audited, standard ERC-20)
- Test libraries (Chai, Ethers.js)
- Other utilities

**Expected output:** Shows installed packages in `node_modules/`

---

## Step 3: Compile the Smart Contract

```bash
npm run compile
```

**What happens:**
- Solidity compiler processes `contracts/SimpleToken.sol`
- Creates `artifacts/` folder with compiled bytecode and ABI
- Verifies there are no syntax errors

**Expected output:**
```
contracts/SimpleToken.sol: Warning: SPDX license identifier not provided in source file.
SimpleToken

✓ 1 compilation target
✓ Compiled successfully
```

---

## Step 4: Run Tests

```bash
npm test
```

**What happens:**
- Runs all tests in `test/SimpleToken.test.js`
- Deploys token to local Hardhat test network
- Tests all functionality (minting, transfers, burning, etc.)

**Expected output:**
```
  SimpleToken
    Deployment
      ✓ Should set the right initial supply
      ✓ Should have correct name and symbol
      ✓ Should have 18 decimals
    Minting
      ✓ Should allow owner to mint tokens
      ✓ Should not allow non-owner to mint tokens
    Transfers
      ✓ Should transfer tokens between accounts
      ✓ Should fail if sender doesn't have enough tokens
    Burning
      ✓ Should allow holder to burn their own tokens
      ✓ Should allow burning from approved account
    Ownership
      ✓ Should transfer ownership
      ✓ Should not allow non-owner to call owner-only functions

  11 passing
```

---

## Step 5: Deploy to Local Network (Hardhat)

```bash
npm run deploy
```

**What happens:**
- Deploys SimpleToken to local Hardhat network
- Initial supply: 1,000,000 tokens
- Deployer account receives all initial tokens
- Prints contract address and balances

**Expected output:**
```
Deploying SimpleToken...
Deploying with account: 0x70997970C51812e339D9B73b0245ad59E136e099
SimpleToken deployed to: 0x5FbDB2315678afccb333f8a9c4bbe3b5A27f2cA9
Initial supply: 1000000.0 tokens
Deployer balance: 1000000.0 tokens

No MULTISIG_ADDRESS provided. Deployer retains ownership.
To transfer ownership later, call: token.transferOwnership(<address>)
```

---

## Step 6: Get Testnet Funds (For Real Network Deployment)

To deploy to **Sepolia testnet**, you need test ETH for gas fees.

### Option A: Using Alchemy Faucet (Recommended)
1. Go to [alchemy.com/faucets/ethereum-sepolia](https://alchemy.com/faucets/ethereum-sepolia)
2. Sign up / log in with your wallet
3. Enter your wallet address
4. Claim 0.5 test ETH
5. Wait a few minutes for confirmation

### Option B: Using Sepoliafaucet.com
1. Go to [sepoliafaucet.com](https://sepoliafaucet.com)
2. Enter your wallet address
3. Click "Send me ETH"
4. Confirm you have a Twitter/Facebook account (proof of life check)

### Option C: Using Infura Faucet
1. Go to [infura.io/faucet/sepolia](https://infura.io/faucet/sepolia)
2. Enter your wallet address
3. Click claim button

**Expected:** You should receive 0.5-2 test ETH within a few minutes.

---

## Step 7: Set Up Environment Variables

Create a `.env` file by copying the template:

```bash
cp .env.example .env
```

Open `.env` and fill in your details:

```bash
# Get your RPC URL from Infura, Alchemy, or another provider
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
MAINNET_RPC_URL=https://mainnet.infura.io/v3/YOUR_INFURA_KEY

# Your private key (from your wallet - MetaMask, etc.)
# WARNING: Never commit this file or share your private key!
PRIVATE_KEY=your_private_key_here_without_0x

# Optional: Multisig address to transfer ownership after deployment
MULTISIG_ADDRESS=0x...

# For verifying contracts on Etherscan
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### How to Get These Values:

#### 1. **SEPOLIA_RPC_URL** — Get an Infura API Key

- Go to [infura.io](https://infura.io)
- Sign up / log in
- Create a new API key
- Select "Ethereum" → "Sepolia"
- Copy the HTTPS URL ending in `/v3/YOUR_KEY`

Paste into `.env`:
```
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/abc123def456...
```

#### 2. **PRIVATE_KEY** — Export from Your Wallet

**Using MetaMask:**
1. Open MetaMask extension
2. Click account → Settings → Security and Privacy
3. Click "Reveal Secret Recovery Phrase" (backup seed)
4. Or, for just this account's private key:
   - Right-click the MetaMask icon → Settings → Advanced
   - No direct export, but you can import it to another tool
5. Better: Use `npx hardhat accounts` to generate a new account, or use a dedicated dev wallet

**⚠️ CRITICAL SECURITY:**
- **NEVER** share your private key
- **NEVER** commit `.env` to Git
- Use a new wallet for testnet, not your main wallet
- Delete from `.env` after deployment

#### 3. **MULTISIG_ADDRESS** (Optional)

If using Gnosis Safe multisig:
- Create a Safe on [gnosis-safe.io](https://gnosis-safe.io)
- Copy your Safe's contract address
- Paste into `.env`:
```
MULTISIG_ADDRESS=0x1234567890123456789012345678901234567890
```

#### 4. **ETHERSCAN_API_KEY** (Optional, for verification)

- Go to [etherscan.io](https://etherscan.io)
- Create account → API Keys
- Create new key named "SimpleToken"
- Copy the API key

---

## Step 8: Deploy to Sepolia Testnet

### Option A: Deploy Without Multisig

```bash
npm run deploy:sepolia
```

**What happens:**
- Connects to Sepolia testnet via your Infura RPC
- Uses your private key to deploy
- Mints 1,000,000 tokens to your account
- Prints the contract address

**Expected output:**
```
Deploying SimpleToken...
Deploying with account: 0xYourAddress...
SimpleToken deployed to: 0x1234567890123456789012345678901234567890
Initial supply: 1000000.0 tokens
Deployer balance: 1000000.0 tokens

No MULTISIG_ADDRESS provided. Deployer retains ownership.
To transfer ownership later, call: token.transferOwnership(<address>)
```

**Save the contract address!** You'll need it to interact with the token.

### Option B: Deploy With Multisig Ownership Transfer

If you have a Gnosis Safe (multisig wallet):

```bash
MULTISIG_ADDRESS=0x1234567890123456789012345678901234567890 npm run deploy:sepolia
```

**What happens:**
1. Deploys token with your account as temporary owner
2. Executes any setup (if needed)
3. Transfers ownership to the multisig
4. Multisig now controls minting and ownership transfers

**Expected output:**
```
Deploying SimpleToken...
Deploying with account: 0xYourAddress...
SimpleToken deployed to: 0x1234567890123456789012345678901234567890
Initial supply: 1000000.0 tokens
Deployer balance: 1000000.0 tokens

Transferring ownership to multisig: 0x1234567890123456789012345678901234567890
Ownership transferred successfully
```

---

## Step 9: Verify on Etherscan (Optional)

Once deployed, verify your contract on Etherscan so others can see the source code.

```bash
npx hardhat verify --network sepolia YOUR_CONTRACT_ADDRESS
```

Replace `YOUR_CONTRACT_ADDRESS` with the address from Step 8.

**Expected output:**
```
Successfully submitted source code for contract
contracts/SimpleToken.sol:SimpleToken at 0x1234567890123456789012345678901234567890
for verification on the block explorer.
Waiting for verification result...
Successfully verified contract SimpleToken on Etherscan.
https://sepolia.etherscan.io/address/0x1234567890123456789012345678901234567890#code
```

---

## Step 10: Interact With Your Token

### View Token Details

Go to Etherscan:
```
https://sepolia.etherscan.io/token/YOUR_CONTRACT_ADDRESS
```

You'll see:
- Token name: **SimpleToken**
- Symbol: **SIMPLE**
- Total supply: **1,000,000**
- Your balance

### Transfer Tokens

Using MetaMask or Etherscan:

**Method 1: MetaMask**
1. Add token to MetaMask:
   - Settings → Tokens → Add Token
   - Paste contract address
   - Symbol: SIMPLE
   - Decimals: 18
2. You'll now see your 1,000,000 SIMPLE tokens
3. Click "Send" to transfer to another address

**Method 2: Etherscan Write Contract**
1. Go to your contract on Etherscan
2. Click "Contract" → "Write Contract"
3. Click "Connect Wallet" (MetaMask)
4. Find `transfer` function
5. Enter:
   - `to`: recipient address
   - `amount`: amount in wei (e.g., `1000000000000000000` for 1 token)
6. Click "Write"
7. Confirm in MetaMask

### Mint More Tokens (If You're Owner)

**Using Etherscan:**
1. Go to contract → "Write Contract"
2. Find `mint` function
3. Enter:
   - `to`: address to mint to
   - `amount`: amount in wei
4. Click "Write"

---

## Step 11: Transfer Ownership (If Not Using Multisig)

If you didn't transfer ownership during deployment, you can do it manually:

**Using Etherscan:**
1. Go to your contract → "Write Contract"
2. Find `transferOwnership` function
3. Enter the new owner address (can be multisig, another person, or contract)
4. Click "Write"
5. Confirm in MetaMask

---

## Troubleshooting

### Error: "Private key not found"
- Check `.env` file exists and has `PRIVATE_KEY=...`
- Make sure no quotes around the key: `PRIVATE_KEY=abc123...` (not `PRIVATE_KEY="abc123..."`)

### Error: "insufficient funds for gas"
- You ran out of test ETH
- Go back to Step 6 and claim more from a faucet
- Check balance: `npx hardhat accounts --network sepolia`

### Error: "Contract deployment failed"
- Check Sepolia RPC URL in `.env`
- Verify API key is correct
- Check contract compiles: `npm run compile`

### Tests are failing
- Make sure you ran `npm install` first
- Try: `npm test`
- If still failing, check Node.js version: `node --version` (should be v16+)

### Contract not appearing on Etherscan
- Wait 2-3 minutes after deployment
- Verify you copied the correct address
- Check network is set to Sepolia

---

## What's Next?

✅ **You now have:**
- A deployed ERC-20 token on Sepolia testnet
- Full ownership control (or multisig if configured)
- Verified source code on Etherscan
- Ability to mint, transfer, and burn tokens

**Next steps:**
1. **Test more:** Send tokens to friends, test burning, test minting
2. **Create a frontend:** Build a React dApp to interact with your token
3. **Deploy to mainnet:** Follow same steps, swap `npm run deploy:sepolia` to mainnet (requires real ETH!)
4. **Add features:** Implement token locks, vesting schedules, or governance
5. **Audit:** Before mainnet, have a security team review

---

## Quick Reference Commands

```bash
# Install & Setup
npm install
cp .env.example .env

# Development
npm run compile              # Compile contracts
npm test                     # Run all tests
npm run deploy               # Deploy to local network

# Testnet (Sepolia)
npm run deploy:sepolia       # Deploy with deployer as owner
MULTISIG_ADDRESS=0x... npm run deploy:sepolia  # Deploy with multisig ownership

# Verification
npx hardhat verify --network sepolia <ADDRESS>

# View accounts (for testing)
npx hardhat accounts
```

---

## Security Reminders

🔒 **Before production mainnet deployment:**
- [ ] Keep `.env` private — never commit to GitHub
- [ ] Use a fresh, low-value wallet for testnets
- [ ] Have a security audit performed
- [ ] Test thoroughly on testnet first
- [ ] Use a multisig for mainnet ownership
- [ ] Document your deployment procedure
- [ ] Keep backup of deployment address and ABI

---

Good luck! 🚀 Questions? Check the README.md or create an issue in the repo.
