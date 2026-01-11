"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LogOut, LayoutDashboard, User, Clock, BookOpen, CreditCard, Calendar, Megaphone, ChevronLeft, ChevronRight, GraduationCap, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"

const menuItems = [
  { name: "Dashboard", href: "/dashboard/student", icon: LayoutDashboard },
  { name: "My Attendance", href: "/dashboard/student/attendance", icon: Clock },
  { name: "My Grades", href: "/dashboard/student/grades", icon: BookOpen },
  { name: "Fee Status", href: "/dashboard/student/fees", icon: CreditCard },
  { name: "Timetable", href: "/dashboard/student/timetable", icon: Calendar },
  { name: "Announcements", href: "/dashboard/student/announcements", icon: Megaphone },
]

const bottomMenuItems = [
  { name: "My Profile", href: "/dashboard/student/profile", icon: User },
  { name: "Settings", href: "/dashboard/student/settings", icon: LogOut },
]

interface StudentSidebarProps {
  open: boolean
  onClose: () => void
}

export function StudentSidebar({ open, onClose }: StudentSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {/* Mobile Overlay */}
      {open && <div className="fixed inset-0 bg-black/50 lg:hidden z-40" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 z-50 lg:relative lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        } ${collapsed ? "w-20" : "w-64"}`}
      >
        {/* Collapse Toggle Button - Top Right */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-200 flex items-center justify-center z-10 hidden lg:flex"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>

        {/* Logo Section */}
        <div className={`flex items-center gap-3 px-6 py-5 border-b border-sidebar-border ${collapsed ? "justify-center px-4" : ""}`}>
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-6 h-6 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="text-xl font-bold text-foreground">EduPortal</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onClose()}
                className={`nav-link ${isActive ? "active" : ""} ${collapsed ? "nav-link-collapsed" : ""}`}
                title={collapsed ? item.name : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Navigation - Profile & Settings */}
        <div className="px-4 py-2 border-t border-sidebar-border space-y-1">
          {bottomMenuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onClose()}
                className={`nav-link ${isActive ? "active" : ""} ${collapsed ? "nav-link-collapsed" : ""}`}
                title={collapsed ? item.name : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
        </div>

        {/* User Profile Section */}
        <div className={`px-4 py-4 border-t border-sidebar-border ${collapsed ? "px-2" : ""}`}>
          {collapsed ? (
            <Avatar className="w-10 h-10 mx-auto cursor-pointer" title="Alex Johnson">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=alex" />
              <AvatarFallback className="bg-primary text-primary-foreground">AJ</AvatarFallback>
            </Avatar>
          ) : (
            <div className="flex items-center gap-3 px-2">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=alex" />
                <AvatarFallback className="bg-primary text-primary-foreground">AJ</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Alex Johnson</p>
                <p className="text-xs text-muted-foreground">Class 10-A</p>
              </div>
            </div>
          )}
        </div>

        {/* Sign Out Button */}
        <div className={`px-4 py-2 pb-4 ${collapsed ? "px-2" : ""}`}>
          <button
            onClick={() => router.push("/")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 text-destructive hover:bg-destructive-foreground/10 rounded-lg transition-all duration-200 ${
              collapsed ? "justify-center" : ""
            }`}
            title={collapsed ? "Sign Out" : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
          </button>
        </div>
      </div>
    </>
  )
}
