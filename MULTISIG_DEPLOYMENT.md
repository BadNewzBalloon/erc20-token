# 🔐 Multisig Deployment Guide (Gnosis Safe on Base)

Complete step-by-step guide for deploying your ERC-20 token with **multisig ownership** on Base using Gnosis Safe.

---

## What is a Multisig?

A **multisig (multi-signature) wallet** requires multiple people to approve important actions. For example:
- 2-of-3: Any 2 out of 3 people must approve
- 3-of-5: Any 3 out of 5 people must approve

**Why multisig for your token?**
- ✅ Single compromised key can't steal the token
- ✅ Multiple approval required for ownership changes
- ✅ Prevents accidents (multiple review before action)
- ✅ Professional security standard

---

## Overview: Full Multisig Deployment Flow

1. Create a Gnosis Safe on Base (5 min)
2. Add team members as signers (5 min)
3. Deploy token with regular account (5 min)
4. Transfer ownership to Safe (2 min)
5. Verify ownership (1 min)

**Total: ~20 minutes**

---

# PART 1: Create a Gnosis Safe (5 minutes)

## Step 1: Go to Gnosis Safe Website

1. Open [gnosis-safe.io](https://gnosis-safe.io)
2. Click **Create Safe** (top right)
3. Select your network: **Base** (or **Base Sepolia** for testnet)

---

## Step 2: Name Your Safe

1. Enter a name (e.g., "Token Owner Safe")
2. Click **Next**

---

## Step 3: Add Signers (Your Team Members)

A signer is a person who will approve actions.

### Add First Signer:
1. Click **Add signer**
2. Paste wallet address (must own the wallet)
3. Enter name (e.g., "Alice")
4. Click **Add**

### Add More Signers (Repeat):
1. Click **Add signer**
2. Paste wallet address of team member
3. Enter name (e.g., "Bob", "Charlie")
4. Click **Add**

**Example for 2-of-3 multisig:**
```
Signer 1: alice.eth (0x123...)
Signer 2: bob.eth (0x456...)
Signer 3: charlie.eth (0x789...)
```

---

## Step 4: Set Signature Threshold

The threshold is how many signers must approve each action.

### Common setups:
- **2-of-3:** 3 team members, any 2 can approve (tolerates 1 person being unavailable)
- **3-of-5:** 5 team members, any 3 can approve (tolerates 2 people being unavailable)
- **1-of-1:** Just you (defeats the purpose of multisig, but works)

For this guide, we'll use **2-of-3**:

1. Look for **Threshold** setting
2. Click the number and change it to **2**
3. Click **Next**

---

## Step 5: Review and Deploy

1. Review your setup:
   ```
   Network: Base
   Signers: Alice, Bob, Charlie
   Threshold: 2-of-3
   ```

2. Click **Create Safe**

3. **Connect your wallet** (MetaMask)
   - Make sure you have enough ETH for gas (~$2-5 on Base)

4. Click **Create** and confirm in MetaMask

5. **Wait 1-2 minutes** for deployment

---

## Step 6: Get Your Safe Address

After deployment, you'll see:
```
Safe Address: 0x1234567890123456789012345678901234567890
```

**Copy and save this address!** You'll need it for token deployment.

---

# PART 2: Deploy Token (Without Multisig Yet)

## Step 7: Prepare Deployment Environment

### 7A: Set Up `.env` File

In your `erc20-token` folder, create/edit `.env`:

```bash
# Your personal wallet private key (for deployment only)
PRIVATE_KEY=0xYourPrivateKeyHere

# Base Sepolia (testnet)
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org

# Or Base Mainnet (real money)
BASE_RPC_URL=https://mainnet.base.org

# Your Gnosis Safe address (from Step 6)
MULTISIG_ADDRESS=0x1234567890123456789012345678901234567890
```

---

### 7B: Verify Hardhat Config

Open `hardhat.config.js` and make sure Base networks are configured:

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
};
```

If these networks aren't there, add them!

---

## Step 8: Deploy Token

In your terminal:

### For Testnet (Base Sepolia):
```bash
MULTISIG_ADDRESS=0x1234567890123456789012345678901234567890 \
npx hardhat run scripts/deploy.js --network baseSepolia
```

### For Mainnet (Base):
```bash
MULTISIG_ADDRESS=0x1234567890123456789012345678901234567890 \
npx hardhat run scripts/deploy.js --network baseMainnet
```

**Replace the address with your actual Safe address from Step 6.**

---

## Step 9: Watch the Output

You should see:

```
Deploying SimpleToken...
Deploying with account: 0xYourDeployerAddress
SimpleToken deployed to: 0x5f3E4951E3AE0C5c8AD1c1dD8d1e2B4f5c6A7B8d
Initial supply: 1000000.0 tokens
Deployer balance: 1000000.0 tokens

