"use client"

import { ReactNode, useEffect, useState } from "react"
import { AdminSidebar } from "./admin-sidebar"
import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AdminLayoutProps {
  children: ReactNode
  title: string
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem("adminSidebarCollapsed")
      if (saved !== null) setSidebarCollapsed(saved === "true")
    } catch {}
  }, [])

  const handleToggleCollapse = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev
      try {
        localStorage.setItem("adminSidebarCollapsed", String(next))
      } catch {}
      return next
    })
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={handleToggleCollapse}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-14 sm:h-16 bg-card border-b border-border flex items-center justify-between px-3 sm:px-6 shadow-sm">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition flex-shrink-0"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-base sm:text-xl font-semibold text-foreground truncate">{title}</h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-secondary rounded-lg px-3 py-2 w-56 lg:w-64">
              <Search className="w-4 h-4 text-muted-foreground mr-2" />
              <Input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-0 outline-none text-sm placeholder:text-muted-foreground p-0 h-auto focus-visible:ring-0"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 hover:bg-muted rounded-lg transition h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-foreground truncate max-w-[140px]">Sarah Admin</p>
                <p className="text-xs text-muted-foreground truncate">Administrator</p>
              </div>
              <Avatar>
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                <AvatarFallback className="bg-blue-600 text-white">SA</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
