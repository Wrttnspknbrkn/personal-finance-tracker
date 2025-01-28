import { useFinance } from "@/contexts/finance-context"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"

export function BudgetProgress() {
  const { transactions, budgets } = useFinance()

  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0)
  const progress = (totalExpenses / totalBudget) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="h-2" />
        <p className="mt-2 text-sm text-muted-foreground">
          ₵{totalExpenses.toFixed(2)} / ₵{totalBudget.toFixed(2)}
        </p>
      </CardContent>
    </Card>
  )
}

