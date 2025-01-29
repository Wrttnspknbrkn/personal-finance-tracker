"use client"

import { useFinance } from "@/contexts/finance-context"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Bar, BarChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Cell } from "recharts"
import { ScrollArea, ScrollBar } from "./ui/scroll-area"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

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

  const monthlyChartData = Object.values(monthlyData)

  const categoryData = transactions.reduce((acc, transaction) => {
    if (transaction.type === "expense") {
      if (!acc[transaction.category]) {
        acc[transaction.category] = 0
      }
      acc[transaction.category] += transaction.amount
    }
    return acc
  }, {})

  const pieChartData = Object.entries(categoryData).map(([name, value]) => ({ name, value }))

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpense = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Income vs Expense</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#4ade80" name="Income" />
              <Bar dataKey="expense" fill="#f87171" name="Expense" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Expense Categories</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financial Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Total Income</h3>
                  <p className="text-2xl font-bold text-green-500">₵{totalIncome.toFixed(2)}</p>
                </div>
                <div>
                  <h3 className="font-medium">Total Expenses</h3>
                  <p className="text-2xl font-bold text-red-500">₵{totalExpense.toFixed(2)}</p>
                </div>
                <div>
                  <h3 className="font-medium">Net Savings</h3>
                  <p className="text-2xl font-bold">₵{(totalIncome - totalExpense).toFixed(2)}</p>
                </div>
                <div>
                  <h3 className="font-medium">Savings Rate</h3>
                  <p className="text-2xl font-bold">{savingsRate.toFixed(2)}%</p>
                </div>
                <div>
                  <h3 className="font-medium">Top Expense Categories</h3>
                  <ul className="list-disc list-inside">
                    {pieChartData.slice(0, 5).map((category, index) => (
                      <li key={index}>
                        {category.name}: ₵{category.value.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

