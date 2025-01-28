import { ReportsOverview } from "@/components/reports-overview"
import { MainLayout } from "@/components/main-layout"

export default function ReportsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Reports</h1>
        <ReportsOverview />
      </div>
    </MainLayout>
  )
}

