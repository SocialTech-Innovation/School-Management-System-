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
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <StudentSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-14 sm:h-16 bg-card border-b border-border flex items-center justify-between px-3 sm:px-6">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-muted rounded-lg flex-shrink-0">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            {showBackButton && (
              <Link href="/dashboard/student" className="flex items-center gap-2 text-primary hover:text-primary/80 transition">
                <ChevronLeft size={20} />
              </Link>
            )}
            <h1 className="text-base sm:text-xl font-semibold text-foreground truncate">{title}</h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/dashboard/student/announcements" className="p-2 hover:bg-muted rounded-lg relative text-muted-foreground hover:text-foreground transition h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Link>
            <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center">
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
