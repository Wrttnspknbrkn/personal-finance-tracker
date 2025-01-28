"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, PlusCircle, BarChart2, Settings } from "lucide-react"
import { ModeToggle } from "./mode-toggle"

export function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: PlusCircle, label: "Add Transaction", href: "/add" },
    { icon: BarChart2, label: "Reports", href: "/reports" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

  return (
    <div className="flex h-full w-64 flex-col bg-card text-card-foreground">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">Finance Tracker</h1>
        <ModeToggle />
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 p-4">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`flex items-center space-x-2 rounded-lg px-4 py-2 text-foreground hover:bg-primary/10 ${
                  pathname === item.href ? "bg-primary/10" : ""
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

