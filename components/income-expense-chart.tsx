import { useFinance } from "@/contexts/finance-context"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

export function IncomeExpenseChart({ className }: { className?: string }) {
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
    <Card className={className}>
      <CardHeader>
        <CardTitle>Income vs Expense</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="income" fill="#4ade80" />
            <Bar dataKey="expense" fill="#f87171" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

