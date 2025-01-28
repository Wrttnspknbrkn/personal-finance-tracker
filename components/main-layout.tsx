"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { Sidebar } from "./sidebar"

export function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  // Don't show sidebar on onboarding page
  if (pathname === "/onboarding") {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  )
}

