import { useFinance } from "@/contexts/finance-context"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export function RecentTransactions({ className }: { className?: string }) {
  const { transactions } = useFinance()

  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const recentTransactions = sortedTransactions.slice(0, 5)

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {recentTransactions.map((transaction) => (
            <li key={transaction.id} className="flex justify-between items-center">
              <span>{transaction.description}</span>
              <span className={transaction.type === "income" ? "text-green-500" : "text-red-500"}>
                ₵{transaction.amount.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

