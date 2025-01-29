"use client"

import { type ReactNode, useState } from "react"
import { usePathname } from "next/navigation"
import { Sidebar } from "./sidebar"
import { Button } from "./ui/button"
import { Menu, X } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "./ui/tooltip"

export function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Don't show sidebar on onboarding page
  if (pathname === "/onboarding") {
    return <>{children}</>
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-background border-b p-4 flex justify-between items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{sidebarOpen ? "Close Sidebar" : "Open Sidebar"}</TooltipContent>
            </Tooltip>
            <h1 className="text-xl font-bold">Finance Tracker</h1>
            <div className="w-10" /> {/* Spacer for alignment */}
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </TooltipProvider>
  )
}

