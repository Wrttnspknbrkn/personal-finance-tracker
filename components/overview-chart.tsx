import type * as React from "react"
import { Typography } from "@mui/material"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useFinance } from "@/contexts/finance-context"

export const OverviewChart: React.FC = () => {
  const { transactions } = useFinance()

  const data = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.date).toLocaleString("default", { month: "short" })
    const existingMonth = acc.find((item) => item.name === month)
    if (existingMonth) {
      existingMonth[transaction.type] += transaction.amount
    } else {
      acc.push({ name: month, income: 0, expense: 0, [transaction.type]: transaction.amount })
    }
    return acc
  }, [])

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Income vs Expense
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#4caf50" />
          <Bar dataKey="expense" fill="#f44336" />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

