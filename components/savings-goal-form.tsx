"use client";

import { useState } from "react";
import { useFinance } from "@/contexts/finance-context";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function SavingsGoalForm() {
  const { addSavingsGoal } = useFinance();
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !targetAmount) return;

    addSavingsGoal({
      name,
      targetAmount: parseFloat(targetAmount),
      currentAmount: 0,
    });

    setName("");
    setTargetAmount("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Savings Goal</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Goal Name</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="E.g., Emergency Fund"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Target Amount</label>
            <Input
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              placeholder="E.g., 5000"
              min="0"
              step="0.01"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Add Goal
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

