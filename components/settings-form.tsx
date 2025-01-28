"use client"

import { useState } from "react"
import { useFinance } from "@/contexts/finance-context"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export function SettingsForm() {
  const { budgets, updateBudget } = useFinance()
  const [newCategory, setNewCategory] = useState("")
  const [newAmount, setNewAmount] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateBudget(newCategory, Number.parseFloat(newAmount))
    setNewCategory("")
    setNewAmount("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            required
          />
          <Input
            type="number"
            placeholder="Budget Amount"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            Add/Update Budget
          </Button>
        </form>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Current Budgets</h3>
          {budgets.map((budget, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <span>{budget.category}</span>
              <span>₵{budget.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

