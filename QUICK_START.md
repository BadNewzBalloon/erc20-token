# 🚀 Complete Step-by-Step Deployment Guide

This guide walks you through **every single step** to deploy your ERC-20 token and hold it in your wallet.

---

## Overview: What You'll Do

1. ✅ Install tools (Node.js, npm, Git)
2. ✅ Clone this repository
3. ✅ Test the smart contract locally
4. ✅ Deploy to **Base Sepolia testnet** (free, safe)
5. ✅ Add token to your MetaMask/wallet
6. ✅ Send and manage tokens
7. ✅ (Optional) Deploy to Base mainnet with real funds

**Total time: ~30 minutes**

---

# PHASE 1: Install & Setup (5 minutes)

## Step 1: Install Node.js

Node.js is needed to run Hardhat (Ethereum development tool).

### Windows or Mac:
1. Go to [nodejs.org](https://nodejs.org)
2. Click **LTS** (Long Term Support) - currently v18 or v20
3. Download and run the installer
4. Accept all defaults
5. Click **Install**

### Linux:
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Verify Installation:
Open a terminal/command prompt and run:
```bash
node --version
npm --version
```

You should see version numbers like `v18.0.0` and `9.0.0`.

---

## Step 2: Install Git

Git is needed to clone the repository.

### Windows:
1. Go to [git-scm.com](https://git-scm.com)
2. Download Windows installer
3. Run installer, accept defaults
4. Click **Finish**

### Mac:
```bash
brew install git
```

### Linux:
```bash
sudo apt-get install git
```

### Verify Installation:
```bash
git --version
```

---

## Step 3: Clone the Repository

A terminal/command prompt is required for these commands.

**Windows:** Press `Win + R`, type `cmd`, press Enter  
**Mac:** Press `Cmd + Space`, type `Terminal`, press Enter  
**Linux:** Open Terminal application

Then run:

```bash
git clone https://github.com/BadNewzBalloon/erc20-token.git
cd erc20-token
```

You should see:
```
Cloning into 'erc20-token'...
remote: Enumerating objects...
...
```

---

## Step 4: Install Dependencies

Still in terminal, run:

```bash
npm install
```

This downloads ~500MB of packages (Hardhat, contracts, test libraries). 

**Wait 2-3 minutes.** You'll see many lines ending with:
```
added XXX packages in Xm
```

---

# PHASE 2: Test Locally (5 minutes)

## Step 5: Compile the Contract

```bash
npm run compile
```

You should see:
```
✓ 1 compilation target
✓ Compiled successfully
```

---

## Step 6: Run Tests

```bash
npm test
```

You should see:
```
  SimpleToken
    Deployment
      ✓ Should set the right initial supply
      ✓ Should have correct name and symbol
      ...
    11 passing
```

If all tests pass ✓, your contract works!

---

# PHASE 3: Deploy to Base Sepolia Testnet (10 minutes)

## Step 7A: Set Up Your Wallet (MetaMask)

### If you don't have MetaMask:
1. Go to [metamask.io](https://metamask.io)
2. Click **Download** (for Chrome, Firefox, etc.)
3. Add to your browser
4. Click **Get Started**
5. Click **Create a Wallet**
6. Agree to terms
7. Set a password (remember this!)
8. **SAVE YOUR SEED PHRASE** in a safe place
9. Click **Next** → **Confirm** your seed phrase

### Add Base Sepolia Network:
1. Click the **Network** dropdown (top-left, says "Ethereum Mainnet")
2. Scroll down → Click **Add Network**
3. Enter these details:

```
Network name: Base Sepolia
RPC URL: https://sepolia.base.org
Chain ID: 84532
Currency symbol: ETH
Block explorer: https://sepolia.basescan.org
```

4. Click **Save**
5. Select **Base Sepolia** from the dropdown

### Get Your Wallet Address:
1. Look for your address at the top (starts with `0x`)
2. Click the address to copy it
3. Save it somewhere (you'll need it next)

---

## Step 7B: Get Test Funds

You need test ETH to pay for gas (deployment cost is ~$0.10-$0.50).

### Option 1: Alchemy Faucet (Easiest)
1. Go to [alchemy.com/faucets/ethereum-sepolia](https://alchemy.com/faucets/ethereum-sepolia)
2. Sign in with your email
3. Paste your wallet address (from Step 7A)
4. Click **Send me ETH**
5. Wait 1-2 minutes

### Option 2: Sepoliafaucet.com
1. Go to [sepoliafaucet.com](https://sepoliafaucet.com)
2. Paste your wallet address
3. Click **Send me ETH**
4. May need Twitter/GitHub verification

### Verify You Got Funds:
Look at MetaMask. It should show something like:
```
0.5 ETH
```

If not, wait a few minutes and refresh.

---

## Step 8: Create `.env` File

This file stores your private key and RPC settings.

### Create the file:
In your terminal (in the `erc20-token` folder):

```bash
cp .env.example .env
```

### Edit the file:
Open `.env` in a text editor (VS Code, Notepad, etc.)

Find and fill in these lines:

```bash
# Your wallet's private key (from MetaMask)
PRIVATE_KEY=your_key_here

# Base Sepolia RPC URL
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org

# Optional: Your Gnosis Safe address (skip for now)
MULTISIG_ADDRESS=

# Optional: For verification (skip for now)
BASESCAN_API_KEY=
```

### Get Your Private Key from MetaMask:
1. Open MetaMask
2. Click your account icon (top-right)
3. Click **Settings**
4. Click **Security and Privacy**
5. Click **Show Private Key**
6. Enter your password
7. Copy the key (looks like `0x1234567890abcdef...`)
8. Paste into `.env`:

```bash
PRIVATE_KEY=0x1234567890abcdef...
```

### ⚠️ CRITICAL SECURITY RULES:
- **NEVER** share this private key
- **NEVER** commit `.env` to Git
- **NEVER** push `.env` to GitHub
- This key controls your wallet funds
- Delete it after deployment

---

## Step 9: Update Hardhat Config

Edit `hardhat.config.js` and add Base Sepolia network.

Open `hardhat.config.js` in your text editor.

Find the `module.exports` section and make sure it includes Base networks:

```javascript
module.exports = {
  solidity: "0.8.19",
  networks: {
    baseSepolia: {
      url: process.env.BASE_SEPOLIA_RPC_URL || "https://sepolia.base.org",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 84532,
    },
    baseMainnet: {
      url: process.env.BASE_RPC_URL || "https://mainnet.base.org",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 8453,
    },
  },
};
```

**If `baseSepolia` and `baseMainnet` are not there, add them as shown above.**

Save the file.

---

## Step 10: Deploy!

In your terminal, run:

```bash
npx hardhat run scripts/deploy.js --network baseSepolia
```

**Watch the output.** You should see:

```
Deploying SimpleToken...
Deploying with account: 0xYourAddress
SimpleToken deployed to: 0x1234567890123456789012345678901234567890
Initial supply: 1000000.0 tokens
Deployer balance: 1000000.0 tokens

ℹ️ No MULTISIG_ADDRESS provided. Deployer retains ownership.
To transfer ownership later, call: token.transferOwnership(<address>)

✓ Deployment complete
```

### 🎉 SUCCESS! Save this contract address:
```
0x1234567890123456789012345678901234567890
```

You'll need it for everything else!

---

# PHASE 4: Add Token to Your Wallet (5 minutes)

## Step 11: Import Token into MetaMask

### Method 1: MetaMask Auto-Detection
1. Go to [sepolia.basescan.org/token/YOUR_CONTRACT_ADDRESS](https://sepolia.basescan.org)
2. Replace `YOUR_CONTRACT_ADDRESS` with the address from Step 10
3. On BaseScan, you should see a blue **Add to MetaMask** button
4. Click it
5. Click **Add Token** in MetaMask popup

### Method 2: Manual Import (if Method 1 doesn't work)
1. Open MetaMask
2. Make sure **Base Sepolia** network is selected
3. Click **Import tokens**
4. Paste your contract address from Step 10
5. It should auto-fill:
   - Token symbol: **SIMPLE**
   - Decimals: **18**
6. Click **Add Custom Token**
7. Click **Import**

### Verify It Worked:
You should now see in MetaMask:
```
SIMPLE: 1,000,000
```

Congratulations! You own all the tokens! 🎉

---

# PHASE 5: Send & Manage Tokens (5 minutes)

## Step 12: Send Tokens to Someone

### In MetaMask:
1. Click your **SIMPLE** token
2. Click **Send**
3. Enter a recipient address (e.g., a friend's wallet)
4. Enter amount (e.g., `100` for 100 SIMPLE)
5. Click **Next**
6. Review the transaction
7. Click **Confirm**

### Watch the confirmation:
The transaction will appear in MetaMask. Wait 10-30 seconds for it to confirm on Base.

Then check:
- Your balance should decrease
- Their balance should increase

---

## Step 13: View Your Token on BaseScan

BaseScan is like Etherscan for Base. It shows all transactions.

Go to:
```
https://sepolia.basescan.org/token/YOUR_CONTRACT_ADDRESS
```

Replace `YOUR_CONTRACT_ADDRESS` with your token address from Step 10.

You'll see:
- **Total supply:** 1,000,000 SIMPLE
- **Holders:** List of people who own tokens
- **Transfers:** History of all transactions
- **Your balance**

---

# PHASE 6: Deploy to Base Mainnet (Optional - Requires Real Money)

⚠️ This uses **real money**. Only do this when you're ready for production.

## Step 14A: Get Real ETH on Base Mainnet

You need real ETH to deploy to mainnet (costs ~$1-5 USD).

### Option 1: Bridge ETH from Ethereum
1. Go to [bridge.base.org](https://bridge.base.org)
2. Connect MetaMask
3. Enter amount of ETH to bridge (e.g., 0.1 ETH = ~$300+)
4. Confirm
5. Wait 10-20 minutes

### Option 2: Buy on Coinbase
1. If you use Coinbase, buy ETH
2. Send to your wallet address
3. On MetaMask, switch to **Base** network
4. Your ETH should appear

---

## Step 14B: Update `.env` for Mainnet

Edit `.env` and add:

```bash
BASE_RPC_URL=https://mainnet.base.org
```

---

## Step 14C: Deploy to Mainnet

```bash
npx hardhat run scripts/deploy.js --network baseMainnet
```

⚠️ This will **use real money** from your wallet for gas!

---

## Step 15: Secure Your Token with Multisig (Recommended for Mainnet)

If you deployed to mainnet, you should move ownership to a multisig for security.

### Create a Gnosis Safe:
1. Go to [gnosis-safe.io](https://gnosis-safe.io)
2. Click **Create Safe**
3. Select **Base** network
4. Name your Safe
5. Add signers (your friends/team)
6. Set threshold (e.g., "2-of-3")
7. Deploy (costs ~$1-3 gas)
8. Copy your Safe address

### Transfer Ownership to Safe:
```bash
CONTRACT_ADDRESS=0xYourTokenAddress \
NEW_OWNER=0xYourSafeAddress \
npx hardhat run scripts/transferOwnership.js --network baseMainnet
```

Now your token is owned by multiple people. No single key can steal it. ✅

---

# 🎯 Quick Reference: Common Commands

```bash
# Compile contract
npm run compile

# Run tests
npm test

# Deploy to local Hardhat network
npm run deploy

# Deploy to Base Sepolia (testnet)
npx hardhat run scripts/deploy.js --network baseSepolia

# Deploy to Base Mainnet (real money)
npx hardhat run scripts/deploy.js --network baseMainnet

# Deploy with multisig ownership
MULTISIG_ADDRESS=0xYourSafeAddress npx hardhat run scripts/deploy.js --network baseMainnet

# View accounts
npx hardhat accounts

# Get account balance
npx hardhat accounts --network baseSepolia
```

---

# ❌ Troubleshooting

### "Private key not found"
**Fix:**
1. Check `.env` file exists
2. Verify line: `PRIVATE_KEY=0x...` (no quotes!)
3. Make sure you didn't paste any extra spaces

---

### "Insufficient funds for gas"
**Fix:**
1. You need test ETH on Base Sepolia
2. Go to [alchemy.com/faucets/ethereum-sepolia](https://alchemy.com/faucets/ethereum-sepolia)
3. Claim more test ETH
4. Wait 1-2 minutes
5. Retry deployment

---

### "Contract not showing in MetaMask"
**Fix:**
1. Make sure **Base Sepolia** network is selected
2. Manually import:
   - Click **Import tokens**
   - Paste contract address
   - Click **Add**

---

### "Contract not appearing on BaseScan"
**Fix:**
1. Wait 2-3 minutes after deployment
2. Verify the contract address is correct
3. Check you're on the right network (Sepolia vs Mainnet)
4. Try refreshing BaseScan

---

### "Invalid RPC URL"
**Fix:**
1. Check `.env` has correct URL
2. For Sepolia: `https://sepolia.base.org`
3. For Mainnet: `https://mainnet.base.org`

---

### "Contract deployment failed"
**Fix:**
1. Run: `npm run compile`
2. Check for syntax errors
3. Verify `.env` has private key and RPC URL
4. Make sure you have enough gas (test ETH)

---

# ✅ Success Checklist

After completing all steps, you should have:

- [ ] Node.js and npm installed
- [ ] Repository cloned
- [ ] Tests passing (`npm test`)
- [ ] MetaMask wallet created with Base Sepolia network
- [ ] Test ETH in your wallet
- [ ] `.env` file created with private key
- [ ] Contract deployed to Base Sepolia
- [ ] Token address saved
- [ ] Token imported into MetaMask
- [ ] Can see 1,000,000 SIMPLE tokens in wallet
- [ ] Sent tokens to a friend (test transfer)
- [ ] Contract visible on BaseScan

🎉 **You've successfully deployed an ERC-20 token!**

---

# 📚 Additional Resources

- **This Project:** [GitHub Repo](https://github.com/BadNewzBalloon/erc20-token)
- **Detailed Guides:**
  - [SETUP_GUIDE.md](SETUP_GUIDE.md) — Ethereum Sepolia deployment
  - [BASE_DEPLOYMENT_GUIDE.md](BASE_DEPLOYMENT_GUIDE.md) — Base network guide
  - [README.md](README.md) — Project overview
- **OpenZeppelin:** [ERC-20 Docs](https://docs.openzeppelin.com/contracts/4.x/erc20)
- **Base Network:** [Documentation](https://docs.base.org)
- **MetaMask:** [Help Center](https://support.metamask.io)
- **Gnosis Safe:** [Documentation](https://docs.safe.global)

---

# 🆘 Need Help?

If you get stuck:

1. **Check the guides:** [SETUP_GUIDE.md](SETUP_GUIDE.md) or [BASE_DEPLOYMENT_GUIDE.md](BASE_DEPLOYMENT_GUIDE.md)
2. **Google the error** — Most common errors have Stack Overflow answers
3. **Ask on Discord:** Search "hardhat" or "Web3" communities
4. **Create a GitHub issue:** [github.com/BadNewzBalloon/erc20-token/issues](https://github.com/BadNewzBalloon/erc20-token/issues)

---

**Good luck! 🚀 You've got this!**
