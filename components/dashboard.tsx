"use client"

import { TotalBalance } from "./total-balance"
import { IncomeExpenseChart } from "./income-expense-chart"
import { RecentTransactions } from "./recent-transactions"
import { BudgetProgress } from "./budget-progress"
import { SavingsGoals } from "./savings-goals"
import { QuickAdd } from "./quick-add"
import { SavingsGoalForm } from "./savings-goal-form"

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <TotalBalance />
        <BudgetProgress />
        <QuickAdd />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <SavingsGoals />
        <SavingsGoalForm />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <IncomeExpenseChart className="lg:col-span-2" />
        <RecentTransactions />
      </div>
    </div>
  )
}

