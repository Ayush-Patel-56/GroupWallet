// hooks/useContract.ts
"use client"

import { useState, useEffect } from "react"
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { parseEther, formatEther } from "viem"
import { contractABI, contractAddress } from "@/lib/contract"

export interface ContractData {
  contractBalance: string
  isMember: boolean
  owner: `0x${string}` | null
}

export interface ContractState {
  isLoading: boolean
  isPending: boolean
  isConfirming: boolean
  isConfirmed: boolean
  hash: `0x${string}` | undefined
  error: Error | null
}

export interface ContractActions {
  deposit: (amount: string) => Promise<void>
  withdraw: (amount: string) => Promise<void>
}

export const useWillContract = () => {
  const { address } = useAccount()
  const [isLoading, setIsLoading] = useState(false)

  const { data: contractBalance, refetch: refetchBalance } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "getBalance",
  })

  const { data: ownerData } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "owner",
  })

  const { data: isMemberData, refetch: refetchIsMember } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "isMember",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })

  const { writeContractAsync, data: hash, error, isPending } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  useEffect(() => {
    if (isConfirmed) {
      refetchBalance()
      if (address) {
        refetchIsMember()
      }
    }
  }, [isConfirmed, refetchBalance, refetchIsMember, address])

  const deposit = async (amount: string) => {
    if (!amount) return

    try {
      setIsLoading(true)
      await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: "deposit",
        value: parseEther(amount),
      })
    } catch (err) {
      console.error("Error depositing:", err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const withdraw = async (amount: string) => {
    if (!amount) return

    try {
      setIsLoading(true)
      await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: "withdraw",
        args: [parseEther(amount)],
      })
    } catch (err) {
      console.error("Error withdrawing:", err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const data: ContractData = {
    contractBalance: contractBalance ? formatEther(contractBalance as bigint) : "0",
    isMember: typeof isMemberData === "boolean" ? isMemberData : false,
    owner: ownerData ? (ownerData as `0x${string}`) : null,
  }

  const actions: ContractActions = {
    deposit,
    withdraw,
  }

  const state: ContractState = {
    isLoading: isLoading || isPending || isConfirming,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error,
  }

  return {
    data,
    actions,
    state,
  }
}
