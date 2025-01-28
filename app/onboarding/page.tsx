"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  "Track your income and expenses",
  "Set and manage budgets",
  "Visualize your financial data",
  "Set and track savings goals",
  "Generate financial reports",
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()

  const handleNext = () => {
    if (currentStep < features.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Mark onboarding as complete
      localStorage.setItem("onboardingComplete", "true")
      router.push("/")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Welcome to Finance Tracker</CardTitle>
          <CardDescription>
            Step {currentStep + 1} of {features.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-6">{features[currentStep]}</p>
          <Button onClick={handleNext} className="w-full">
            {currentStep === features.length - 1 ? "Get Started" : "Next"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

