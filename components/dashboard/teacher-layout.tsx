"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { Menu, X, Bell, Search, ChevronLeft } from "lucide-react"
import { TeacherSidebar } from "./teacher-sidebar"

interface TeacherLayoutProps {
  children: ReactNode
  title: string
  showBackButton?: boolean
}

export function TeacherLayout({ children, title, showBackButton = false }: TeacherLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <TeacherSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Bar */}
        <div className="h-16 border-b border-border bg-card px-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            {showBackButton && (
              <Link href="/dashboard/teacher" className="flex items-center gap-2 text-primary hover:text-primary/80 transition">
                <ChevronLeft size={20} />
              </Link>
            )}
            <h1 className="text-xl font-semibold text-foreground">{title}</h1>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/dashboard/teacher/notifications" className="p-2 hover:bg-muted rounded-lg relative text-muted-foreground hover:text-foreground transition">
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
