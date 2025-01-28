import { useFinance } from "@/contexts/finance-context"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"

export function SavingsGoals() {
  const { savingsGoals } = useFinance()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings Goals</CardTitle>
      </CardHeader>
      <CardContent>
        {savingsGoals.map((goal) => (
          <div key={goal.id} className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span>{goal.name}</span>
              <span>{Math.round((goal.currentAmount / goal.targetAmount) * 100)}%</span>
            </div>
            <Progress value={(goal.currentAmount / goal.targetAmount) * 100} className="h-2" />
            <p className="mt-1 text-sm text-muted-foreground">
              ₵{goal.currentAmount.toFixed(2)} / ₵{goal.targetAmount.toFixed(2)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

