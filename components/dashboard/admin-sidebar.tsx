"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LogOut, LayoutDashboard, Users, BookOpen, Clock, DollarSign, BarChart3, Settings } from "lucide-react"

const menuItems = [
  { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { name: "Students", href: "/dashboard/admin/students", icon: Users },
  { name: "Teachers", href: "/dashboard/admin/teachers", icon: Users },
  { name: "Classes", href: "/dashboard/admin/classes", icon: BookOpen },
  { name: "Attendance", href: "/dashboard/admin/attendance", icon: Clock },
  { name: "Fees & Finance", href: "/dashboard/admin/fees", icon: DollarSign },
  { name: "Reports", href: "/dashboard/admin/reports", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
]

interface AdminSidebarProps {
  open: boolean
  onClose: () => void
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <>
      {/* Mobile Overlay */}
      {open && <div className="fixed inset-0 bg-black/50 lg:hidden z-40" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 bg-card border-r border-border p-6 transition-transform duration-300 z-50 lg:relative lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground">EduManage</h1>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-4">Menu</p>
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => onClose()}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive ? "bg-blue-50 text-blue-600" : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="border-t border-border pt-4">
          <div className="p-4 bg-blue-50 rounded-lg mb-4">
            <p className="text-xs text-blue-600 font-semibold mb-2">Admin Account</p>
            <p className="text-sm font-bold text-blue-900">John Admin</p>
            <p className="text-xs text-blue-600">System Administrator</p>
          </div>

          <button
            onClick={() => {
              router.push("/")
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </>
  )
}
