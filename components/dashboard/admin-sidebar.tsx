"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LogOut,
  LayoutDashboard,
  Users,
  BookOpen,
  Clock,
  BarChart3,
  Settings,
  Calendar,
  Megaphone,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Briefcase,
  Library,
  Award,
  Shield,
  CalendarDays,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

const menuItems = [
  { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard, section: "main" },
  { name: "Students", href: "/dashboard/admin/students", icon: Users, section: "academic" },
  { name: "Teachers", href: "/dashboard/admin/teachers", icon: Briefcase, section: "academic" },
  { name: "Classes", href: "/dashboard/admin/classes", icon: BookOpen, section: "academic" },
  { name: "Subjects", href: "/dashboard/admin/subjects", icon: Library, section: "academic" },
  { name: "Timetable", href: "/dashboard/admin/timetable", icon: Clock, section: "academic" },
  { name: "Examinations", href: "/dashboard/admin/exams", icon: BarChart3, section: "academic" },
  { name: "Grades", href: "/dashboard/admin/grades", icon: Award, section: "academic" },
  { name: "Attendance", href: "/dashboard/admin/attendance", icon: Clock, section: "records" },
  { name: "Academic Calendar", href: "/dashboard/admin/calendar", icon: CalendarDays, section: "records" },
  { name: "Announcements", href: "/dashboard/admin/announcements", icon: Megaphone, section: "records" },
  { name: "Reports", href: "/dashboard/admin/reports", icon: BarChart3, section: "system" },
  { name: "Users", href: "/dashboard/admin/users", icon: Shield, section: "system" },
  { name: "Settings", href: "/dashboard/admin/settings", icon: Settings, section: "system" },
]

interface AdminSidebarProps {
  open: boolean
  onClose: () => void
  collapsed: boolean
  onToggleCollapse: () => void
}

export function AdminSidebar({ open, onClose, collapsed, onToggleCollapse }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = []
    acc[item.section].push(item)
    return acc
  }, {} as Record<string, typeof menuItems>)

  // Ensure collapsed state doesn't reset on navigation by persisting in parent layout
  useEffect(() => {
    // No-op: collapse handled by parent; keep component client-only to avoid hydration issues
  }, [])

  return (
    <>
      {/* Mobile Overlay */}
      {open && <div className="fixed inset-0 bg-black/50 lg:hidden z-40" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 z-50 lg:relative lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {/* Collapse Toggle Button */}
        <button
          onClick={onToggleCollapse}
          className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-200 items-center justify-center z-10 hidden lg:flex"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        {/* Logo */}
        <div
          className={cn(
            "h-16 flex items-center border-b border-sidebar-border transition-all duration-300",
            collapsed ? "justify-center px-4" : "px-6 gap-3"
          )}
        >
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-6 h-6 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-bold text-lg text-foreground">EduManage</h1>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
          {Object.entries(groupedItems).map(([section, items]) => (
            <div key={section}>
              {!collapsed && (
                <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {section}
                </p>
              )}
              <div className="space-y-1">
                {items.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => onClose()}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                        isActive
                          ? "bg-primary text-primary-foreground font-medium shadow-sm"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        collapsed && "justify-center"
                      )}
                      title={collapsed ? item.name : undefined}
                    >
                      <Icon size={20} className="flex-shrink-0" />
                      {!collapsed && <span>{item.name}</span>}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User Profile & Logout */}
        {!collapsed && (
          <div className="border-t border-sidebar-border p-4">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors cursor-pointer mb-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">SA</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  Sarah Admin
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  Administrator
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push("/auth")}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-200"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        )}

        {/* Collapsed state logout */}
        {collapsed && (
          <div className="border-t border-sidebar-border p-2">
            <button
              onClick={() => router.push("/auth")}
              className="w-full flex items-center justify-center p-2.5 text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-200"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </>
  )
}
