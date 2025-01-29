"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, DollarSign, PieChart, Target, TrendingUp, Zap } from "lucide-react"
import { BackgroundPattern } from "@/components/background-pattern"
import { Logo } from "@/components/logo"

const features = [
  {
    icon: DollarSign,
    title: "Track Your Finances",
    description: "Easily log your income and expenses to get a clear picture of your financial health.",
    color: "text-green-500",
  },
  {
    icon: PieChart,
    title: "Budget Wisely",
    description: "Set and manage budgets for different categories to control your spending.",
    color: "text-blue-500",
  },
  {
    icon: TrendingUp,
    title: "Visualize Your Progress",
    description: "See your financial data come to life with interactive charts and graphs.",
    color: "text-purple-500",
  },
  {
    icon: Target,
    title: "Set Savings Goals",
    description: "Define and track your savings goals to achieve your financial dreams.",
    color: "text-red-500",
  },
  {
    icon: Zap,
    title: "Get Started Now",
    description: "Jump right in and take control of your financial future!",
    color: "text-yellow-500",
  },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()

  const handleNext = () => {
    if (currentStep < features.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      localStorage.setItem("onboardingComplete", "true")
      router.push("/")
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <BackgroundPattern />
      <Card className="w-full max-w-lg relative z-10">
        <CardContent className="p-6">
          <div className="flex items-center justify-center mb-6">
            <Logo />
            <h1 className="text-2xl font-bold ml-2">Finance Tracker</h1>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              {(() => {
                const Icon = features[currentStep].icon; // Store the icon component in a variable
                return <Icon className={`w-16 h-16 mx-auto mb-4 ${features[currentStep].color}`} />;
              })()}
              <h2 className="text-2xl font-bold mb-2">{features[currentStep].title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{features[currentStep].description}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-between items-center mt-8">
            <div className="space-x-1">
              {features.map((_, index) => (
                <span
                  key={index}
                  className={`inline-block w-2 h-2 rounded-full ${
                    index === currentStep ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              ))}
            </div>
            <Button onClick={handleNext} className="flex items-center">
              {currentStep === features.length - 1 ? "Get Started" : "Next"}
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

