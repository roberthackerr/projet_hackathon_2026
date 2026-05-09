import type { ReactNode } from "react"
import DeveloperSidebar from "@/components/developer/sidebar"

export default function DeveloperLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">

      <DeveloperSidebar />

      <main className="flex-1 p-8">
        {children}
      </main>

    </div>
  )
}