Transferring ownership to multisig: 0x1234567890123456789012345678901234567890
✓ Ownership transferred successfully
```

**Save your token address:**
```
0x5f3E4951E3AE0C5c8AD1c1dD8d1e2B4f5c6A7B8d
```

---

# PART 3: Verify Multisig Ownership (5 minutes)

## Step 10: Check Ownership on BaseScan

1. Go to BaseScan:
   - **Testnet:** [sepolia.basescan.org](https://sepolia.basescan.org)
   - **Mainnet:** [basescan.org](https://basescan.org)

2. Search for your token address:
   ```
   https://basescan.org/token/0x5f3E4951E3AE0C5c8AD1c1dD8d1e2B4f5c6A7B8d
   ```

3. Click **Contract** tab

4. Scroll to "Owner" — it should show your **Gnosis Safe address**

---

## Step 11: Verify in Gnosis Safe

1. Go back to [gnosis-safe.io](https://gnosis-safe.io)
2. Select **Base** network
3. Enter your Safe address to load it
4. You should see your token listed in the Safe's assets

---

# PART 4: Mint or Manage Tokens (With Multisig Approval)

Now that the Safe owns the token, all owner actions require multisig approval.

## Step 12: Mint More Tokens (Example)

To mint new tokens, you must use the Gnosis Safe interface:

### Option 1: Via Gnosis Safe Web Interface (Easiest)

1. Go to [gnosis-safe.io](https://gnosis-safe.io)
2. Load your Safe
3. Click **New Transaction** (top right)
4. Click **Contract Interaction**
5. Enter contract address:
   ```
   0x5f3E4951E3AE0C5c8AD1c1dD8d1e2B4f5c6A7B8d
   ```
6. Click **Next**
7. Find `mint` function
8. Enter:
   - `to`: Address to mint to
   - `amount`: Amount in wei (1 token = 1000000000000000000)
9. Click **Review**
10. Click **Submit**
11. **All signers must approve** before execution

### Option 2: Via BaseScan

1. Go to [basescan.org/token/YOUR_TOKEN_ADDRESS](https://basescan.org/token/YOUR_TOKEN_ADDRESS)
2. Click **Contract** → **Write as Proxy**
3. Connect your Safe
4. Find `mint` function
5. Enter details
6. Click **Write**
7. Confirm in Gnosis Safe

---

## Step 13: Transfer Ownership (If Needed Later)

If you need to transfer ownership from the Safe to someone else:

1. In Gnosis Safe, create transaction for `transferOwnership()`
2. All signers must approve
3. Execute the transaction

---

# 🎯 Quick Reference Commands

```bash
# Check token owner (will show your Safe address)
npx hardhat run -c "scripts/check-owner.js" --network baseMainnet

# Manually transfer ownership if deployment didn't
CONTRACT_ADDRESS=0x... \
NEW_OWNER=0x... \
npx hardhat run scripts/transferOwnership.js --network baseMainnet

# Deploy WITH multisig in one command
MULTISIG_ADDRESS=0x1234567890123456789012345678901234567890 \
npx hardhat run scripts/deploy.js --network baseMainnet
```

---

# ❌ Troubleshooting

### "Ownership transfer failed"
**Fix:**
1. Check Safe address is correct (no typos)
2. Ensure you have enough gas
3. Verify Safe exists on the correct network

---

### "Can't execute transaction in Safe"
**Fix:**
1. All required signers must be available
2. Check Safe settings (threshold vs actual signers)
3. Ensure signers have accepted the invitation
4. Signers need small ETH amount for gas (~$0.50)

---

### "Token shows deployer as owner, not Safe"
**Fix:**
Option 1: Redeploy with `MULTISIG_ADDRESS` env var
```bash
MULTISIG_ADDRESS=0x... npx hardhat run scripts/deploy.js --network baseMainnet
```

Option 2: Manually transfer ownership:
```bash
CONTRACT_ADDRESS=0xYourToken \
NEW_OWNER=0xYourSafe \
npx hardhat run scripts/transferOwnership.js --network baseMainnet
```

---

### "One signer unavailable, can't execute transaction"
This is actually a feature! For 2-of-3, the other 2 can approve and execute without the third person.

---

# 📋 Multisig Operation Checklist

Before mainnet launch:

- [ ] Gnosis Safe created on correct network (Base)
- [ ] All team members added as signers
- [ ] Threshold set correctly (e.g., 2-of-3)
- [ ] All signers have small amount of ETH for gas
- [ ] Token deployed with `MULTISIG_ADDRESS` set
- [ ] Ownership verified on BaseScan (shows Safe address)
- [ ] All signers can access and approve transactions
- [ ] Test transaction executed successfully
- [ ] Security: Private keys never shared
- [ ] Documentation: Safe address and signers backed up

---

# 🔗 Useful Links

- **Gnosis Safe:** [gnosis-safe.io](https://gnosis-safe.io)
- **BaseScan:** [basescan.org](https://basescan.org)
- **Base Bridge:** [bridge.base.org](https://bridge.base.org)
- **Safe Docs:** [docs.safe.global](https://docs.safe.global)

---

# ✅ Success!

After completing this guide:

✅ Token deployed on Base  
✅ Owned by multisig wallet  
✅ Multiple team members control it  
✅ Single key compromise won't steal it  
✅ Professional security setup  

**Your token is now secure! 🎉**

---

**Questions?** Check [README.md](README.md) or create an issue on [GitHub](https://github.com/BadNewzBalloon/erc20-token/issues).
