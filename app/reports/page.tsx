import { ReportsOverview } from "@/components/reports-overview"
import { MainLayout } from "@/components/main-layout"

export default function ReportsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto p-4 space-y-6">
        <h1 className="text-3xl font-bold">Financial Reports</h1>
        <ReportsOverview />
      </div>
    </MainLayout>
  )
}

