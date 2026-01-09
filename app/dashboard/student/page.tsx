"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Search, Menu, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { StudentSidebar } from "@/components/dashboard/student-sidebar"
import { StudentWelcomeBanner } from "@/components/dashboard/student-welcome-banner"
import { StatCard } from "@/components/dashboard/stat-card"
import { TimelineEvent } from "@/components/dashboard/timeline-event"
import { RecentGrades } from "@/components/dashboard/recent-grades"
import { AnnouncementItem } from "@/components/dashboard/announcement-item"

export default function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <StudentSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

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
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=alex"
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
            <StudentWelcomeBanner />

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon="👤"
                label="Attendance Rate"
                value="94%"
                badge="Good"
                badgeColor="bg-green-100 text-green-800"
              />
              <StatCard icon="📊" label="Average Grade" value="A-" badge="+2%" badgeColor="bg-blue-100 text-blue-800" />
              <StatCard
                icon="📋"
                label="Assignments Pending"
                value="3"
                badge="Due Soon"
                badgeColor="bg-orange-100 text-orange-800"
              />
              <StatCard
                icon="📝"
                label="Upcoming Exams"
                value="2"
                badge="Next: Mar"
                badgeColor="bg-gray-100 text-gray-800"
              />
            </div>

            {/* Today's Timetable and Grades */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Today's Timetable</CardTitle>
                    <p className="text-sm text-muted-foreground">Wednesday, Oct 25</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <TimelineEvent
                      time="08:30 AM"
                      title="Mathematics"
                      location="Room 101 • Mr. Anderson"
                      status="Completed"
                    />
                    <TimelineEvent time="09:30 AM" title="Physics" location="Lab 3 • Ms. Cure" status="Ongoing" />
                    <TimelineEvent
                      time="11:00 AM"
                      title="English Literature"
                      location="Room 214 • Mrs. Wolff"
                      status="Upcoming"
                    />
                    <TimelineEvent
                      time="01:00 PM"
                      title="Computer Science"
                      location="Lab 1 • Mr. Gaurav"
                      status="Upcoming"
                    />
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Recent Grades</CardTitle>
                      <Link href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
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
              </div>
            </div>

            {/* Announcements and Quick Links */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Announcements</CardTitle>
                      <svg className="w-5 h-5 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.5 1.5H3.75A2.25 2.25 0 001.5 3.75v12.5A2.25 2.25 0 003.75 18.5h12.5a2.25 2.25 0 002.25-2.25V9.5" />
                      </svg>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <AnnouncementItem
                      icon="⚠️"
                      title="School will close early on Friday for staff development. Dismissal is at 12:00 PM."
                      time="Today, 9:00 AM"
                    />
                    <AnnouncementItem
                      icon="🔬"
                      title="Science Fair Registration"
                      subtitle="Registration for the annual science fair is now open. Submit your project proposals by Nov 1st."
                      time="Yesterday"
                    />
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Links</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="flex flex-col items-center justify-center p-4 hover:bg-muted rounded-lg transition">
                        <span className="text-2xl mb-2">📋</span>
                        <span className="text-xs font-medium text-center">Report Card</span>
                      </button>
                      <button className="flex flex-col items-center justify-center p-4 hover:bg-muted rounded-lg transition">
                        <span className="text-2xl mb-2">💰</span>
                        <span className="text-xs font-medium text-center">Check Fees</span>
                      </button>
                      <button className="flex flex-col items-center justify-center p-4 hover:bg-muted rounded-lg transition">
                        <span className="text-2xl mb-2">📅</span>
                        <span className="text-xs font-medium text-center">Timetable PDF</span>
                      </button>
                      <button className="flex flex-col items-center justify-center p-4 hover:bg-muted rounded-lg transition">
                        <span className="text-2xl mb-2">📅</span>
                        <span className="text-xs font-medium text-center">Events</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
