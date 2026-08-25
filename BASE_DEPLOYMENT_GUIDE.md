# BASE Network Deployment & Wallet Guide

Complete guide for deploying your ERC-20 token to **Base** and holding it in your wallet.

---

## What You'll Learn

- ✅ Deploy to Base mainnet or testnet
- ✅ Add token to your Base wallet (MetaMask, Coinbase Wallet, etc.)
- ✅ View, send, and manage your tokens
- ✅ Secure multisig ownership on Base

---

## Prerequisites

Before starting, you'll need:

1. **A wallet with Base network support:**
   - MetaMask (recommended)
   - Coinbase Wallet
   - Ledger + MetaMask
   - WalletConnect-compatible wallet

2. **Test funds (for Base Sepolia testnet):**
   - Free from faucet: [sepoliafaucet.com](https://sepoliafaucet.com)
   - Or swap testnet ETH from Ethereum Sepolia → Base Sepolia

3. **Mainnet funds (for Base mainnet):**
   - Bridge real ETH from Ethereum or buy on Coinbase
   - Send to your Base wallet

---

## Part 1: Setup Your Wallet for Base

### Step 1A: MetaMask Setup (Recommended)

**If you don't have MetaMask:**
1. Install from [metamask.io](https://metamask.io)
2. Create a new wallet or import existing
3. Save your seed phrase securely

**Add Base Network to MetaMask:**

1. Open MetaMask
2. Click the **Network** dropdown (top left)
3. Scroll down → Click **Add Network**
4. Fill in the following:

   **For Base Mainnet:**
   ```
   Network name: Base
   RPC URL: https://mainnet.base.org
   Chain ID: 8453
   Currency symbol: ETH
   Block explorer: https://basescan.org
   ```

   **For Base Sepolia (Testnet):**
   ```
   Network name: Base Sepolia
   RPC URL: https://sepolia.base.org
   Chain ID: 84532
   Currency symbol: ETH
   Block explorer: https://sepolia.basescan.org
   ```

5. Click **Save**
6. You'll see "Base" in your network dropdown

**Get Test Funds (Sepolia only):**
1. Select **Base Sepolia** network in MetaMask
2. Go to [sepoliafaucet.com](https://sepoliafaucet.com)
3. Enter your wallet address (copy from MetaMask)
4. Claim ETH
5. Wait 1-2 minutes for confirmation

### Step 1B: Coinbase Wallet Setup

1. Install Coinbase Wallet app or extension
2. Create/import wallet
3. Tap **Settings** → **Networks** → **Add a custom network**
4. Use same details as MetaMask (see above)

---

## Part 2: Deploy Your Token to Base

### Step 2A: Get RPC URL & Private Key

**Get a Free RPC URL:**

1. Go to [infura.io](https://infura.io) or [alchemy.com](https://alchemy.com)
2. Sign up for free
3. Create an API key for **Base** network
4. Copy your RPC URL:
   - Infura: `https://base-mainnet.infura.io/v3/YOUR_KEY`
   - Alchemy: `https://base-mainnet.g.alchemy.com/v2/YOUR_KEY`

**Export Your Private Key (MetaMask):**

⚠️ **CRITICAL: Only do this on a testnet wallet!**

1. Open MetaMask
2. Click account → **Account details**
3. Click **Export private key**
4. Enter your password
5. Copy the key (starts with `0x`)
6. **Never share or commit this to Git**

### Step 2B: Configure Deployment

**Clone the repo:**

```bash
git clone https://github.com/BadNewzBalloon/erc20-token.git
cd erc20-token
npm install
```

**Create `.env` file:**

```bash
cp .env.example .env
```

**Edit `.env`:**

```bash
# Base Mainnet RPC
BASE_RPC_URL=https://mainnet.base.org

# Or Base Sepolia (testnet) RPC
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org

# Your deployment wallet private key (testnet only!)
PRIVATE_KEY=0xYourPrivateKeyHere

# Optional: Multisig address (for secure ownership)
MULTISIG_ADDRESS=0x...

# Etherscan API key (for verification on BaseScan)
BASESCAN_API_KEY=your_key_here
```

### Step 2C: Update Hardhat Config

Edit `hardhat.config.js` and add Base networks:

```javascript
module.exports = {
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
  // ... rest of config
};
```

### Step 2D: Deploy!

**Deploy to Base Sepolia (testnet):**

```bash
npx hardhat run scripts/deploy.js --network baseSepolia
```

**Deploy to Base Mainnet:**

```bash
npx hardhat run scripts/deploy.js --network baseMainnet
```

**Expected output:**

```
Deploying SimpleToken...
Deploying with account: 0xYourAddress
SimpleToken deployed to: 0x1234567890123456789012345678901234567890
Initial supply: 1000000.0 tokens
Deployer balance: 1000000.0 tokens

No MULTISIG_ADDRESS provided. Deployer retains ownership.
To transfer ownership later, call: token.transferOwnership(<address>)
```

**Save this contract address!** You'll need it for everything else.

---

## Part 3: Add Token to Your Wallet

### Step 3A: MetaMask

**Method 1: Manual Import**

1. Open MetaMask
2. Switch to **Base** network (or Base Sepolia)
3. Click **Import tokens**
4. Paste your contract address from Step 2D
5. Click **Add custom token**
6. Confirm symbol is "SIMPLE" and decimals is "18"
7. Click **Import**

**You should now see your 1,000,000 SIMPLE tokens!**

### Step 3B: Coinbase Wallet

1. Open Coinbase Wallet
2. Tap **+ Add**
3. Search for your token by contract address
4. Tap to add
5. Confirm balance

### Step 3C: Verify on BaseScan

View your token on the block explorer:

**Base Sepolia:**
```
https://sepolia.basescan.org/token/YOUR_CONTRACT_ADDRESS
```

**Base Mainnet:**
```
https://basescan.org/token/YOUR_CONTRACT_ADDRESS
```

You'll see:
- Total supply
- Your balance
- All transfers

---

## Part 4: Send & Manage Your Tokens

### Send Tokens from Your Wallet

**MetaMask:**
1. Click your SIMPLE token balance
2. Click **Send**
3. Enter recipient address
4. Enter amount (e.g., 100 SIMPLE)
5. Click **Next**
6. Review gas fee (costs tiny amount of ETH)
7. Click **Confirm**

**Wait 10-30 seconds** for transaction to confirm on Base.

### Burn Tokens (Remove from Circulation)

**Option 1: Using Etherscan Interface**

1. Go to BaseScan: `https://basescan.org/token/YOUR_CONTRACT_ADDRESS`
2. Click **Contract** → **Write Contract**
3. Click **Connect Wallet**
4. Find `burn` function
5. Enter amount in wei:
   - For 100 tokens: `100000000000000000000`
   - Formula: `amount * 10^18`
6. Click **Write**
7. Confirm in wallet

**Option 2: Using a Script**

Create `scripts/burn.js`:

```javascript
const hre = require("hardhat");

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  const burnAmount = hre.ethers.utils.parseEther("100"); // 100 tokens

  const token = await hre.ethers.getContractAt("SimpleToken", contractAddress);
  const tx = await token.burn(burnAmount);
  await tx.wait();

  console.log("✓ Burned", hre.ethers.utils.formatEther(burnAmount), "tokens");
}

main().catch(console.error);
```

Run:
```bash
CONTRACT_ADDRESS=0x... npx hardhat run scripts/burn.js --network baseMainnet
```

### Mint More Tokens (Owner Only)

**Using BaseScan:**

1. Go to your contract → **Write Contract**
2. Connect wallet
3. Find `mint` function
4. Enter:
   - `to`: recipient address
   - `amount`: amount in wei
5. Click **Write**

---

## Part 5: Secure with Multisig (Optional)

For mainnet, it's best to use a multisig wallet as owner.

### Create a Gnosis Safe on Base

1. Go to [gnosis-safe.io](https://gnosis-safe.io)
2. Click **Create Safe**
3. Select **Base** network
4. Name your Safe (e.g., "Token Owner")
5. Add signers (addresses of people who will control the token)
6. Set threshold (e.g., "2-of-3" requires 2 out of 3 people to approve)
7. Deploy (costs ~$1-3 in gas)
8. Copy the Safe address

### Transfer Ownership to Safe

**Option 1: During Deployment**

```bash
MULTISIG_ADDRESS=0xYourSafeAddress npx hardhat run scripts/deploy.js --network baseMainnet
```

**Option 2: After Deployment**

```bash
CONTRACT_ADDRESS=0xYourTokenAddress \
NEW_OWNER=0xYourSafeAddress \
npx hardhat run scripts/transferOwnership.js --network baseMainnet
```

**From BaseScan:**

1. Go to your token on BaseScan
2. Click **Contract** → **Write Contract**
3. Find `transferOwnership`
4. Paste Safe address
5. Click **Write**

---

## Part 6: Verify on BaseScan (Optional)

Make your contract visible on BaseScan:

```bash
npx hardhat verify \
  --network baseMainnet \
  YOUR_CONTRACT_ADDRESS
```

This publishes your source code so everyone can read it.

---

## Quick Reference

### Commands

```bash
# Setup
git clone https://github.com/BadNewzBalloon/erc20-token.git
cd erc20-token
npm install
cp .env.example .env
# Edit .env with your RPC URL and private key

# Test locally
npm run compile
npm test

# Deploy to testnet
npx hardhat run scripts/deploy.js --network baseSepolia

# Deploy to mainnet
npx hardhat run scripts/deploy.js --network baseMainnet

# Deploy with multisig
MULTISIG_ADDRESS=0x... npx hardhat run scripts/deploy.js --network baseMainnet

# Verify on BaseScan
npx hardhat verify --network baseMainnet YOUR_CONTRACT_ADDRESS

# View your token
# Base Sepolia: https://sepolia.basescan.org/token/YOUR_CONTRACT_ADDRESS
# Base Mainnet: https://basescan.org/token/YOUR_CONTRACT_ADDRESS
```

### Network URLs

| Network | RPC | Block Explorer | Chain ID |
|---------|-----|---|----------|
| Base Mainnet | `https://mainnet.base.org` | [basescan.org](https://basescan.org) | 8453 |
| Base Sepolia | `https://sepolia.base.org` | [sepolia.basescan.org](https://sepolia.basescan.org) | 84532 |

### Useful Links

- [Base Documentation](https://docs.base.org/)
- [BaseScan Block Explorer](https://basescan.org)
- [Gnosis Safe (Base)](https://app.safe.global/)
- [MetaMask](https://metamask.io)
- [Coinbase Wallet](https://www.coinbase.com/wallet)

---

## Troubleshooting

### "Invalid RPC URL"
- Check `.env` has correct `BASE_RPC_URL` or `BASE_SEPOLIA_RPC_URL`
- Test URL: `curl https://mainnet.base.org -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"web3_clientVersion","id":1}'`

### "Insufficient funds for gas"
- You need ETH on Base (not Ethereum)
- For testnet: Claim from [sepoliafaucet.com](https://sepoliafaucet.com)
- For mainnet: Bridge ETH from Ethereum Mainnet using [Coinbase Bridge](https://bridge.base.org)

### "Contract not showing in wallet"
- Manually import by contract address (see Part 3)
- Try switching networks off/on
- Clear wallet cache: Settings → Advanced → Reset Account

### "Transaction reverted"
- Check you have enough gas (view on BaseScan)
- Verify contract address is correct
- Ensure you're calling the function correctly

### Token not appearing on BaseScan
- Wait 2-3 minutes after deployment
- Verify network (Mainnet vs Sepolia)
- Check contract address is correct

---

## Security Checklist

Before mainnet launch:

- [ ] Tested thoroughly on Base Sepolia testnet (48+ hours)
- [ ] Private key never committed to Git
- [ ] `.env` file is in `.gitignore`
- [ ] Contract verified on BaseScan
- [ ] Multisig ownership configured (3+ signers)
- [ ] All team members have access to multisig
- [ ] Contract address and ABI backed up
- [ ] Tested token transfers, burning, minting
- [ ] Security audit completed (optional but recommended)

---

## Need Help?

- **Base Support:** [docs.base.org](https://docs.base.org)
- **This Project:** Create an issue on [GitHub](https://github.com/BadNewzBalloon/erc20-token)
- **MetaMask Help:** [support.metamask.io](https://support.metamask.io)
- **Gnosis Safe Docs:** [docs.safe.global](https://docs.safe.global)

Good luck! 🚀
