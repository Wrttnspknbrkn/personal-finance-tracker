import { useFinance } from "@/contexts/finance-context"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export function TotalBalance() {
  const { transactions } = useFinance()

  const totalBalance = transactions.reduce(
    (sum, transaction) => (transaction.type === "income" ? sum + transaction.amount : sum - transaction.amount),
    0,
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">₵{totalBalance.toFixed(2)}</p>
      </CardContent>
    </Card>
  )
}

