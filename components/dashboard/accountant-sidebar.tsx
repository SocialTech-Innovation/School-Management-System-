"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Wallet,
  FileText,
  CreditCard,
  Banknote,
  PieChart,
  BarChart3,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Calculator,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useMemo } from "react"

const menuItems = [
  { name: "Overview", href: "/dashboard/accountant", icon: LayoutDashboard, section: "main" },
  { name: "Fee Collections", href: "/dashboard/accountant/fees", icon: Wallet, section: "main" },
  { name: "Invoices", href: "/dashboard/accountant/invoices", icon: FileText, section: "main" },
  { name: "Expenses", href: "/dashboard/accountant/expenses", icon: CreditCard, section: "main" },
  { name: "Payroll", href: "/dashboard/accountant/payroll", icon: Banknote, section: "main" },
  { name: "Budget", href: "/dashboard/accountant/budget", icon: Calculator, section: "planning" },
  { name: "Reports", href: "/dashboard/accountant/reports", icon: BarChart3, section: "planning" },
  { name: "Vendors", href: "/dashboard/accountant/vendors", icon: Building2, section: "operations" },
  { name: "Approvals", href: "/dashboard/accountant/approvals", icon: CheckCircle2, section: "operations" },
  { name: "Audit Log", href: "/dashboard/accountant/audit", icon: ShieldCheck, section: "operations" },
  { name: "Settings", href: "/dashboard/accountant/settings", icon: Settings, section: "system" },
]

interface AccountantSidebarProps {
  open: boolean
  collapsed: boolean
  onClose: () => void
  onToggleCollapse: () => void
}

export function AccountantSidebar({ open, collapsed, onClose, onToggleCollapse }: AccountantSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const groupedItems = useMemo(() => {
    return menuItems.reduce((acc, item) => {
      if (!acc[item.section]) acc[item.section] = []
      acc[item.section].push(item)
      return acc
    }, {} as Record<string, typeof menuItems>)
  }, [])

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 lg:hidden z-40" onClick={onClose} />}

      <div
        className={cn(
          "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 z-50 lg:relative lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <button
          onClick={onToggleCollapse}
          className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-amber-500 text-white shadow-lg hover:bg-amber-600 transition-all duration-200 items-center justify-center z-10 hidden lg:flex"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        <div
          className={cn(
            "h-16 flex items-center border-b border-sidebar-border transition-all duration-300",
            collapsed ? "justify-center px-4" : "px-6 gap-3"
          )}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
            <PieChart className="w-6 h-6 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-bold text-lg text-foreground">EduFinance</h1>
              <p className="text-xs text-muted-foreground">Accounting</p>
            </div>
          )}
        </div>

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
                          ? "bg-amber-500 text-white font-medium shadow-sm"
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

        {!collapsed && (
          <div className="border-t border-sidebar-border p-4">
            <button
              onClick={() => router.push("/auth")}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-200"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        )}

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
