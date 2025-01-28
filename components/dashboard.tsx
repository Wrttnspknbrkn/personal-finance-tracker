"use client"

import { TotalBalance } from "./total-balance"
import { IncomeExpenseChart } from "./income-expense-chart"
import { RecentTransactions } from "./recent-transactions"
import { BudgetProgress } from "./budget-progress"
import { SavingsGoals } from "./savings-goals"
import { QuickAdd } from "./quick-add"
import { QuickAddSavingsGoal } from "./quick-add-savings-goal"

export function Dashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <TotalBalance />
      <BudgetProgress />
      <SavingsGoals />
      <QuickAddSavingsGoal />
      <QuickAdd />
      <IncomeExpenseChart className="md:col-span-2" />
      <RecentTransactions className="md:col-span-2 lg:col-span-1" />
    </div>
  )
}

