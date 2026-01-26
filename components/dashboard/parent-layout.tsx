"use client"

import { ReactNode, useEffect, useState } from "react"
import { ParentSidebar } from "./parent-sidebar"
import { Bell, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Child {
  id: string
  name: string
  avatar: string
  class: string
  rollNo: number
}

interface ParentLayoutProps {
  children: ReactNode
  title: string
  selectedChild?: Child
  onChildSelect?: (child: Child) => void
}

// Mock children data
const defaultChildren: Child[] = [
  { id: '1', name: 'Alex Johnson', avatar: '', class: '10-A', rollNo: 24 },
  { id: '2', name: 'Emma Johnson', avatar: '', class: '8-B', rollNo: 15 },
]

export function ParentLayout({ children, title, selectedChild, onChildSelect }: ParentLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem("parentSidebarCollapsed")
      if (saved !== null) setSidebarCollapsed(saved === "true")
    } catch {}
  }, [])

  const handleToggleCollapse = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev
      try {
        localStorage.setItem("parentSidebarCollapsed", String(next))
      } catch {}
      return next
    })
  }
  const router = useRouter()
  const currentChild = selectedChild || defaultChildren[0]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <ParentSidebar 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={handleToggleCollapse}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-3 sm:px-6 sticky top-0 z-10">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition flex-shrink-0"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-base sm:text-xl font-semibold text-foreground truncate">{title}</h1>
            
            {/* Child Selector - Next to Title */}
            {onChildSelect && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-1 sm:gap-2 flex-shrink-0">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={currentChild.avatar} alt={currentChild.name} />
                      <AvatarFallback className="text-xs">
                        {currentChild.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline max-w-[100px] truncate">{currentChild.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {defaultChildren.map((child) => (
                    <DropdownMenuItem
                      key={child.id}
                      onClick={() => onChildSelect(child)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={child.avatar} alt={child.name} />
                          <AvatarFallback className="text-xs">
                            {child.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{child.name}</p>
                          <p className="text-xs text-muted-foreground">Class {child.class}</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Notifications */}
            <Link href="/dashboard/parent/announcements">
              <Button variant="ghost" size="icon" className="relative h-9 w-9 sm:h-10 sm:w-10">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
            </Link>

            {/* Parent Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1 sm:gap-2 h-9 sm:h-10">
                  <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                    <AvatarImage src="" alt="Sarah Johnson" />
                    <AvatarFallback className="text-xs">SJ</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline text-sm">Sarah Johnson</span>
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="cursor-pointer">
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Notification Preferences
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-destructive" onClick={() => router.push('/auth')}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
