"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dashboard } from "@/components/dashboard"
import { MainLayout } from "@/components/main-layout"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const onboardingComplete = localStorage.getItem("onboardingComplete")
    if (!onboardingComplete) {
      router.push("/onboarding")
    }
  }, [router])

  return (
    <MainLayout>
      <Dashboard />
    </MainLayout>
  )
}

