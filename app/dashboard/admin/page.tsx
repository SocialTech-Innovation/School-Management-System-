"use client"

import { useState } from "react"
import { Bell, Search, Menu, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminSidebar } from "@/components/dashboard/admin-sidebar"
import { AdminWelcomeBanner } from "@/components/dashboard/admin-welcome-banner"
import { AdminStatCard } from "@/components/dashboard/admin-stat-card"
import { RecentActivities } from "@/components/dashboard/recent-activities"
import { StudentsTable } from "@/components/dashboard/students-table"

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-muted rounded-lg">
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h2 className="text-lg font-semibold text-foreground">Dashboard</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-muted px-4 py-2 rounded-lg gap-2">
              <Search size={18} className="text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-0 outline-none text-sm placeholder:text-muted-foreground"
              />
            </div>
            <button className="p-2 hover:bg-muted rounded-lg relative">
              <Bell size={20} className="text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-muted rounded-lg">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Welcome Banner */}
            <AdminWelcomeBanner />

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <AdminStatCard icon="👥" label="Total Students" value="1,245" change="+12%" trend="up" />
              <AdminStatCard icon="👨‍🏫" label="Total Teachers" value="87" change="+3%" trend="up" />
              <AdminStatCard icon="📚" label="Total Classes" value="42" change="0%" trend="neutral" />
              <AdminStatCard icon="💰" label="Pending Fees" value="$45,230" change="+8%" trend="down" />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Students Table */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Enrollments</CardTitle>
                    <p className="text-sm text-muted-foreground">Latest student registrations</p>
                  </CardHeader>
                  <CardContent>
                    <StudentsTable />
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activities */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RecentActivities />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button className="flex flex-col items-center justify-center p-4 hover:bg-muted rounded-lg transition border border-border">
                    <span className="text-2xl mb-2">👥</span>
                    <span className="text-xs font-medium text-center">Add Student</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 hover:bg-muted rounded-lg transition border border-border">
                    <span className="text-2xl mb-2">👨‍🏫</span>
                    <span className="text-xs font-medium text-center">Add Teacher</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 hover:bg-muted rounded-lg transition border border-border">
                    <span className="text-2xl mb-2">📚</span>
                    <span className="text-xs font-medium text-center">Create Class</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 hover:bg-muted rounded-lg transition border border-border">
                    <span className="text-2xl mb-2">📊</span>
                    <span className="text-xs font-medium text-center">View Reports</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
