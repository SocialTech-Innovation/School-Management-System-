"use client"

import { useState } from "react"
import { Bell, Search, Menu, X, ChevronLeft } from "lucide-react"
import { StudentSidebar } from "@/components/dashboard/student-sidebar"
import Link from "next/link"

interface StudentLayoutProps {
  children: React.ReactNode
  title: string
  showBackButton?: boolean
}

export function StudentLayout({ children, title, showBackButton = false }: StudentLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <StudentSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-16 bg-card border-b border-border flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-muted rounded-lg">
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            {showBackButton && (
              <Link href="/dashboard/student" className="flex items-center gap-2 text-primary hover:text-primary/80 transition">
                <ChevronLeft size={20} />
              </Link>
            )}
            <h1 className="text-xl font-semibold text-foreground">{title}</h1>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/dashboard/student/announcements" className="p-2 hover:bg-muted rounded-lg relative text-muted-foreground hover:text-foreground transition">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Link>
            <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
