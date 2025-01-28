"use client"

import { useFinance } from "@/contexts/finance-context"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

export function ReportsOverview() {
  const { transactions } = useFinance()

  const monthlyData = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date)
    const month = date.toLocaleString("default", { month: "short" })
    const year = date.getFullYear()
    const key = `${month} ${year}`

    if (!acc[key]) {
      acc[key] = { name: key, income: 0, expense: 0 }
    }

    if (transaction.type === "income") {
      acc[key].income += transaction.amount
    } else {
      acc[key].expense += transaction.amount
    }

    return acc
  }, {})

  const data = Object.values(monthlyData)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Income vs Expense</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="income" fill="#4ade80" name="Income" />
            <Bar dataKey="expense" fill="#f87171" name="Expense" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

