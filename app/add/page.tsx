import { AddTransactionForm } from "@/components/add-transaction-form"
import { MainLayout } from "@/components/main-layout"

export default function AddTransactionPage() {
  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Add Transaction</h1>
        <AddTransactionForm />
      </div>
    </MainLayout>
  )
}

