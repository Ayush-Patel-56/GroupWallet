// components/sample.tsx
"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { useWillContract } from "@/hooks/useContract"

const SampleIntregation = () => {
  const { isConnected } = useAccount()
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")

  const { data, actions, state } = useWillContract()

  const handleDeposit = async () => {
    if (!depositAmount || Number(depositAmount) <= 0) return
    try {
      await actions.deposit(depositAmount)
      setDepositAmount("")
    } catch (err) {
      console.error("Error:", err)
    }
  }

  const handleWithdraw = async () => {
    if (!withdrawAmount || Number(withdrawAmount) <= 0) return
    try {
      await actions.withdraw(withdrawAmount)
      setWithdrawAmount("")
    } catch (err) {
      console.error("Error:", err)
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold text-foreground mb-3">Group Wallet</h2>
          <p className="text-muted-foreground">Please connect your wallet to interact with the contract.</p>
        </div>
      </div>
    )
  }

  const canDeposit = !!depositAmount && Number(depositAmount) > 0
  const canWithdraw = !!withdrawAmount && Number(withdrawAmount) > 0

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Group Wallet</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Deposit and withdraw FLR from a shared on-chain wallet.
          </p>
        </div>

        {/* Contract Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-muted-foreground text-xs uppercase tracking-wide mb-2">Contract Balance</p>
            <p className="text-2xl font-semibold text-foreground">{data.contractBalance} FLR</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-muted-foreground text-xs uppercase tracking-wide mb-2">Your Membership</p>
            <p className="text-2xl font-semibold text-foreground">
              {data.isMember ? "Member" : "Not a member"}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-6">
          {/* Step 1: Deposit */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                1
              </span>
              <label className="block text-sm font-medium text-foreground">Deposit FLR</label>
            </div>
            <input
              type="number"
              placeholder="0.00"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              step="0.01"
              min="0"
              className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
            <button
              onClick={handleDeposit}
              disabled={state.isLoading || state.isPending || !canDeposit}
              className="mt-3 w-full px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {state.isLoading || state.isPending ? "Depositing..." : "Deposit"}
            </button>
          </div>

          {/* Step 2: Withdraw */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                2
              </span>
              <label className="block text-sm font-medium text-foreground">Withdraw FLR</label>
            </div>
            <input
              type="number"
              placeholder="0.00"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              min="0"
              step="0.01"
              className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
            <button
              onClick={handleWithdraw}
              disabled={state.isLoading || state.isPending || !canWithdraw}
              className="w-full px-6 py-2 bg-destructive text-destructive-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {state.isLoading || state.isPending ? "Withdrawing..." : "Withdraw"}
            </button>
          </div>
        </div>

        {/* Status Messages */}
        {state.hash && (
          <div className="mt-6 p-4 bg-card border border-border rounded-lg">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Transaction Hash</p>
            <p className="text-sm font-mono text-foreground break-all mb-3">{state.hash}</p>
            {state.isConfirming && <p className="text-sm text-primary">Waiting for confirmation...</p>}
            {state.isConfirmed && <p className="text-sm text-green-500">Transaction confirmed!</p>}
          </div>
        )}

        {state.error && (
          <div className="mt-6 p-4 bg-card border border-destructive rounded-lg">
            <p className="text-sm text-destructive-foreground">Error: {state.error.message}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SampleIntregation
