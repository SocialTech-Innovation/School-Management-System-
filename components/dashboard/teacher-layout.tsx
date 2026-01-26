"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, X, Bell, Search, ChevronLeft } from "lucide-react"
import { TeacherSidebar } from "./teacher-sidebar"

interface TeacherLayoutProps {
  children: ReactNode
  title: string
  showBackButton?: boolean
}

export function TeacherLayout({ children, title, showBackButton = false }: TeacherLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <TeacherSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Bar */}
        <div className="h-14 sm:h-16 border-b border-border bg-card px-3 sm:px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition flex-shrink-0"
            >
              {sidebarOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
            {showBackButton && (
              <button 
                onClick={() => router.back()} 
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            <h1 className="text-base sm:text-xl font-semibold text-foreground truncate">{title}</h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/dashboard/teacher/announcements" className="p-2 hover:bg-muted rounded-lg relative text-muted-foreground hover:text-foreground transition h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center">
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
