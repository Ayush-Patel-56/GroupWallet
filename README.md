

<!-- README.md -->
# Flare Group Wallet dApp (Coston2)

## 1. Project Title

**Flare Group Wallet – Shared On-Chain Treasury on Coston2**

## 2. Contract Address

The Group Wallet smart contract is deployed on the Flare Coston2 test network at:

- **Address:** `0xd12658C6b5fccC9731Ef205661FC5898f1D2D58e`  
- **Explorer:** https://coston2-explorer.flare.network/address/0xd12658C6b5fccC9731Ef205661FC5898f1D2D58e

## 3. Description

Flare Group Wallet is a simple, permissioned on-chain treasury designed for small groups, teams, and communities who want to manage shared funds transparently on the Flare Coston2 network.

The contract allows an owner to manage a list of approved **members**. These members can deposit FLR into a shared pool and, subject to the contract rules, withdraw funds from it. This project includes:

- A Solidity smart contract deployed on Coston2.
- A TypeScript/Next.js frontend that interacts with the contract using **wagmi** and **viem**.
- A wallet-gated UI that lets users view the contract balance, check their membership status, and perform actions like deposit and withdraw.

The goal is to provide a minimal but realistic example of how to build an end-to-end dApp on Flare: from contract deployment to a production-ready, user-friendly interface.

## 4. Features

- **On-Chain Shared Balance**
  - Central contract balance managed in FLR.
  - Anyone can read the current contract balance.

- **Member Management (Contract-Level)**
  - `owner` address is stored on-chain.
  - Owner can **add** and **remove** members using `addMember` and `removeMember`.
  - Membership status for any address can be checked via `isMember(address)`.

- **Deposits**
  - Members can deposit FLR using the `deposit()` payable function.
  - Deposits are tracked in the contract’s shared balance.
  - A payable `receive` and `fallback` function allow the contract to accept plain FLR transfers as well.

- **Withdrawals**
  - The `withdraw(uint256 _amount)` function allows authorized addresses (as defined by the contract logic) to withdraw FLR from the shared balance.
  - Emits `Withdraw` events for on-chain traceability.

- **Events for Transparency**
  - `Deposit(from, amount)` when funds are added.
  - `Withdraw(to, amount)` when funds are withdrawn.
  - `MemberAdded(member)` and `MemberRemoved(member)` for access control changes.

- **Frontend Integration (Sample UI)**
  - Wallet connection and gating using **wagmi**.
  - Live display of:
    - Contract balance (in FLR).
    - Current user’s membership status.
  - Actions:
    - Deposit FLR into the group wallet.
    - Withdraw FLR from the group wallet.
  - Transaction status tracking:
    - Pending / confirming states.
    - Transaction hash display.
    - Basic error handling surfaced in the UI.

- **TypeScript-First Integration**
  - Contract ABI and address exposed via `lib/contract.ts`.
  - Reusable React hook `useWillContract` (group wallet hook) in `hooks/useContract.ts`:
    - Encapsulates reads (`getBalance`, `isMember`, `owner`) and writes (`deposit`, `withdraw`).
    - Exposes structured `data`, `actions`, and `state` for easy consumption by UI components.

## 5. How It Solves the Problem

### The Problem

Managing shared funds among multiple people often leads to:

- Lack of transparency (“Who has the money right now?”).
- Manual accounting and trust-heavy processes.
- Centralized custody (one person controls all funds).
- Friction when trying to move from Web2-style IOUs to real on-chain value.

Small DAOs, student groups, hackathon teams, and community projects often need a **simple** shared wallet rather than a complex multi-signature or governance-heavy system. They need:

- A way to pool funds on-chain.
- A permission model to restrict who can interact with the funds.
- A clear, easy-to-use interface that works with standard wallets.

### The Solution

The Flare Group Wallet provides a clean, opinionated solution:

1. **Shared On-Chain Treasury**
   - All funds are held in one smart contract, making the balance visible to everyone.
   - `getBalance()` exposes this balance, and the frontend displays it in real time.

2. **Permissioned Access via Membership**
   - A single `owner` manages who is allowed to interact with the treasury.
   - Using `addMember` and `removeMember`, the owner can grant or revoke access at any time.
   - Any user can check `isMember(address)` to see whether a given address is part of the group.

3. **Simple Deposit & Withdraw Flows**
   - Members call `deposit()` to send FLR directly into the contract.
   - Members (or authorized addresses per contract logic) call `withdraw(_amount)` to take funds out.
   - These flows are wrapped in a React hook and exposed through a straightforward UI:
     - Enter an amount, click **Deposit** or **Withdraw**, and confirm in your wallet.

4. **Transparency and Auditability**
   - All actions emit events that can be viewed in the block explorer:
     - `Deposit`, `Withdraw`, `MemberAdded`, and `MemberRemoved`.
   - Anyone can verify the history of the group wallet on the Coston2 explorer.

5. **Developer and UX-Friendly dApp Pattern**
   - The project demonstrates a modern dApp architecture:
     - TypeScript, React, Next.js (or similar).
     - `wagmi` and `viem` hooks for contract interaction.
     - A dedicated hook (`useWillContract`) that abstracts blockchain complexity away from UI components.
   - This makes it easy to:
     - Extend the UI with additional views (e.g., event history, member list).
     - Integrate the group wallet into a larger application or DAO dashboard.

### Example Use Cases

- **Student Clubs / Hackathon Teams**
  - Pool prize money or sponsorship funds.
  - Allow core members to manage and distribute funds.

- **Small DAOs or Community Projects**
  - Simple treasury before moving to full governance.
  - Transparent spending and fund management.

- **Internal Team Budget**
  - Teams can share a wallet for experiments, gas, or micro-grants.
  - Membership ensures only authorized accounts interact with the funds.

By providing a minimal yet fully functional, chain-deployed example, this project serves both as:

- A **production-ready shared wallet** for small groups, and
- A **reference implementation** for developers building on Flare and Coston2.
