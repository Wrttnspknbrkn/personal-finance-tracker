import { SettingsForm } from "@/components/settings-form"
import { MainLayout } from "@/components/main-layout"

export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        <SettingsForm />
      </div>
    </MainLayout>
  )
}

