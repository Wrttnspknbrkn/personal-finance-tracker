"use client"

import { useState } from "react"
import { useFinance } from "@/contexts/finance-context"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Plus } from "lucide-react"

export function SavingsGoals() {
  const { savingsGoals, updateSavingsGoal } = useFinance()
  const [contributions, setContributions] = useState<{ [key: string]: string }>({})

  const handleContribute = (id: string) => {
    const amount = Number.parseFloat(contributions[id])
    if (isNaN(amount) || amount <= 0) return

    updateSavingsGoal(id, amount)
    setContributions((prev) => ({ ...prev, [id]: "" }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings Goals</CardTitle>
      </CardHeader>
      <CardContent>
        {savingsGoals.map((goal) => (
          <div key={goal.id} className="mb-6">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">{goal.name}</span>
              <span>{Math.round((goal.currentAmount / goal.targetAmount) * 100)}%</span>
            </div>
            <Progress value={(goal.currentAmount / goal.targetAmount) * 100} className="h-2 mb-2" />
            <p className="text-sm text-muted-foreground mb-2">
              ₵{goal.currentAmount.toFixed(2)} / ₵{goal.targetAmount.toFixed(2)}
            </p>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Amount"
                value={contributions[goal.id] || ""}
                onChange={(e) => setContributions((prev) => ({ ...prev, [goal.id]: e.target.value }))}
                className="w-full"
              />
              <Button size="sm" onClick={() => handleContribute(goal.id)}>
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

