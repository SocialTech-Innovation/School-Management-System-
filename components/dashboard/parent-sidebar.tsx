"use client"

import { 
  LayoutDashboard, 
  User, 
  BookOpen, 
  Calendar, 
  CreditCard, 
  Clock, 
  Bell, 
  MessageCircle,
  FolderOpen,
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
  GraduationCap
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface ParentSidebarProps {
  open: boolean
  onClose: () => void
  collapsed: boolean
  onToggleCollapse: () => void
}

const menuItems = [
  {
    section: "Main",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/parent" },
      { icon: User, label: "Child's Profile", href: "/dashboard/parent/profile" },
      { icon: BookOpen, label: "Academic Performance", href: "/dashboard/parent/performance" },
    ]
  },
  {
    section: "Records",
    items: [
      { icon: CheckCircle, label: "Attendance", href: "/dashboard/parent/attendance" },
      { icon: CreditCard, label: "Fees & Payment", href: "/dashboard/parent/fees" },
      { icon: Clock, label: "Timetable", href: "/dashboard/parent/timetable" },
      { icon: FolderOpen, label: "Class Materials", href: "/dashboard/parent/materials" },
    ]
  },
  {
    section: "Communication",
    items: [
      { icon: Bell, label: "Announcements", href: "/dashboard/parent/announcements" },
      { icon: MessageCircle, label: "Teacher Messages", href: "/dashboard/parent/messages" },
    ]
  }
]

export function ParentSidebar({ open, onClose, collapsed, onToggleCollapse }: ParentSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 bg-sidebar border-r border-sidebar-border transform transition-all duration-300 ease-in-out lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full",
        collapsed ? "w-20" : "w-64"
      )}>
        {/* Collapse Toggle Button - Desktop Only */}
        <button
          onClick={onToggleCollapse}
          className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-200 items-center justify-center z-10 hidden lg:flex"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>

        {/* Logo */}
        <div className={cn(
          "h-16 flex items-center border-b border-sidebar-border transition-all duration-300",
          collapsed ? "justify-center px-4" : "justify-between px-6"
        )}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            {!collapsed && (
              <span className="text-xl font-bold text-foreground">EduParent</span>
            )}
          </div>
          {!collapsed && (
            <button
              onClick={onClose}
              className="lg:hidden p-1 hover:bg-muted rounded"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 space-y-6 overflow-y-auto">
          {menuItems.map((section) => (
            <div key={section.section}>
              {!collapsed && (
                <p className="px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {section.section}
                </p>
              )}
              <div className="space-y-1 px-3">
                {section.items.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                        isActive
                          ? "bg-primary text-primary-foreground font-medium shadow-sm"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        collapsed && "justify-center"
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon size={20} className="flex-shrink-0" />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
