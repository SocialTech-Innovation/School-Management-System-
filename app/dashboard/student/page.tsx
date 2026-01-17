"use client"

import { useState, useEffect } from "react"
import { Bell, Search, Menu, X, Users, GraduationCap, BookOpen, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { StudentSidebar } from "@/components/dashboard/student-sidebar"
import { WelcomeCard } from "@/components/dashboard/welcome-card"
import { KPICard } from "@/components/dashboard/kpi-card"
import { TodaysTimetable } from "@/components/dashboard/todays-timetable"
import { Announcements } from "@/components/dashboard/announcements"
import { QuickLinks } from "@/components/dashboard/quick-links"
import { RecentGrades } from "@/components/dashboard/recent-grades"
import Link from "next/link"

export default function StudentDashboard() {
  useEffect(() => {
    document.title = "Dashboard"
  }, [])

  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <StudentSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-16 bg-card border-b border-border flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-muted rounded-lg">
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-muted rounded-lg relative text-muted-foreground hover:text-foreground transition">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-6 animate-fade-in">
            {/* Welcome Card */}
            <WelcomeCard
              name="Alex"
              message="You have 2 upcoming exams this week. Keep up the great work!"
              initials="AJ"
            />

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <KPICard
                icon={Users}
                value="94%"
                label="Attendance Rate"
                badge={{ text: "Good", variant: "success" }}
              />
              <KPICard
                icon={GraduationCap}
                value="A-"
                label="Average Grade"
                badge={{ text: "+2%", variant: "info" }}
              />
              <KPICard
                icon={BookOpen}
                value="3"
                label="Assignments Pending"
                badge={{ text: "Due Soon", variant: "warning" }}
              />
              <KPICard
                icon={Calendar}
                value="2"
                label="Upcoming Exams"
                subtext="Next: Math"
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Timetable & Announcements */}
              <div className="lg:col-span-2 space-y-6">
                <TodaysTimetable />
                <Announcements />
              </div>

              {/* Right Column - Grades & Quick Links */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Recent Grades</CardTitle>
                      <Link href="/dashboard/student/grades" className="text-primary hover:text-primary/80 text-sm font-medium">
                        View all
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RecentGrades subject="History Quiz" grade="A" date="Oct 22" />
                    <RecentGrades subject="Chem Lab" grade="B+" date="Oct 20" />
                    <RecentGrades subject="English Essay" grade="A-" date="Oct 18" />
                  </CardContent>
                </Card>
                <QuickLinks />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
