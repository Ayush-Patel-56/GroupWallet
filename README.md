# 🏦 Group Wallet Smart Contract

A **beginner-friendly Solidity smart contract** that lets a group of users **collect, manage, and withdraw funds together** using a shared on-chain wallet.

This project is designed for developers who are just starting their **Web3 / Solidity journey** and want a real, practical example of how smart contracts handle ownership, permissions, and Ether transfers.

---

## 📖 Project Description

The **Group Wallet** is a simple shared wallet deployed on the blockchain where:
- One person deploys the contract and becomes the **owner**
- The owner manages a list of allowed **group members**
- Anyone can deposit funds into the wallet
- Only approved members can withdraw funds

✅ The contract requires **no constructor parameters during deployment**, making it extremely easy to deploy and test using Remix or any EVM-compatible network.

---

## ⚙️ What It Does

- Creates a shared on-chain wallet
- Automatically assigns the deployer as:
  - the **owner**
  - the **first member**
- Allows the owner to add or remove wallet members
- Allows members to withdraw funds to their own address
- Accepts direct transfers and function-based deposits
- Keeps track of the wallet balance
- Emits events for transparency and debugging

---

## ✨ Features

✅ No deployment inputs (one-click deploy)  
✅ Owner-based access control  
✅ Member-only withdrawals  
✅ Anyone can deposit funds  
✅ Secure Ether transfer handling  
✅ Event logging for all major actions  
✅ Clean and readable Solidity code  
✅ Perfect for beginners and learning projects  

---

## 🔗 Deployed Smart Contract Link

🌐 **Contract / Transaction Explorer Link:**  
**XXX**

> Replace `XXX` with your deployed contract or transaction link on a blockchain explorer.

---

## 📜 Smart Contract Code

```solidity
//paste your code
