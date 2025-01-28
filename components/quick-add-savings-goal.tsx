"use client";

import { useState } from "react";
import { useFinance } from "@/contexts/finance-context";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function QuickAddSavingsGoal() {
  const { addSavingsGoal } = useFinance(); // Access context to add savings goal
  const [name, setName] = useState(""); // State to store goal name
  const [targetAmount, setTargetAmount] = useState(""); // State to store target amount

  // Function to handle adding a savings goal
  const handleAddGoal = () => {
    if (!name || !targetAmount) return; // Check if fields are empty

    addSavingsGoal({
      name,
      targetAmount: parseFloat(targetAmount), // Convert string to number
      currentAmount: 0, // Default to 0
    });

    // Clear input fields after adding the goal
    setName("");
    setTargetAmount("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Add Savings Goal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Input for the goal name */}
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Goal Name (e.g., Vacation)"
            className="w-full"
          />
          {/* Input for the target amount */}
          <Input
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            placeholder="Target Amount (e.g., 5000)"
            className="w-full"
            min="0"
            step="0.01"
          />
          {/* Button to add the goal */}
          <Button onClick={handleAddGoal} className="w-full">
            Add Goal
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

