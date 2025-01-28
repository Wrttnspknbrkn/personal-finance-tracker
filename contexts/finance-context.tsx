"use client"

import * as React from "react"

interface Transaction {
  id: string
  amount: number
  description: string
  date: string
  category: string
  type: "income" | "expense"
}

interface Budget {
  category: string
  amount: number
}

interface SavingsGoal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
}

interface FinanceContextType {
  transactions: Transaction[]
  addTransaction: (transaction: Omit<Transaction, "id">) => void
  deleteTransaction: (id: string) => void
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void
  budgets: Budget[]
  updateBudget: (category: string, amount: number) => void
  savingsGoals: SavingsGoal[]
  addSavingsGoal: (goal: Omit<SavingsGoal, "id">) => void
  updateSavingsGoal: (id: string, amount: number) => void
}

const FinanceContext = React.createContext<FinanceContextType | undefined>(undefined)

export const useFinance = () => {
  const context = React.useContext(FinanceContext)
  if (!context) {
    throw new Error("useFinance must be used within a FinanceProvider")
  }
  return context
}

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = React.useState<Transaction[]>([])
  const [budgets, setBudgets] = React.useState<Budget[]>([])
  const [savingsGoals, setSavingsGoals] = React.useState<SavingsGoal[]>([])

  React.useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions")
    const storedBudgets = localStorage.getItem("budgets")
    const storedSavingsGoals = localStorage.getItem("savingsGoals")

    if (storedTransactions) setTransactions(JSON.parse(storedTransactions))
    if (storedBudgets) setBudgets(JSON.parse(storedBudgets))
    if (storedSavingsGoals) setSavingsGoals(JSON.parse(storedSavingsGoals))
  }, [])

  React.useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions))
    localStorage.setItem("budgets", JSON.stringify(budgets))
    localStorage.setItem("savingsGoals", JSON.stringify(savingsGoals))
  }, [transactions, budgets, savingsGoals])

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    setTransactions([...transactions, { ...transaction, id: Date.now().toString() }])
  }

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  const updateTransaction = (id: string, updatedTransaction: Partial<Transaction>) => {
    setTransactions(transactions.map((t) => (t.id === id ? { ...t, ...updatedTransaction } : t)))
  }

  const updateBudget = (category: string, amount: number) => {
    const existingBudgetIndex = budgets.findIndex((b) => b.category === category)
    if (existingBudgetIndex !== -1) {
      const updatedBudgets = [...budgets]
      updatedBudgets[existingBudgetIndex].amount = amount
      setBudgets(updatedBudgets)
    } else {
      setBudgets([...budgets, { category, amount }])
    }
  }

  const addSavingsGoal = (goal: Omit<SavingsGoal, "id">) => {
    setSavingsGoals([...savingsGoals, { ...goal, id: Date.now().toString() }])
  }

  const updateSavingsGoal = (id: string, amount: number) => {
    setSavingsGoals(savingsGoals.map((g) => (g.id === id ? { ...g, currentAmount: g.currentAmount + amount } : g)))
  }

  const value = {
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    budgets,
    updateBudget,
    savingsGoals,
    addSavingsGoal,
    updateSavingsGoal,
  }

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
}

