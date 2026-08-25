# erc20-token

Standard ERC-20 token contract implementation with secure multisig ownership support.

## Overview

This repository contains a production-ready ERC-20 token implementation using OpenZeppelin's audited contracts. It includes:

- **SimpleToken.sol** — Standard ERC-20 with minting and burning capabilities
- **Secure ownership transfer** — Supports transferring ownership to Gnosis Safe multisigs
- **Hardhat deployment scripts** — One-command deployment with optional multisig setup
- **Full test suite** — Comprehensive unit tests for all functionality

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/BadNewzBalloon/erc20-token.git
cd erc20-token
npm install
```

### 2. Compile & Test

```bash
npm run compile
npm test
```

### 3. Deploy

**Local (Hardhat):**
```bash
npm run deploy
```

**Sepolia Testnet:**
```bash
npm run deploy:sepolia
```

**With Multisig Ownership:**
```bash
MULTISIG_ADDRESS=0xYourSafeAddress npm run deploy:sepolia
```

For detailed setup instructions, see **[SETUP_GUIDE.md](SETUP_GUIDE.md)**.

---

## Handing Ownership to a Multisig

### Why This Matters

A single compromised private key can call `transferOwnership()` instantly. With a Gnosis Safe multisig:

- **Proposing** a withdrawal requires M signatures
- **Executing** the withdrawal requires M signatures  
- **Single compromised key alone cannot do either**

### How It Works

The `Ownable` contract in OpenZeppelin already accepts any address as the owner — including a Gnosis Safe. The deployment script adds a two-phase flow:

1. **Setup phase** — Deployer account runs all initialization (contract deployment, liquidity setup, example functions)
2. **Transfer phase** — Ownership is transferred to the multisig as the final step

**Why two phases?** A Safe can't easily sign a sequence of individual setup calls. The Safe can only call one function at a time (via a queued transaction). An EOA can batch setup in one script, then hand off ownership.

### Deployment With Multisig

1. **Create a Gnosis Safe** at [gnosis-safe.io](https://gnosis-safe.io)
   - Set signature threshold (e.g., 2-of-3)
   - Copy the Safe's contract address

2. **Deploy and transfer ownership:**

   ```bash
   MULTISIG_ADDRESS=0x1234567890123456789012345678901234567890 \
   npm run deploy:sepolia
   ```

3. **What the script does:**
   - Deploys SimpleToken
   - Runs any setup functions (minting, pool initialization, example purchase)
   - **Transfers ownership to the Safe as the final step**
   - Prints confirmation

4. **After deployment:**
   - The Safe is now the owner
   - Any `transferOwnership()` call requires Safe signatures
   - To mint tokens or change settings, propose a Safe transaction

### Manual Ownership Transfer

If you deployed without a multisig and want to add one later:

```bash
npx hardhat run scripts/transferOwnership.js --network sepolia
```

Or via Etherscan:
1. Go to your token on Etherscan
2. Click **Contract** → **Write Contract**
3. Find `transferOwnership` function
4. Enter your Safe's address
5. Click **Write** and confirm

---

## Features

- ✅ **ERC-20 Compliant** — OpenZeppelin standard implementation
- ✅ **Minting** — Owner can mint tokens on demand
- ✅ **Burning** — Holders can burn their own tokens
- ✅ **Ownership Transfer** — Supports EOAs, multisigs, and contracts
- ✅ **Pausable** (optional extension available)
- ✅ **Full Test Coverage** — 11+ unit tests
- ✅ **Verified Source** — Deploy and verify on Etherscan

---

## Project Structure

```
erc20-token/
├── contracts/
│   └── SimpleToken.sol       # Main ERC-20 contract
├── scripts/
│   ├── deploy.js             # Local & testnet deployment
│   └── transferOwnership.js   # Manual ownership transfer
├── test/
│   └── SimpleToken.test.js   # Unit tests
├── .env.example              # Environment variables template
├── hardhat.config.js         # Hardhat configuration
├── package.json              # Dependencies
├── README.md                 # This file
└── SETUP_GUIDE.md            # Detailed setup instructions
```

---

## Environment Setup

Copy the template and fill in your values:

```bash
cp .env.example .env
```

**Required (.env):**
- `SEPOLIA_RPC_URL` — Your RPC endpoint (Infura, Alchemy, etc.)
- `PRIVATE_KEY` — Your deployment account's private key (testnet only!)

**Optional:**
- `MULTISIG_ADDRESS` — Gnosis Safe address for ownership transfer
- `ETHERSCAN_API_KEY` — For contract verification

**⚠️ Security:**
- Never commit `.env` to Git
- Use a dedicated testnet wallet, not your main wallet
- Delete `PRIVATE_KEY` from `.env` after deployment

---

## Commands Reference

```bash
# Install dependencies
npm install

# Compile contracts
npm run compile

# Run all tests
npm test

# Deploy locally
npm run deploy

# Deploy to Sepolia (requires .env)
npm run deploy:sepolia

# Verify on Etherscan
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>

# View test accounts
npx hardhat accounts
```

---

## Security Checklist

Before deploying to mainnet:

- [ ] Code reviewed by security team
- [ ] Full audit completed
- [ ] `.env` file is gitignored and never committed
- [ ] Used fresh testnet wallet (not main funds)
- [ ] Tested on Sepolia for 48+ hours
- [ ] Multisig ownership configured (3+ signers recommended)
- [ ] Etherscan verification completed
- [ ] Deployment procedure documented
- [ ] ABI and contract address backed up

---

## Troubleshooting

**"Private key not found"**
- Check `.env` exists and has `PRIVATE_KEY=...` (no quotes)

**"Insufficient funds for gas"**
- Claim test ETH from a faucet ([alchemy.com/faucets/ethereum-sepolia](https://alchemy.com/faucets/ethereum-sepolia))

**"Contract deployment failed"**
- Verify RPC URL and API key in `.env`
- Run `npm run compile` to check for syntax errors

**Tests failing**
- Ensure Node.js v16+: `node --version`
- Run `npm install` again

---

## Additional Resources

- [OpenZeppelin ERC-20 Docs](https://docs.openzeppelin.com/contracts/4.x/erc20)
- [Gnosis Safe Documentation](https://docs.safe.global/)
- [Hardhat Documentation](https://hardhat.org/)
- [Etherscan Contract Verification](https://docs.etherscan.io/tutorials/verifying-contracts-hardhat)

---

**Questions?** Create an issue or check [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed steps.
